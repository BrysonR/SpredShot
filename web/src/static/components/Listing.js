var React = require('react');

const Card = React.createClass({
    handleSelection : function() {
        var data = {
            listingId: this.props.id
        }

        $.ajax({
            url: '/listing_redirect',
            type: 'POST',
            contentType: 'application/json',
            async: true,
            data: JSON.stringify(data)
        }).always(function(res) {
            var response = JSON.parse(res);
            debugger;
            if (response.statusCode == 200) {
              window.location = '/messages/compose';
            }
        });
    },
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
              <a onClick={this.handleSelection}>Click Here For Details</a>
            </div>
          </div>
        </div>
      );
    }
});

module.exports = Card;

