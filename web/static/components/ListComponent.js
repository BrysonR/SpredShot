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
      <div className="valign row row-collapse">
        <form className="col s12 l7">
          <div className="row z-depth-4 teal darken-2">
            <div className="input-field col s12">
              <input id="title" type="text" value={ this.state.title } onChange={ this.handleTitleChange } />
              <label htmlFor="title">title</label>
            </div>
            <div className="input-field col s12">
              <input id="price" type="text" value={ this.state.price } onChange={ this.handlePriceChange } />
              <label htmlFor="price">price</label>
            </div>
            <div className="file-field input-field col s12">
              <input id="image" type="text" value={ this.state.image } onChange={ this.handleImageChange } />
              <label htmlFor="image">image</label>
            </div>
            <div className="input-field col s12">
              <textarea className="materialize-textarea" id="description" type="text" value={ this.state.description } onChange={ this.handleDescriptionChange }></textarea>
              <label htmlFor="description">description</label>
            </div>
            <button href="#" className="btn waves-effect waves-light" onClick={ this.handleSubmit }>List Yo Shit
              <i className="mdi-content-send right"></i>
            </button>
          </div>
        </form>
      </div>
    );
  }
});

module.exports = List;
