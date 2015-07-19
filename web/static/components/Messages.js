var React = require('react'),
    Message = require('./Message.js'),
    MessagesHeader = require('./MessagesHeader.js');

var Messages = React.createClass({
    render: function() {
    	if (this.props.data) {
    		var i = 0;
	    	var Messages = this.props.data.map(function(message) {
	    		return (
	    			<Message key={ i++ } subject={ message._source.subject } date={ message._source.date.split('T')[0] }/>
				);
	    	});
    	}

        return (
        	<div className="messages">
	        	<div className="row row-collapse">
		        	<div className="col s12">
		        		<div className="row z-depth-4 teal">
		        			<MessagesHeader />
		        		</div>
		        		<div className="row z-depth-4 teal">
		        			{ Messages ? Messages : "" }
		        		</div>
		        	</div>
        		</div>
        	</div>
        );
    }
});

module.exports = Messages;
