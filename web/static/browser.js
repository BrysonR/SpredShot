var React = require('react'),
    ListApp = React.createFactory(require('./components/ListComponent.js')),
    SearchApp = React.createFactory(require('./components/SearchComponent.js')),
    ListingsApp = React.createFactory(require('./components/CardCollection.js'));

if (window.location.href.indexOf('list') != -1 && window.location.href.indexOf('listings') == -1) {
  React.render(ListApp(), document.getElementById('content'));
}
else if (window.location.href.indexOf('listings') != 1) {
  React.render(ListingsApp({data: data}), document.getElementById('content'));
}
else {
  React.render(SearchApp(), document.getElementById('content'));
}
