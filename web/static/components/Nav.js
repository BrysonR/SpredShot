var React = require('react');

const Nav = React.createClass({
  render: function () {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-2">
          <div className="nav-wrapper teal darken-4">
            <a href="#!" className="brand-logo">Logo</a>
            <a href="#" data-activates="sideBar" className="button-collapse"><i className="large mdi-navigation-menu"></i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html">Profile</a></li>
              <li><a href="components.html">Auction</a></li>
              <li><a href="javascript.html">Brands</a></li>
              <li><a href="mobile.html">Something</a></li>
            </ul>
            <ul className="side-nav z-depth-4" id="sideBar">
              <li><a href="sass.html">Profile</a></li>
              <li><a href="components.html">Auction</a></li>
              <li><a href="javascript.html">Brands</a></li>
              <li><a href="mobile.html">Something</a></li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
});

module.exports = Nav;
