var React = require('react'),
    ListApp = React.createFactory(require('./components/ListComponent.js')),
    SearchApp = React.createFactory(require('./components/SearchComponent.js')),
    ListingsApp = React.createFactory(require('./components/CardCollection.js')),
    LoginApp = React.createFactory(require('./components/LoginComponent.js')),
    RegisterApp = React.createFactory(require('./components/RegisterComponent.js')),
    Nav = React.createFactory(require('./components/Nav.js'));

React.render(Nav(), document.getElementById('nav'));

if (window.location.href.indexOf('list') != -1 && window.location.href.indexOf('listings') == -1) {
  React.render(ListApp(), document.getElementById('content'));
}
else if (window.location.href.indexOf('listings') != -1) {
  React.render(ListingsApp({data: data}), document.getElementById('content'));
} else if (window.location.href.indexOf('login') != -1) {
  React.render(LoginApp(), document.getElementById('content'));
} else if (window.location.href.indexOf('register') != -1) {
  React.render(RegisterApp(), document.getElementById('content'));
} else {
  React.render(SearchApp(), document.getElementById('content'));
}
