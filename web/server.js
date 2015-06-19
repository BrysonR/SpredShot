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
    App = require('./static/app');

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'html');
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

// User Authentication
passport.initialize();

passport.use(new LocalStrategy(
    function(username, password, done) {
        console.log(username);
        console.log(password)
        User.findOne({ username: username }, function(err, user) {
            console.log(err);
            console.log(user);
            console.log(password);
            if (err) { return done(err); }

            if (!user) {
                return done(null, false, { message: 'Wrong Username' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Wrong password betch' });
            }

            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

server.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    var searchApp = React.createFactory(App.SearchApp);

    var markup = React.renderToStaticMarkup(searchApp());

    res.send(markup);
});

server.get('/list', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    var listApp = React.createFactory(App.ListApp);

    var markup = React.renderToStaticMarkup(listApp());

    res.send(markup);
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

        var markup = React.renderToStaticMarkup(listingsApp({data: resp.hits.hits}));

        res.send(markup);

    }, function (err) {
        res.send(err);
    });
});

var rabbitConn = amqp.connect('amqp://rabbit');

server.post('/rabbit', function(req, res) {
    var rabitChannel = rabbitConn.createChannel();

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

    var markup = React.renderToStaticMarkup(loginApp());

    res.send(markup);
});

server.post('/login', passport.authenticate('local', { successRedirect: '/',
                                failureRedirect: '/login#fail',
                                failureFlash: false })
);

server.get('/register', function(req, res) {
    res.setHeader('Content-Type', 'text/html');

    var registerApp = React.createFactory(App.RegisterApp);

    var markup = React.renderToStaticMarkup(registerApp());

    res.send(markup);
});

server.post('/register', function(req, res) {
    console.log(req.body);

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    user.save(function(err, user) {
        if (err) return console.error(err);
        console.dir(user);
    })

    res.redirect('/login');
});

server.listen(3069);
