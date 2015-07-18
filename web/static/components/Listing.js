var React = require('react');

const Card = React.createClass({
    render: function() {

      var cardStyle = {
        backgroundImage: 'url('+this.props.imageUrl+')',
      };

      return (
        <div className="col s12 m7 l3">
          <div className="card brown lighten-4">
            <div className="card-image waves-effect waves-block waves-brown lighten-2">
              <img src={this.props.imageUrl} />
              <span className="card-title">{this.props.price}</span>
            </div>
            <div className="card-content">
              <p dangerouslySetInnerHTML={{__html: this.props.title}}></p>
            </div>
            <div className="card-action brown lighten-1 waves-effect">
              <a href={this.props.url}>Click Here For Details</a>
            </div>
          </div>
        </div>
      );
    }
});

module.exports = Card;

