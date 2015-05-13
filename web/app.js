var React = require('react');
var App = React.createClass({
  render: function() {

    var Card = React.createClass({
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

    var CardCollection = React.createClass({
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

    var SearchInput = React.createClass({
      render: function() {
        return (
          <div className="search-container">
            <input className="search-input" />
          </div>
        );
      }
    })


    if (this.props.page == 'search') {
      return (
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>Guns N Fun</title>
            <link rel="stylesheet" href="/styles/css/index.css" />
            <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

            <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
            <script src="https://fb.me/react-0.13.1.js"></script>
            <script src="/searchComponent.js"></script>
            <script src="/js/build/bundle.js"></script>

          </head>
          <body>
            <SearchInput />
          </body>
        </html>
      );
    }
    else if (this.props.page == 'listings') {
      return (
        <html>
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
            <title>Guns N Fun</title>
            <link rel="stylesheet" href="/styles/css/index.css" />
            <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

            <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
            <script src="https://fb.me/react-0.13.1.js"></script>
            <script src="/js/build/bundle.js"></script>

          </head>
          <body>
            <CardCollection data={this.props.data} />
          </body>
        </html>
      );
    }
  }
});

module.exports.App = App;
