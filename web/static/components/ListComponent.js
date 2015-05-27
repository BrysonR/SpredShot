var React = require('react'),
    jQuery = require('jquery');

var List = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      price: '',
      image: '',
      description: ''
    };
  },
  handleKeyDown: function (evt) {
    console.log('bryson');

    this.setState({
      title: evt.target.value
    });

    return false;
  },
  handlePriceChange: function (evt) {
    console.log('bryson');
    this.setState({
      price: evt.target.value
    });
  },
  handleImageChange: function (evt) {
    console.log('bryson');
    this.setState({
      image: evt.target.value
    });
  },
  handleDescriptionChange: function (evt) {
    console.log('bryson');
    this.setState({
      description: evt.target.value
    });
  },
  handleSubmit: function (evt) {
    console.log('bryson is awesome');
  },
  render: function() {
    return (
      <div className="list-container">
        <input placeholder="title" value={ this.state.title } onChange={ this.handleTitleChange } className="list-item list-title" />
        <input placeholder="price" value={ this.state.price } onChange={ this.handlePriceChange } className="list-item list-price" />
        <input placeholder="image" value={ this.state.image } onChange={ this.handleImageChange } className="list-item list-image" />
        <input placeholder="description" value={ this.state.description } onChange={ this.handleDescriptionChange } className="list-item list-description" />
        <button className="list-item list-button" onClick={ this.handleSubmit } type="submit">List Yo Shit</button>
      </div>
    );
  }
});

module.exports = List;
