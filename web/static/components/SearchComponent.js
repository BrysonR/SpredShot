var React = require('react');

const Search = React.createClass({
  handleKeyDown: function(event) {
    console.log(event);
    if (event.which == 13) {
      this.handleSubmit();
    }
  },
  handleSubmit: function() {
    debugger;
    var query = $('.search-input').val();
    window.location = window.location.href + 'listings/' + query;
  },
  render: function() {
    return (
      <div className="row row-collapse">
        <form className="col s12 l7 z-depth-4 teal darken-2">
          <div className="row">
            <div className="input-field col s12">
              <input placeholder="What are you looking for?" id="search" type="text" className="validate" />
              <label htmlFor="search">Search</label>
            </div>
              <button className="btn waves-effect waves-light" type="submit"name="action">search
                <i className="mdi-content-send right"></i>
              </button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = Search;

