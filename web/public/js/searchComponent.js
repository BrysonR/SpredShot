'use strict';

$(function () {
  $('.search-input').keypress(function (event) {
    if (event.which == 13) {
      var query = $('.search-input').val();
      window.location = window.location.href + 'listings/' + query;
    }
  });
});
//# sourceMappingURL=searchComponent.js.map