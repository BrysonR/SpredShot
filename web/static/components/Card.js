var React = require('react');

const Card = React.createClass({
    render: function() {
      var cardStyle = {
        backgroundImage: 'url('+this.props.imageUrl+')',
      }
      return (
        <div className="card" style={cardStyle}>
          <div className="image-cover">
            <img className="card-image" src={this.props.imageUrl} />
          </div>
          <div className="card-body">
            <a href={this.props.url} className="card-title" dangerouslySetInnerHTML={{__html: this.props.title}} ></a>
            <div className="card-price">{this.props.price}</div>
          </div>
        </div>
      );
    }
});

module.exports = Card;
