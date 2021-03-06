var React = require('react'),
    Listing = require('./Listing.js');

const Listings = React.createClass({
  render: function() {
    var ListingsArray = this.props.data.map(function (listing) {

      if (listing._source.imageUrl &&
          listing._source.imageUrl.indexOf('http') != -1)
      {
        return (
            <Listing key={listing._id} id={listing._source.listingId} imageUrl={listing._source.imageUrl} title={listing._source.title} price={listing._source.price} url={listing._source.link} />
        );
      }
    });

    return (
      <div className="listings row">
          {ListingsArray}
      </div>
    );
  }
});

module.exports = Listings;
