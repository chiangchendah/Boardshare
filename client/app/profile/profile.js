var $ = require('jquery');
var boards = [];

$.ajax({
  url: "/user/profile", 
  type: 'GET',
  contentType: 'application/json',
  success: function(json){
        for(var i = 0; i < json.boards.length; i++) {
          boards.push(json.boards);
        }
        var user = json[username];
  },
  error: function(data) {
    console.error('Failed to fetch user information');
  }
});
  
for(var i = 0; i < boards.length; i++) {
  $('#boards').append('<p>' + boards[i] + '</p>');
}

var boards = [];
$(function(){
$.ajax({
  url: "/user/profile", 
  type: 'GET',
  contentType: 'application/json',
  success: function(json){
        for(var i = 0; i < json.boards.length; i++) {
          boards.push(json.boards[i]);
        }
        var user = json.username;
        $('#user').append('<p>Username: ' + user + '</p>');
        boards.forEach(function(item, index, collection){
          
          var button = $('<button>DELETE</button>').attr('class', item);
          $(button).on('click', function(){
            var boardClass = button.attr('class');
            $.ajax({
              url: '/user/boards/' + boardClass,
              type: 'DELETE',
              success: function() {
                $('.' + boardClass).remove();
              }
            });
          });

          $('#boards').append('<p class="' + item + '"><a href="' + window.location.origin + '/' + item + '">' + item + '</a></p>', button);
        });
  },
  error: function(data) {
    console.error('Failed to fetch user information');
  }
});
  

});
