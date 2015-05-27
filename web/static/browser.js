var React = require('react'),
    // This is our React component, shared by server and browser thanks to browserify
    ListApp = React.createFactory(require('./components/ListComponent.js')),
    SearchApp = React.createFactory(require('./components/SearchComponent.js')),
    ListingsApp = React.createFactory(require('./components/CardCollection.js'));

// This script will run in the browser and will render our component using the
// value from APP_PROPS that we generate inline in the page's html on the server.
// If these props match what is used in the server render, React will see that
// it doesn't need to generate any DOM and the page will load faster

if (window.location.href.indexOf('list') != -1 && window.location.href.indexOf('listings') == -1) {
  React.render(ListApp(), document.getElementById('content'));
}
else if (window.location.href.indexOf('listings') != 1) {
  React.render(ListingsApp(), document.getElementById('content'));
}
else {
  React.render(SearchApp(), document.getElementById('content'));
}
