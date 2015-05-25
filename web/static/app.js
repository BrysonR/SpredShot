var React = require('react'),
    Card = require('./components/Card.js'),
    CardCollection = require('./components/CardCollection.js'),
    SearchInput = require('./components/SearchInput.js'),
    List = require('./components/ListComponent.js');

const SearchApp = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <title>Guns N Fun</title>
          <link rel="stylesheet" href="/css/index.css" />
          <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

          <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
          <script src="https://fb.me/react-0.13.1.js"></script>
          <script src="/js/searchInit.js"></script>
          <script src="/js/bundle.js"></script>

        </head>
        <body>
          <SearchInput />
        </body>
      </html>
    );
  }
});

const ListApp = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <title>Guns N Fun</title>
          <link rel="stylesheet" href="/css/list.css" />
          <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

          <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
          <script src="https://fb.me/react-0.13.1.js"></script>
          <script src="/js/bundle.js"></script>

        </head>
        <body>

          <List />

        </body>
      </html>
    );
  }
})

const ListingsApp = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <title>Guns N Fun</title>
          <link rel="stylesheet" href="/css/index.css" />
          <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

          <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
          <script src="https://fb.me/react-0.13.1.js"></script>
          <script src="/js/bundle.js"></script>

        </head>
        <body>
          <CardCollection data={this.props.data} />
        </body>
      </html>
    );
  }
});

module.exports.SearchApp = SearchApp;
module.exports.ListingsApp = ListingsApp;
module.exports.ListApp = ListApp;
