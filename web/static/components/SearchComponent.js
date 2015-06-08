var React = require('react');

var Search = React.createClass({
  getInitialState: function () {
    return {
      query: ''
    };
  },
  handleInput: function (evt) {
    this.setState({
      query: evt.target.value
    });
  },
  render: function() {
    return (
      <div className="row row-collapse">
        <form className="col s12 l7 z-depth-4 teal darken-2">
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="What are you looking for?" value={this.state.query} onChange={this.handleInput} id="search" type="text" />
              <label htmlFor="search">Search</label>
            </div>
            <a href={ "listings/" + this.state.query} className="btn waves-effect waves-light">search
              <i className="mdi-content-send right"></i>
            </a>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Search;

