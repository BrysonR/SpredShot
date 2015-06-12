require('node-jsx').install();

var express = require('express'),
    path = require('path'),
    amqp = require('amqplib'),
    when = require('when'),
    server = express(),
    React = require('react'),
    bodyParser = require('body-parser'),
    elasticsearch = require('elasticsearch'),
    App = require('./static/app');

server.use(express.static(__dirname + '/public'));
server.use(bodyParser.json());
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'html');

var host = process.env.APP_ENV == 'development'
  ? 'http://elastic:9200'
  : 'http://brentmills.cloudapp.net:9200';


var client = new elasticsearch.Client({
  host: host,
  log: 'trace'
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

server.post('/login', function(req, res) {
    console.log(req.username);
});

server.listen(3069);
