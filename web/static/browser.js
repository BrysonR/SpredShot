var React = require('react'),
    Nav = React.createFactory(require('./components/Nav.js')),
    ListApp = React.createFactory(require('./components/List.js')),
    SearchApp = React.createFactory(require('./components/Search.js')),
    ListingsApp = React.createFactory(require('./components/Listings.js')),
    LoginApp = React.createFactory(require('./components/Login.js')),
    RegisterApp = React.createFactory(require('./components/Register.js')),
    MessagesApp = React.createFactory(require('./components/Messages.js')),
    ComposeMessageApp = React.createFactory(require('./components/ComposeMessage.js'));

React.render(Nav({authenticated: authenticated, activeLink: activeLink}), document.getElementById('nav'));

if ((window.location.href.indexOf('list') || window.location.href.indexOf('List')) != -1 && window.location.href.indexOf('istings') == -1) {
  React.render(ListApp(), document.getElementById('content'));
}
else if (window.location.href.indexOf('istings') != -1) {
  React.render(ListingsApp({data: data}), document.getElementById('content'));
} else if (window.location.href.indexOf('ogin') != -1) {
  React.render(LoginApp(), document.getElementById('content'));
} else if (window.location.href.indexOf('egister') != -1) {
  React.render(RegisterApp(), document.getElementById('content'));
} else if (window.location.href.indexOf('essages') != -1 && window.location.href.indexOf('ompose') == -1) {
  React.render(MessagesApp({data: data}), document.getElementById('content'));
} else if (window.location.href.indexOf('ompose') != -1) {
  React.render(ComposeMessageApp({data: data}), document.getElementById('content'));
} else {
  React.render(SearchApp(), document.getElementById('content'));
}
