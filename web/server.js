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
    async = require('async');

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
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
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

var generateUserId = function (callback) {
    var userId = Math.floor((Math.random() * 1000000) + 1);

    User.findOne({userId: userId}, function(err, user) {
        if(user != null) {
            i++;
            console.log(userId);
            if(i <= 5) {
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

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    console.log(req.session);

    var page = React.createFactory(App.Page);

    var markup = React.renderToStaticMarkup(page({
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

        var markup = React.renderToStaticMarkup(page({
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

        var markup = React.renderToStaticMarkup(page({
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

server.post('/rabbit', function(req, res) {
    rabbitConn.then(function (conn) {

        return when(conn.createChannel().then(function(ch) {
            var ex = 'app.listing.create';
            var ok = ch.assertExchange(ex, 'fanout', {
                durable: true
            })

            req.body.guid = uuid.v4();
            req.body.link = "/listing/" + req.body.title;

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
        }));
    });
});


server.get('/login', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    var page = React.createFactory(App.Page);

    var markup = React.renderToStaticMarkup(page({
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

    var markup = React.renderToStaticMarkup(page({
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
        var markup;

        getUserId(req, function(userId) {
            if (userId != null) {
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

                    var renderApp = function(data) {
                        var page = React.createFactory(App.Page);

                        markup = React.renderToStaticMarkup(page({
                            app: App.Messages,
                            styles: ['/css/messages.css'],
                            data: data,
                            valign: false,
                            authenticated: isAuthenticated(req),
                            activeLink: "messages"
                        }));

                        res.send(markup);

                        console.log(data);
                    };

                    (function next(index, data) {
                        if (data.length === 0) {
                            renderApp();
                        }
                        else if (index < data.length) {
                            getUserName(data[index]._source.sender, function (username) {
                                console.log(username);
                                data[index]._source.sender = username;
                                console.log(data);
                                next(index + 1, data);
                            });
                        } else {
                            renderApp(data);
                        }
                    })(0, resp.hits.hits);
                }, function (err) {
                    res.send(err);
                });
            } else {
                res.redirect('/messages#userIdError');
            }
        });
    }
});

server.get('/messages/compose', function(req, res) {
    if (!isAuthenticated(req)) {
        res.redirect('/login');
    } else {
        res.setHeader('Content-Type', 'text/html');

        var page = React.createFactory(App.Page);

        var markup = React.renderToStaticMarkup(page({
                app: App.ComposeMessage,
                valign: true,
                authenticated: isAuthenticated(req),
                activeLink: "messages"
        }));

        res.send(markup);
    }
});

server.post('/messages/send', function(req, res) {
    var recipientId = 0;

    User.findOne({username: req.body.recipient}, function (err, user) {
        if(err) {
            console.log(err);
        } else {
            recipientId = user.userId;

            User.findOne({_id: req.session.passport.user}, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    elasticClient.index({
                        index: 'messages',
                        type: 'post',
                        recipient: {
                            type: 'string'
                        },
                        body: {
                            subject: req.body.subject,
                            recipient: recipientId,
                            sender: user.userId,
                            message: req.body.message,
                            date: new Date()
                        }
                    }, function (err, resp) {
                      if(err) {
                          console.log(err);
                      } else {
                            console.log(resp);
                            var response = {
                                status  : 200,
                                success : 'Updated Successfully'
                            }

                            res.end(JSON.stringify(response));
                      }
                    });
                }
            });
        }
    });
});

server.listen(3069);
