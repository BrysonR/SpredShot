var React = require('react');

const Nav = React.createClass({
  render: function () {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-2">
          <div className="nav-wrapper teal darken-2">
            <a href="#!" className="brand-logo">Logo</a>
            <a href="#" data-activates="sideBar" className="button-collapse"><i className="waves-effect waves-teal lighten-2 large mdi-navigation-menu"></i></a>
            <ul className="right hide-on-med-and-down">
              <li><a className="waves-effect waves-teal darken-2" href="/">Search</a></li>
              <li><a className="waves-effect waves-teal darken-2" href="/list">List</a></li>
              <li><a className="waves-effect waves-teal darken-2" href="/login">Login</a></li>
            </ul>
            <ul className="side-nav z-depth-4" id="sideBar">
              <li><a className="waves-effect waves-teal darken-2" href="/">Search</a></li>
              <li><a className="waves-effect waves-teal darken-2" href="/list">List</a></li>
              <li><a className="waves-effect waves-teal darken-2" href="/login">Login</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Nav;
