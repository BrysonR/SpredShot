var React = require('react');

var MessagesHeader = React.createClass({
	render: function() {
		return (
			<div className="messages-header">
				<div className="col s12 l5">
					<h5 className="white-text">subject</h5>
				</div>
				<div className="col hide-on-med-and-down l3">
					<h5 className="white-text">{this.props.recipientSender}</h5>
				</div>
				<div className="col hide-on-med-and-down l2">
					<h5 className="white-text">date</h5>
				</div>
				<div className="col hide-on-med-and-down l2">
					<h5 className="white-text">action</h5>
				</div>
			</div>
		);
	}
});

module.exports = MessagesHeader;
