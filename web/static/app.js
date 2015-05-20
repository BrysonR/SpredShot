var React = require('react'),
    Card = require('./components/Card.js');

var App = React.createClass({
  render: function() {

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

    const SearchInput = React.createClass({
      handleKeyDown: function(event) {
        console.log(event);
        if (event.which == 13) {
          this.handleSubmit();
        }
      },
      handleSubmit: function() {
        debugger;
        var query = $('.search-input').val();
        window.location = window.location.href + 'listings/' + query;
      },
      render: function() {
        return (
          <div className="search-container">
            <input className="search-input" onKeyDown={this.handleKeyDown}/>
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
            <link rel="stylesheet" href="/css/index.css" />
            <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

            <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
            <script src="https://fb.me/react-0.13.1.js"></script>
            <script src="/js/searchComponent.js"></script>
            <script src="/js/bundle.js"></script>

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
            <link rel="stylesheet" href="/css/index.css" />
            <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css' />

            <script src="https://code.jquery.com/jquery-1.10.0.min.js"></script>
            <script src="https://fb.me/react-0.13.1.js"></script>
            <script src="/js/bundle.js"></script>

          </head>
          <body>
            <CardCollection data={this.props.data} />
          </body>
        </html>
      );
    }
  }
});

module.exports = App;
