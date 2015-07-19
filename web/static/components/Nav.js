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

              {this.props.authenticated ? "" :
                this.props.activeLink == "search" ?
                <li className="active"><a className="waves-effect waves-teal" href="/">search</a></li> :
                <li><a className="waves-effect waves-teal" href="/">search</a></li>}

              {this.props.authenticated ? "" :
                this.props.activeLink == "login" ?
                <li className="active"><a className="waves-effect waves-teal" href="/login">login</a></li> :
                <li><a className="waves-effect waves-teal" href="/login">login</a></li>}

              {this.props.authenticated ? "" :
                this.props.activeLink == "register" ?
                <li className="active"><a className="waves-effect waves-teal" href="/register">register</a></li> :
                <li><a className="waves-effect waves-teal" href="/register">register</a></li>}
            </ul>
            <ul className={ this.props.authenticated ? "side-nav fixed z-depth-4 teal darken-2" : "side-nav z-depth-4 teal darken-2" } id="sideBar">

              {this.props.activeLink == "search" ?
                <li className="active"><a className="waves-effect waves-teal" href="/">search</a></li> :
                <li><a className="waves-effect waves-teal" href="/">search</a></li>}

              {this.props.authenticated ? this.props.activeLink == "list" ?
                <li className="active"><a className="waves-effect waves-teal" href="/list">list</a></li> :
                <li><a className="waves-effect waves-teal" href="/list">list</a></li> : ""}

              {this.props.authenticated ? this.props.activeLink == "messages" ?
                <li className="active"><a className="waves-effect waves-teal" href="/messages">messages</a></li> :
                <li><a className="waves-effect waves-teal" href="/messages">messages</a></li> : ""}

              {this.props.activeLink == "login" ?
                <li className="active"><a className="white-text waves-effect waves-teal" href={this.props.authenticated ? "/logout" : "/login"}>{this.props.authenticated ? "logout" : "login"}</a></li> :
                <li><a className="white-text waves-effect waves-teal" href={this.props.authenticated ? "/logout" : "/login"}>{this.props.authenticated ? "logout" : "login"}</a></li>}

              {this.props.authenticated ? "" : this.props.activeLink == "register" ?
                <li className="active"><a className="white-text waves-effect waves-teal" href="/register">register</a></li> :
                <li><a className="white-text waves-effect waves-teal" href="/register">register</a></li>}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Nav;
