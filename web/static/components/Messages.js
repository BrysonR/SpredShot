var React = require('react'),
    Message = require('./Message.js'),
    MessagesHeader = require('./MessagesHeader.js');

var Messages = React.createClass({
    render: function() {
    	if (this.props.data.inbox) {
    		var i = 0;
	    	var InboxMessages = this.props.data.inbox.map(function(message) {
	    		return (
	    			<Message key={ i++ } recipientSender={ message._source.sender } type='recipient' subject={ message._source.subject } date={ message._source.date.split('T')[0] }/>
				);
	    	});
    	}

    	if (this.props.data.sent) {
    		var i = 0;
	    	var SentMessages = this.props.data.sent.map(function(message) {
	    		return (
	    			<Message key={ i++ } recipientSender={ message._source.recipient } type='sender' subject={ message._source.subject } date={ message._source.date.split('T')[0] }/>
				);
	    	});
    	}

        return (
        	<div className="messages">
        		<div className="row-collapse">
				    <div className="col s12">
				      <ul className="tabs">
				        <li className="tab col s3"><a className="active" href="#inbox">inbox</a></li>
				        <li className="tab col s3"><a href="#sent">sent</a></li>
				      </ul>
				    </div>
				    <div id="inbox" className="col s12">
				    	<div className="row-collapse">
				        	<div className="message-list col s12">
				        		<div className="row row-collapse header-wrapper z-depth-4 brown darken-2">
				        			<MessagesHeader recipientSender="sender" />
				        		</div>
				        		<div className="row row-collapse z-depth-4 brown lighten-1">
				        			{ InboxMessages ? InboxMessages : "" }
				        		</div>
				        	</div>
		        		</div>
				    </div>
				    <div id="sent" className="col s12">
				    	<div className="row-collapse">
				        	<div className="message-list col s12">
				        		<div className="row row-collapse header-wrapper z-depth-4 brown darken-2">
				        			<MessagesHeader recipientSender="recipient" />
				        		</div>
				        		<div className="row row-collapse z-depth-4 brown-lighten-1">
				        			{ SentMessages ? SentMessages : "" }
				        		</div>
				        	</div>
		        		</div>
				    </div>
			  	</div>
			  	<div className="fixed-action-btn">
				  	<a href="/messages/compose" className="btn-floating btn-large waves-effect waves-light teal darken-2">
				  		<i className="material-icons">add</i>
			  		</a>
		  		</div>
        	</div>
        );
    }
});

module.exports = Messages;
