var React = require('react');

const Search = React.createClass({
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
  handleSubmit: function () {
    window.location.assign("listings/" + this.state.query);
  },
  render: function() {
    return (
      <div className="row row-collapse">
        <form className="col s12 l7">
          <div className="row z-depth-4 teal darken-2">
            <div className="input-field col s12">
              <input value={this.state.query} onChange={this.handleInput} id="search" type="text" />
              <label htmlFor="search">what are you looking for?</label>
            </div>
            <a className="btn waves-effect waves-light" onClick={this.handleSubmit}>search
              <i className="mdi-action-search right"></i>
            </a>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Search;

