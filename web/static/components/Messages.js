var React = require('react'),
    Message = require('./Message.js'),
    MessagesHeader = require('./MessagesHeader.js');

var Messages = React.createClass({
    render: function() {
    	if (this.props.data) {
    		var i = 0;
	    	var Messages = this.props.data.map(function(message) {
	    		return (
	    			<Message key={ i++ } sender={ message._source.sender } subject={ message._source.subject } date={ message._source.date.split('T')[0] }/>
				);
	    	});
    	}

        return (
        	<div className="messages">
        		<div className="row">
				    <div className="col s12">
				      <ul className="tabs">
				        <li className="tab col s3"><a className="active" href="#inbox">inbox</a></li>
				        <li className="tab col s3"><a href="#sent">sent</a></li>
				      </ul>
				    </div>
				    <div id="inbox" className="col s12">
				    	<div className="row row-collapse">
				        	<div className="message-list col s12">
				        		<div className="row header-wrapper z-depth-4 teal">
				        			<MessagesHeader />
				        		</div>
				        		<div className="row z-depth-4 teal">
				        			{ Messages ? Messages : "" }
				        		</div>
				        	</div>
		        		</div>
				    </div>
				    <div id="sent" className="col s12">sent</div>
				  </div>
        	</div>
        );
    }
});

module.exports = Messages;
