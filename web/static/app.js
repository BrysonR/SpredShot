var React = require('react'),
    Card = require('./components/Card.js'),
    CardCollection = React.createFactory(require('./components/CardCollection.js')),
    Login = React.createFactory(require('./components/LoginComponent.js')),
    Search = React.createFactory(require('./components/SearchComponent.js')),
    List = React.createFactory(require('./components/ListComponent.js')),
    Register = React.createFactory(require('./components/RegisterComponent.js')),
    Nav = React.createFactory(require('./components/Nav.js'));

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
                return (
                    <link rel="stylesheet" href={ src } />
                );
            });
        }

        return (
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
              <title>Guns N Fun</title>
              <link rel="shortcut icon" href="/images/favicon.png" />
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
            var additionalScripts = this.props.scripts.map(function(src) {
                return (
                    <script src={ src }></script>
                );
            });
        }

        return (
            <div>
                <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
                <script src="https://fb.me/react-0.13.1.js"></script>
                <script src="/js/materialize.min.js"></script>
                <script src="/js/bundle.js"></script>
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
module.exports.CardCollection = CardCollection;
module.exports.List = List;
module.exports.Login = Login;
module.exports.Register = Register;
