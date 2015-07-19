var React = require('react'),
    Message = require('./Message.js'),
    MessagesHeader = require('./MessagesHeader.js');

var Messages = React.createClass({
    render: function() {
    	if (this.props.data) {
	    	var Messages = this.props.data.map(function(message) {
	    		return (
	    			<Message message={ message } />
				)
	    	});
    	}

        return (
        	<div className="messages">
	        	<div className="row row-collapse">
		        	<div className="col s12">
		        		<div className="row z-depth-4 teal">
		        			<MessagesHeader />
		        		</div>
		        		<div className="row z-depth-4 teal darken-2">
		        			{ Messages ? Messages : "" }
		        		</div>
		        	</div>
        		</div>
        	</div>
        );
    }
});

module.exports = Messages;
