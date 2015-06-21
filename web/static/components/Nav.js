var React = require('react');

const Nav = React.createClass({
  render: function () {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-2 teal darken-2">
          <div className="nav-wrapper teal darken-2">
            <a href="#" className="brand-logo"><img src="/images/logo.svg" width="100px" height="64px"/></a>
            <a href="#" data-activates="sideBar" className="button-collapse"><i className="waves-effect waves-teal lighten-2 large mdi-navigation-menu"></i></a>
            <ul className="right hide-on-med-and-down">
              <li><a className="waves-effect waves-teal darken-2" href="/">search</a></li>
              {this.props.authenticated ? "" : <li><a className="waves-effect waves-teal darken-2" href="/list">list</a></li>}
              <li><a className="waves-effect waves-teal darken-2" href={this.props.authenticated ? "/logout" : "/login"}>{this.props.authenticated ? "logout" : "login"}</a></li>
              {this.props.authenticated ? "" : <li><a className="waves-effect waves-teal darken-2" href="/register">register</a></li>}
            </ul>
            <ul className="side-nav z-depth-4" id="sideBar">
              <li><a className="waves-effect waves-teal darken-2" href="/">search</a></li>
              {this.props.authenticated ? "" : <li><a className="waves-effect waves-teal darken-2" href="/list">list</a></li>}
              <li><a className="waves-effect waves-teal darken-2" href={this.props.authenticated ? "/logout" : "/login"}>{this.props.authenticated ? "logout" : "login"}</a></li>
              {this.props.authenticated ? "" : <li><a className="waves-effect waves-teal darken-2" href="/register">register</a></li>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Nav;
