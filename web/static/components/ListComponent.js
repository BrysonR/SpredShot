var React = require('react'),
    $ = require('jquery');

var List = React.createClass({
  getInitialState: function () {
    return {
      title: '',
      price: '',
      image: '',
      description: ''
    };
  },
  handleTitleChange: function (evt) {
    this.setState({
      title: evt.target.value
    });
  },
  handlePriceChange: function (evt) {
    this.setState({
      price: evt.target.value
    });
  },
  handleImageChange: function (evt) {
    this.setState({
      image: evt.target.value
    });
  },
  handleDescriptionChange: function (evt) {
    this.setState({
      description: evt.target.value
    });
  },
  handleSubmit: function (evt) {
    var data = {
      body: this.state
    }

    console.log(data);

    $.ajax({
      url: '/rabbit',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data)
    })
    .done(function(res) {
      console.log("success and response is: " + res);
    })
    .fail(function(err) {
      console.log("Epic Fail: " + err);
    })
    .always(function() {
      console.log("Attempted to post listing to rabbit");
    });
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
