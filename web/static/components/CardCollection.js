var React = require('react');

const CardCollection = React.createClass({
  render: function() {
    var Cards = this.props.data.map(function (listing) {

      if (listing._source.imageUrl &&
          listing._source.imageUrl[0].indexOf('../') == -1 &&
          listing._source.title.indexOf('http') == -1 &&
          listing._source.imageUrl.indexOf('Image') == -1 &&
          listing._source.price[1].indexOf('+') == -1)
      {
        return (
            <Card key={listing._id} imageUrl={listing._source.imageUrl} title={listing._source.title} price={listing._source.price} url={listing._source.link} />
        );
      }
    });

    return (
      <div className="card-collection">
        <div className="arrow bounce"></div>
        {Cards}
      </div>
    );
  }
});

module.exports = CardCollection;
