require('node-jsx').install();

var express = require('express'),
    path = require('path'),
    amqp = require('amqplib'),
    when = require('when'),
    server = express(),
    React = require('react'),
    elasticsearch = require('elasticsearch'),
    App = require('./static/app');

server.use(express.static(__dirname + '/public'));
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

server.get('/rabbit', function(req, res) {
    amqp.connect('amqp://rabbit').then(function(conn) {
        return when(conn.createChannel().then(function(ch) {
            var ex = 'ar15';
            var ok = ch.assertExchange(ex, 'direct', {
                durable: false
            })

            console.log(JSON.stringify(req));

            var message = req.message;

            return ok.then(function() {
                ch.publish(ex, '', new Buffer(message));
                console.log(" [x] Sent '%s'", message);
                return ch.close();
            });
        })).ensure(function() {
            conn.close();
        });
    }).then(null, console.warn);
});

server.listen(3069);
