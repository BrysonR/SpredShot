var React = require('react');

const Login = React.createClass({
  getInitialState: function () {
    return {
      login: {
        username: '',
        password: ''
      },
      failure: false
    };
  },
  componentDidMount: function () {
    if (window.location.href.indexOf('#fail') != -1) {
      this.setState({
        failure: true
      })
    }
  },
  handleUsernameInput: function (evt) {
    this.setState({
      login: {
        username: evt.target.value,
        password: this.state.login.password
      }
    });
  },
  handlePasswordInput: function (evt) {
    this.setState({
      login: {
        username: this.state.login.username,
        password: evt.target.value
      }
    });
  },
  render: function () {
    return (
      <div className="valign row row-collapse">
        <form action="/login" method="post" className="col s12 l7">
          <div className="row z-depth-4 teal darken-2">
            <h5 className="component-title">login</h5>
            <div className="input-field col s12">
              <input id="username"
                    name="username"
                    type="text"
                    className={ this.state.failure && this.state.login.username.length == 0 ? "invalid" : "" }
                    value={ this.state.login.username }
                    onChange={ this.handleUsernameInput } />
              <label htmlFor="username">{ this.state.failure && this.state.login.username.length == 0 ? "invalid username. please reenter" : "username" }</label>
            </div>
            <div className="input-field col s12">
              <input id="password"
                    name="password"
                    type="password"
                    className={ this.state.failure && this.state.login.password.length == 0 ? "invalid" : "" }
                    value={ this.state.login.password }
                    onChange={ this.handlePasswordInput } />
              <label htmlFor="password">{ this.state.failure && this.state.login.password.length == 0 ? "invalid password. please reenter" : "password" }</label>
            </div>
            <button className="btn waves-effect waves-light" type="submit">Sign In
              <i className="mdi-content-send right"></i>
            </button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = Login;
