var React = require('react');

const Nav = React.createClass({
  render: function () {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper brown">
            <a href="#!" className="brand-logo">Logo</a>
            <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="mdi-navigation-menu"></i></a>
            <ul className="right hide-on-med-and-down">
              <li><a href="sass.html">Profile</a></li>
              <li><a href="components.html">Auction</a></li>
              <li><a href="javascript.html">Brands</a></li>
              <li><a href="mobile.html">Something</a></li>
            </ul>
            <ul className="side-nav" id="mobile-demo">
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
