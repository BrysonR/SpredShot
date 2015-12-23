$(function() {
  $('#search').keydown(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      var query = $('#search').val();
      window.location = 'listings/' + query;
    }
  })
})
