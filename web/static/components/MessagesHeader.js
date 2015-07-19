var React = require('react');

var MessagesHeader = React.createClass({
	render: function() {
		return (
			<div className="messages-header">
				<div className="col s12 l5">
					<h5 className="white-text">Subject</h5>
				</div>
				<div className="col hide-on-med-and-down l3">
					<h5 className="white-text">Sender</h5>
				</div>
				<div className="col hide-on-med-and-down l2">
					<h5 className="white-text">Date</h5>
				</div>
				<div className="col hide-on-med-and-down l2">
					<h5 className="white-text">Action</h5>
				</div>
			</div>
		);
	}
});

module.exports = MessagesHeader;
