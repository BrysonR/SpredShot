var React = require('react'),
    Nav = React.createFactory(require('./components/Nav.js')),
    Card = require('./components/Listing.js'),
    Listings = React.createFactory(require('./components/Listings.js')),
    Login = React.createFactory(require('./components/Login.js')),
    Search = React.createFactory(require('./components/Search.js')),
    List = React.createFactory(require('./components/List.js')),
    Register = React.createFactory(require('./components/Register.js')),
    Messages = React.createFactory(require('./components/Messages.js')),
    ComposeMessage = React.createFactory(require('./components/ComposeMessage.js'));

const NavBar = React.createClass({
    render: function() {
        return (
            <div>
                <div id="nav" dangerouslySetInnerHTML={ { __html: React.renderToString(Nav({authenticated: this.props.authenticated, activeLink: this.props.activeLink})) } }></div>
                <script dangerouslySetInnerHTML={ { __html: 'var authenticated = ' + JSON.stringify(this.props.authenticated) } }></script>
                <script dangerouslySetInnerHTML={ { __html: 'var activeLink = ' + JSON.stringify(this.props.activeLink) } }></script>
            </div>
        );
    }
})

const Head = React.createClass({
    render: function() {
        if (this.props.styles) {
            var additionalStyles = this.props.styles.map(function(src) {
                var i = 69;
                return (
                    <link key={ i++ } rel="stylesheet" href={ src } />
                );
            });
        }

        return (
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
              <title>Guns N Fun</title>
              <link rel="shortcut icon" href="/images/favicon.png" />
              <link rel="stylesheet" href="/css/icon-style.css" />
              <link rel="stylesheet" href="/css/index.css" />
              <link rel="stylesheet" href="/css/materialize.css" />
              { additionalStyles }
            </head>
        );
    }
})

const Scripts = React.createClass({
    render: function() {
        if(this.props.scripts) {
            var i = 69;
            var additionalScripts = this.props.scripts.map(function(src) {
                return (
                    <script key={ i++ } src={ src }></script>
                );
            });
        }

        return (
            <div>
                <script src="/js-lib/jquery-2.1.1.min.js"></script>
                <script src="/js-lib/react-0.13.1.js"></script>
                <script src="/js-lib/materialize.min.js"></script>
                <script src="/js/bundle.min.js"></script>
                <script src="/js/nav_init.js"></script>
                { additionalScripts }
            </div>
        );
    }
})

const Page = React.createClass({
  render: function() {
    return (
        <html>
          <Head styles={ this.props.styles }/>
          <body className={ this.props.authenticated ? "loggedInNav" : "" }>
              <NavBar authenticated={this.props.authenticated} activeLink={this.props.activeLink} />

              { this.props.data ? <script dangerouslySetInnerHTML={ { __html: 'var data = ' + JSON.stringify(this.props.data) } }></script> : '' }

              <div id="content" className={ this.props.valign ? "container valign-wrapper" : "container" } dangerouslySetInnerHTML={ { __html: React.renderToString( this.props.app({ data: this.props.data }) ) } }></div>

              <Scripts scripts={ this.props.scripts } />
          </body>
        </html>
    );
  }
});

module.exports.Page = Page;
module.exports.Search = Search;
module.exports.Listings = Listings;
module.exports.List = List;
module.exports.Login = Login;
module.exports.Register = Register;
module.exports.Messages = Messages;
module.exports.ComposeMessage = ComposeMessage;
