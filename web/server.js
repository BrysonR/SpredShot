require('node-jsx').install();

var express = require('express'),
    path = require('path'),
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

server.get('/Glocks', function(req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");

    client.search({
        index: 'gunsnfun',
        q: 'glock+sig',
        size: 1000
    }).then(function (resp) {
        res.send(resp.hits.hits);
    }, function (err) {
        res.send(err);
    });
});

server.listen(3069);
