require('node-jsx').install();

var express = require('express'),
    path = require('path'),
    amqp = require('amqplib'),
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

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'html');
server.use(session({
    genid: function(req) {
            return uuid.v4()
        },
    cookie: {
        maxAge: 60000
    },
    saveUninitialized: false,
    resave: true,
    secret: 'keyboard cat' }));
server.use(passport.initialize());
server.use(passport.session());

var host = process.env.APP_ENV == 'development'
  ? 'http://elastic:9200'
  : 'http://brentmills.cloudapp.net:9200';

var client = new elasticsearch.Client({
  host: host,
  log: 'trace'
});

// Setup Mongo
var User;

db.on('error', console.error);
db.once('open', function() {
    var userSchema = new mongoose.Schema({
        username: String,
        password: String
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

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    console.log(req.session);

    var searchApp = React.createFactory(App.SearchApp);

    var markup = React.renderToStaticMarkup(searchApp({authenticated: isAuthenticated(req), activeLink: "search"}));

    res.send(markup);
});

server.get('/list', function(req, res) {
    if (!isAuthenticated(req)) {
        res.redirect('/login');
    } else {
        res.setHeader('Content-Type', 'text/html');

        var listApp = React.createFactory(App.ListApp);
        var markup = React.renderToStaticMarkup(listApp({authenticated: isAuthenticated(req), activeLink: "list"}));

        res.send(markup);
    }
});

server.get('/listings/:query', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.setHeader('Content-Type', 'text/html');

    console.log(req.params.query);

    client.search({
        index: 'ar15',
        body: {
            query: {
                match: {
                    'description': req.params.query
                }
            }
        },
        size: 100
    }).then(function (resp) {
        var listingsApp = React.createFactory(App.ListingsApp);

        var markup = React.renderToStaticMarkup(listingsApp({data: resp.hits.hits, authenticated: isAuthenticated(req)}));

        res.send(markup);

    }, function (err) {
        res.send(err);
    });
});

var rabbitConn = amqp.connect('amqp://rabbit');

server.post('/rabbit', function(req, res) {
    var rabbitChannel = rabbitConn.createChannel();

    var ex = 'app.listing.create';
    var ok = rabbitChannel.assertExchange(ex, 'fanout', {
        durable: true
    });

    var message = JSON.stringify(req.body);

    rabbitChannel.publish(ex, '', new Buffer(message));

    console.log(" [x] Sent '%s'", message);

    res.send("success you bastard");
});

server.get('/login', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    var loginApp = React.createFactory(App.LoginApp);

    var markup = React.renderToStaticMarkup(loginApp({authenticated: isAuthenticated(req), activeLink: "login"}));

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

    var registerApp = React.createFactory(App.RegisterApp);

    var markup = React.renderToStaticMarkup(registerApp({authenticated: isAuthenticated(req), activeLink: "register"}));

    res.send(markup);
});

server.post('/register', function(req, res) {
    console.log(req.body);

    User.findOne({username: req.body.username}, function (err, user) {
        if (user != null) {
            res.redirect('/register#fail');
        }

        bcrypt.hash(req.body.password, null, null, function(err, hash) {
            if (err) {
                console.log(err);
                res.end();
            }
            var user = new User({
                username: req.body.username,
                password: hash
            });

            user.save(function(err, user) {
                if (err) return console.error(err);
                console.dir(user);
            });

            req.login(user, function() {
                return res.redirect('/#loggedin');
            });
        });
    });
});

server.listen(3069);
