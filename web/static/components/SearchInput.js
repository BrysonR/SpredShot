var React = require('react');

const SearchInput = React.createClass({
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
      <div className="search-container">
        <input className="search-input" onKeyDown={this.handleKeyDown}/>
      </div>
    );
  }
});

module.exports = SearchInput;

