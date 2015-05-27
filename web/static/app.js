var React = require('react'),
    Card = require('./components/Card.js'),
    CardCollection = React.createFactory(require('./components/CardCollection.js')),
    Search = React.createFactory(require('./components/SearchComponent.js')),
    List = React.createFactory(require('./components/ListComponent.js'));

const SearchApp = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <title>Guns N Fun</title>
          <link rel="stylesheet" href="/css/index.css" />
          <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

        </head>
        <body>
            <div id="content" dangerouslySetInnerHTML={ { __html: React.renderToString(Search()) } }></div>

            <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
            <script src="https://fb.me/react-0.13.1.js"></script>
            <script src="/js/searchInit.js"></script>
            <script src="/js/bundle.js"></script>
        </body>
      </html>
    );
  }
});

const ListApp = React.createClass({
  render: function() {
    return(
        <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
              <title>Guns N Fun</title>
              <link rel="stylesheet" href="/css/list.css" />
              <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

            </head>
            <body>

              <div id="content" dangerouslySetInnerHTML={ { __html: React.renderToString(List()) } }></div>

              <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
              <script src="https://fb.me/react-0.13.1.js"></script>
              <script src="/js/bundle.js"></script>

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

        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={ { __html: React.renderToString(CardCollection({ data: this.props.data })) } }></div>

          <script dangerouslySetInnerHTML={ { __html: 'var data = ' + this.props.data } }></script>

          <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
          <script src="https://fb.me/react-0.13.1.js"></script>
          <script src="/js/bundle.js"></script>

        </body>
      </html>
    );
  }
});

module.exports.SearchApp = SearchApp;
module.exports.ListingsApp = ListingsApp;
module.exports.ListApp = ListApp;
