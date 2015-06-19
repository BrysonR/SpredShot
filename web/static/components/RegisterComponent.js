var React = require('react'),
    $ = require('jquery');

const Register = React.createClass({
  getInitialState: function () {
    return {
      username: '',
      password: ''
    };
  },
  handleUsernameInput: function (evt) {
    this.setState({
      username: evt.target.value
    });
  },
  handlePasswordInput: function (evt) {
    this.setState({
      password: evt.target.value
    });
  },
  render: function () {
    return (
      <div className="valign row row-collapse">
        <form action="/register" method="post" className="col s12 l7">
          <div className="row z-depth-4 teal darken-2">
            <div className="input-field col s12">
              <input id="username" name="username" type="text" value={ this.state.username } onChange={ this.handleUsernameInput } />
              <label htmlFor="username">username</label>
            </div>
            <div className="input-field col s12">
              <input id="password" name="password" type="password" value={ this.state.password } onChange={ this.handlePasswordInput } />
              <label htmlFor="password">password</label>
            </div>
            <button className="btn waves-effect waves-light" type="submit">Register
              <i className="mdi-content-send right"></i>
            </button>
          </div>
        </form>
      </div>
    )
  }
});

module.exports = Register;
