var React = require('react');

const List = React.createClass({
  render: function() {
    return (
      <div className="list-container">
        <input placeholder="title" className="list-item list-title" />
        <input placeholder="price" className="list-item list-price" />
        <input placeholder="image" className="list-item list-image" />
        <input placeholder="description" className="list-item list-description" />
        <button className="list-item list-button">List Yo Shit</button>
      </div>
    );
  }
});

module.exports = List;
