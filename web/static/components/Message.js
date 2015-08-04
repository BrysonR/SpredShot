var React = require('react');

var Message = React.createClass({
	render: function() {
		return (
			<div className="message">
				<div className="col s12 l5">
					<h5 className="white-text">{ this.props.subject }</h5>
				</div>
				<div className="col hide-on-med-and-down l3">
					<h5 className="white-text">{ this.props.recipientSender }</h5>
				</div>
				<div className="col hide-on-med-and-down l2">
					<h6 className="white-text">{ this.props.date }</h6>
				</div>
				<div className="col hide-on-med-and-down l2">
					<a className='dropdown-button btn teal darken-2 white-text' href='#' data-activates={this.props.type + 'ActionDropdown'}>Action</a>
					<ul id={this.props.type + 'ActionDropdown'} className='dropdown-content'>
					    <li><a href="#!">reply</a></li>
					    <li className="divider"></li>
					    <li><a href="#!">forward</a></li>
					    <li className="divider"></li>
					    <li><a href="#!">delete</a></li>
					</ul>
				</div>
			</div>
		);
	}
});

module.exports = Message;
