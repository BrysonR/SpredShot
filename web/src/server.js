require('node-jsx').install();

var express = require('express'),
    path = require('path'),
    rabbitConn = require('amqplib').connect('amqp://rabbit'),
    server = express(),
    React = require('react'),
    bodyParser = require('body-parser'),
    elasticsearch = require('elasticsearch'),
    mongoose = require('mongoose'),
    db = mongoose.connection,
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    uuid = require('node-uuid'),
    bcrypt = require('bcrypt-nodejs'),
    App = require('./static/app');
    when = require('when'),
    blns = require('./blns.json'),
    ReactDomServer = require('react-dom/server');

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(session({
    genid: function(req) {
            return uuid.v4()
        },
    cookie: {
        maxAge: 600000
    },
    saveUninitialized: false,
    resave: true,
    secret: 'keyboard cat' }));
server.use(passport.initialize());
server.use(passport.session());

// Setup Elastic
var host = 'http://elastic:9200';

var elasticClient = new elasticsearch.Client({
  host: host,
  log: 'trace'
});

// Setup Mongo
var User;

db.on('error', console.error);
db.once('open', function() {
    var userSchema = new mongoose.Schema({
        username: String,
        password: String,
        userId: String
    });

    User = mongoose.model('User', userSchema);
});

mongoose.connect('mongodb://mongo');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Wrong Username' });
            }
            bcrypt.compare(password, user.password, function(err, res) {
                if (res == true) {
                    return done(null, user);
                }

                return done(null, false, { message: 'Wrong password betch' });
            });
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.userId);
});

passport.deserializeUser(function(id, done) {
  User.findOne({userId: id}, function (err, user) {
    done(err, user);
  });
});

var isAuthenticated = function (req) {
    if (req.session.passport.user) {
        return true;
    } else {
        return false;
    }
}

// Create UserId

var i = 0;

var generateListingId = function (callback) {
    var listingId = Math.floor((Math.random() * 1000000) + 1);
    callback(listingId);
}

var generateUserId = function (callback) {
    var userId = Math.floor((Math.random() * 1000000) + 1);

    User.findOne({userId: userId}, function(err, user) {
        if(user != null) {
            i++;
            console.log(userId);
            if(i <= 50) {
                generateUserId();
            } else {
                callback(null);
            }
        } else {
            console.log(userId);
            callback(userId);
        }
    });
}

var getUserId = function (req, callback) {
    var userMongoId = req.session.passport.user;

    User.findOne({_id: userMongoId}, function (err, user) {
        if (user != null) {
            callback(user.userId);
        }
        else {
            callback(null);
        }
    });
}

var getUserName = function (userId, callback) {
    User.findOne({userId: userId}, function(err, user) {
        if (err) {
            return callback(null);
        } else {
            callback(user.username);
        }
    })
}

var isSanitary = function (message, callback) {
    var sanitary = true;

    for (var i = 0; i < blns.length; i++) {
        console.log(message);
        console.log(blns[i]);
        if(message.indexOf(blns[i]) > -1) {
            console.log(blns[i]);
            sanitary = false;
            break;
        }
    }
    callback(sanitary);
}

var getListing = function (listingId, callback) {
    elasticClient.search({
        index: 'equipment',
        body: {
            query: {
                match: {
                    'listingId': listingId
                }
            }
        },
        size: 1
    }).then(function (resp) {
        callback(resp.hits.hits[0]);
    });
}

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    console.log(req.session);

    var page = React.createFactory(App.Page);

    var markup = ReactDomServer.renderToStaticMarkup(page({
        app: App.Search,
        scripts: ['/js/searchInit.js'],
        valign: true,
        authenticated: isAuthenticated(req),
        activeLink: "search"
    }));

    res.send(markup);
});

server.get('/list', function(req, res) {
    if (!isAuthenticated(req)) {
        res.redirect('/login');
    } else {
        res.setHeader('Content-Type', 'text/html');

        var page = React.createFactory(App.Page);

        var markup = ReactDomServer.renderToStaticMarkup(page({
            app: App.List,
            valign: true,
            authenticated: isAuthenticated(req),
            activeLink: "list"
        }));

        res.send(markup);
    }
});

server.get('/listings/:query', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader('Content-Type', 'text/html');

    console.log(req.params.query);

    elasticClient.search({
        index: 'equipment',
        body: {
            query: {
                match: {
                    'title': req.params.query
                }
            }
        },
        size: 100
    }).then(function (resp) {
        console.log(resp.hits.hits);
        var page = React.createFactory(App.Page);

        var markup = ReactDomServer.renderToStaticMarkup(page({
            app: App.Listings,
            valign: false,
            data: resp.hits.hits,
            authenticated: isAuthenticated(req)
        }));

        res.send(markup);

    }, function (err) {
        res.send(err);
    });
});

server.post('/listing_redirect', function (req, res) {
    var listingId = req.body.listingId;

    req.session.listingId = listingId;

    var response = {
        statusCode: 200,
        message: "Success"
    }
    console.log(JSON.stringify(response), req.session.listingId);

    res.send(JSON.stringify(response));
})

server.post('/rabbit', function (req, res) {
    rabbitConn.then(function (conn) {

        return when(conn.createChannel().then(function(ch) {
            var ex = 'app.listing.create';
            var ok = ch.assertExchange(ex, 'fanout', {
                durable: true
            })

            req.body.id = generateListingId(function (listingId) {
                req.body.link = "/listing/" + listingId;
                req.body.listingId = listingId;
                req.body.ownerId = req.session.passport.user;
                getUserName(req.session.passport.user, function(username) {
                    req.body.owner = username;
                    var message = JSON.stringify(req.body);

                    return ok.then(function() {
                        ch.publish(ex, '', new Buffer(message));
                        console.log(" [x] Sent '%s'", message);
                        var response = {
                            status  : 200,
                            success : 'Listing Posted Successfully'
                        }

                        res.end(JSON.stringify(response));
                    });
                });
            })
        }));
    });
});


server.get('/login', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    var page = React.createFactory(App.Page);

    var markup = ReactDomServer.renderToStaticMarkup(page({
        app: App.Login,
        valign: true,
        authenticated: isAuthenticated(req),
        activeLink: "login"
    }));

    res.send(markup);
});

server.post('/login', passport.authenticate('local', { successRedirect: '/#loggedin',
                                failureRedirect: '/login#fail',
                                failureFlash: false })
);

server.get('/logout', function(req, res) {
    req.session.destroy(function(){
        res.redirect('/#loggedout');
    });
})

server.get('/register', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    var page = React.createFactory(App.Page);

    var markup = ReactDomServer.renderToStaticMarkup(page({
        app: App.Register,
        valign: true, authenticated: isAuthenticated(req),
        activeLink: "register"
    }));

    res.send(markup);
});

server.post('/register', function(req, res) {
    console.log(req.body);

    User.findOne({username: req.body.username}, function (err, user) {
        if (user != null) {
            res.redirect('/register#fail');
        }

        generateUserId(function(userId) {
            if(userId != null) {
                console.log(userId);

                bcrypt.hash(req.body.password, null, null, function(err, hash) {
                    if (err) {
                        console.log(err);
                        res.end();
                    }
                    var user = new User({
                        username: req.body.username,
                        password: hash,
                        userId: userId
                    });

                    user.save(function(err, user) {
                        if (err) return console.error(err);
                        console.dir(user);
                    });

                    req.login(user, function() {
                        return res.redirect('/#loggedin');
                    });
                });
            } else {
                return res.redirect('/register/#registrationfailed')
            }
        });
    });
});

server.get('/messages', function(req, res) {
    if (!isAuthenticated(req)) {
        res.redirect('/login');
    } else {
        var markup,
            userId = req.session.passport.user,
            finalData = {
                inbox: [],
                sent: []
            };

        var getSentMessages = function () {
            elasticClient.search({
                index: 'messages',
                body: {
                    query: {
                        match: {
                            'sender': userId
                        }
                    }
                },
                size: 100
            }).then(function (resp) {

                var renderApp = function() {
                    var page = React.createFactory(App.Page);

                    markup = ReactDomServer.renderToStaticMarkup(page({
                        app: App.Messages,
                        styles: ['/css/messages.css'],
                        data: finalData,
                        valign: false,
                        authenticated: isAuthenticated(req),
                        activeLink: "messages"
                    }));

                    res.send(markup);

                    console.log(finalData);
                };

                console.log(finalData);

                finalData.sent = resp.hits.hits;

                (function next(index) {
                    if (finalData.sent.length === 0) {
                        renderApp();
                    }
                    else if (index < finalData.sent.length) {
                        getUserName(finalData.sent[index]._source.recipient, function (username) {
                            console.log(username);
                            finalData.sent[index]._source.recipient = username;
                            console.log(finalData);
                            next(index + 1);
                        });
                    } else {
                        console.log(finalData)
                        renderApp();
                    }
                })(0);
            }, function (err) {
                res.send(err);
            });
        }

        elasticClient.search({
            index: 'messages',
            body: {
                query: {
                    match: {
                        'recipient': userId
                    }
                }
            },
            size: 100
        }).then(function (resp) {
            finalData.inbox = resp.hits.hits;

            (function next(index) {
                if (finalData.inbox.length === 0) {
                    getSentMessages();
                }
                else if (index < finalData.inbox.length) {
                    getUserName(finalData.inbox[index]._source.sender, function (username) {
                        console.log(username);
                        finalData.inbox[index]._source.sender = username;
                        console.log(finalData);
                        next(index + 1);
                    });
                } else {
                    getSentMessages();
                }
            })(0, finalData);
        }, function (err) {
            res.send(err);
        });
    }
});

server.get('/messages/compose', function(req, res) {
    if (!isAuthenticated(req)) {
        res.redirect('/login');
    } else {
        if (req.session.listingId) {
            getListing(req.session.listingId, function (listing) {
                res.setHeader('Content-Type', 'text/html');

                var page = React.createFactory(App.Page);

                console.log(listing._source.owner, listing._source.title);

                var markup = ReactDomServer.renderToStaticMarkup(page({
                        app: App.ComposeMessage,
                        valign: true,
                        data: listing,
                        authenticated: isAuthenticated(req),
                        activeLink: "messages"
                }));

                res.send(markup);
            });
            req.session.listingId = undefined;
        } else {
            res.setHeader('Content-Type', 'text/html');

            var page = React.createFactory(App.Page);

            var markup = ReactDomServer.renderToStaticMarkup(page({
                    app: App.ComposeMessage,
                    valign: true,
                    authenticated: isAuthenticated(req),
                    activeLink: "messages"
            }));

            res.send(markup);
        }
    }
});

server.post('/messages/send', function(req, res) {
    var recipientId = 0;
    var userId = 0;

    User.findOne({username: req.body.recipient}, function (err, user) {
        if(err) {
            console.log(err);
        } else {
            recipientId = user.userId;

            User.findOne({userId: req.session.passport.user}, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    userId = user.userId;

                    isSanitary(req.body.message, function(sanitary) {
                        console.log("it says it's " + sanitary);
                        if (sanitary) {
                            isSanitary(req.body.recipient, function(sanitary) {
                                if (sanitary) {
                                    isSanitary(req.body.subject, function(sanitary) {
                                        if (sanitary) {
                                            elasticClient.index({
                                                index: 'messages',
                                                type: 'message',
                                                recipient: {
                                                    type: 'string'
                                                },
                                                body: {
                                                    subject: req.body.subject,
                                                    recipient: recipientId,
                                                    sender: userId,
                                                    message: req.body.message,
                                                    date: new Date()
                                                }
                                            }, function (err, resp) {
                                                if(err) {
                                                    console.log(err);
                                                } else {
                                                    var response = {
                                                        status  : 200,
                                                        success : 'Updated Successfully'
                                                    }

                                                    res.send(JSON.stringify(response));
                                                }
                                            });
                                        } else {
                                            var response = {
                                                status  : 69,
                                                success : 'Naughty Boy'
                                            }

                                            res.send(JSON.stringify(response));
                                        }
                                    })
                                } else {
                                    var response = {
                                        status  : 69,
                                        success : 'Naughty Boy'
                                    }

                                    res.send(JSON.stringify(response));
                                }
                            })
                        } else {
                            var response = {
                                status  : 69,
                                success : 'Naughty Boy'
                            }

                            res.send(JSON.stringify(response));
                        }
                    });
                }
            });
        }
    });
});

server.listen(process.env.PORT || 3069);
