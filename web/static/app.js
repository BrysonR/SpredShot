var React = require('react'),
    Card = require('./components/Card.js'),
    CardCollection = React.createFactory(require('./components/CardCollection.js')),
    Search = React.createFactory(require('./components/SearchComponent.js')),
    List = React.createFactory(require('./components/ListComponent.js')),
    Nav = React.createFactory(require('./components/Nav.js'));

const SearchApp = React.createClass({
  render: function() {
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <title>Guns N Fun</title>
          <link rel="stylesheet" href="/css/index.css" />
          <link rel="stylesheet" href='/css/materialize.css' />

        </head>
        <body>
            <div id="nav" dangerouslySetInnerHTML={ { __html: React.renderToString(Nav()) } }></div>

            <div id="content" className="container valign-wrapper" dangerouslySetInnerHTML={ { __html: React.renderToString(Search()) } }>
            </div>

            <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
            <script src="https://fb.me/react-0.13.1.js"></script>
            <script src="/js/materialize.min.js"></script>
            <script src="/js/bundle.js"></script>
            <script src="/js/nav_init.js"></script>
            <script src="/js/searchInit.js"></script>
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
              <link rel="stylesheet" href="/css/index.css" />
              <link rel='stylesheet' href='/css/materialize.css' />

            </head>
            <body>
              <div id="nav" dangerouslySetInnerHTML={ { __html: React.renderToString(Nav()) } }></div>

              <div id="content" className="container valign-wrapper" dangerouslySetInnerHTML={ { __html: React.renderToString(List()) } }></div>

              <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
              <script src="https://fb.me/react-0.13.1.js"></script>
              <script src="/js/materialize.min.js"></script>
              <script src="/js/bundle.js"></script>
              <script src="/js/nav_init.js"></script>
            </body>
        </html>
    );
  }
})

const ListingsApp = React.createClass({
  render: function() {
    debugger;
    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <title>Guns N Fun</title>
          <link rel="stylesheet" href="/css/index.css" />
          <link rel="stylesheet" href="/css/listings.css" />
          <link rel='stylesheet' href='/css/materialize.css' />

        </head>
        <body>
          <div id="nav" dangerouslySetInnerHTML={ { __html: React.renderToString(Nav()) } }></div>

          <script dangerouslySetInnerHTML={ { __html: 'var data = ' + JSON.stringify(this.props.data) } }></script>

          <div id="content" dangerouslySetInnerHTML={ { __html: React.renderToString(CardCollection({ data: this.props.data })) } }></div>

          <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
          <script src="https://fb.me/react-0.13.1.js"></script>
          <script src="/js/materialize.min.js"></script>
          <script src="/js/bundle.js"></script>
        </body>
      </html>
    );
  }
});

module.exports.SearchApp = SearchApp;
module.exports.ListingsApp = ListingsApp;
module.exports.ListApp = ListApp;
