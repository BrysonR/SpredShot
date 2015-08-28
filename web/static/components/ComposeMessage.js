var React = require('react');

var ComposeMessage = React.createClass({
	getInitialState: function () {
    	return {
      		subject: '',
      		recipient: '',
      		message: ''
    	};
  	},
  	handleSubjectchange: function (evt) {
	    this.setState({
	      	subject: evt.target.value
	    });
  	},
  	handleRecipientChange: function (evt) {
	    this.setState({
	      	recipient: evt.target.value
	    });
  	},
  	handleMessageChange: function (evt) {
	    this.setState({
	      	message: evt.target.value
	    });
  	},
  	handleSubmit: function (evt) {
	    var data = this.state;

	    console.log(data);

	    $.ajax({
	      	url: '/messages/send',
	      	type: 'POST',
	      	contentType: 'application/json',
	      	async: true,
	      	data: JSON.stringify(data)
	    }).always(function(res) {
	    	var response = JSON.parse(res);
	    	debugger;
	      	if (response.status == 200) {
	      		debugger;
	      		window.location = '/#messagesent';
	      	} else if (response.status == 69) {
	      		window.location = '/#naughtyboy';
	      	} else {
	      		window.location = '/#somefailureinsendingmessage';
	      	}
	    });
	    // .done(function(res) {
	    //   	console.log("successfully sent message and response is: " + res);
	    //   	window.location = '/messages#messagesent';
	    // })
	    // .fail(function(err) {
	    //   	console.log("Epic Fail: " + err);
	    // })

  	},
  	render: function() {
		return (
			<div className="row row-collapse">
				<form className="col s12 l7">
		        	<div className="row z-depth-4 teal darken-2">
		            	<h5 className="component-title">compose message</h5>
		            <div className="input-field col s12">
		              	<input id="title" type="text" value={ this.state.subject } onChange={ this.handleSubjectchange } />
		              	<label htmlFor="title">subject</label>
		            </div>
		            <div className="input-field col s12">
		              	<input id="price" type="text" value={ this.state.recipient } onChange={ this.handleRecipientChange } />
		              	<label htmlFor="price">recipient</label>
		            </div>
		            <div className="input-field col s12">
		              	<textarea className="materialize-textarea" id="description" type="text" value={ this.state.message } onChange={ this.handleMessageChange }></textarea>
		              	<label htmlFor="description">message</label>
		            </div>
		            <div href="#" className="btn waves-effect waves-light" onClick={ this.handleSubmit }>Send Message
		              	<i className="mdi-content-send right"></i>
		            </div>
		          	</div>
		        </form>
			</div>
		);
	}
});

module.exports = ComposeMessage;
