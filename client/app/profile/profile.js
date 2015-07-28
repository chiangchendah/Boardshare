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

