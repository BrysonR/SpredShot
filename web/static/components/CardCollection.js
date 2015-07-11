var React = require('react'),
    Card = require('./Card.js');

const CardCollection = React.createClass({
  render: function() {
    var Cards = this.props.data.map(function (listing) {

      if (listing._source.imageUrl &&
          listing._source.imageUrl.indexOf('http') != -1 &&
          listing._source.price.indexOf('.') != -1)
      {
        return (
            <Card key={listing._id} imageUrl={listing._source.imageUrl} title={listing._source.title} price={listing._source.price} url={listing._source.link} />
        );
      }
    });

    return (
      <div className="row">
          {Cards}
      </div>
    );
  }
});

module.exports = CardCollection;
