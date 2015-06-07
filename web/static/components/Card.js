var React = require('react');

const Card = React.createClass({
    render: function() {

      var cardStyle = {
        backgroundImage: 'url('+this.props.imageUrl+')',
      };

      return (
        <div className="col s12 m7 l3">
          <div className="card">
            <div className="card-image">
              <img src={this.props.imageUrl} />
              <span className="card-title">{this.props.price}</span>
            </div>
            <div className="card-content">
              <p dangerouslySetInnerHTML={{__html: this.props.title}}></p>
            </div>
            <div className="card-action">
              <a href={this.props.url}>Click Here For Details</a>
            </div>
          </div>
        </div>
      );
    }
});

module.exports = Card;

