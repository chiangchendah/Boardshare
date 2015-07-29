var $ = require('jquery');

exports.initialize = function(){
  $.ajax({
    url: "/user/profile",
    type: 'GET',
    contentType: 'application/json',
    success: successHandler,
    error: errorHandler
  });
};

function successHandler(json) {
  $('#user').append('<p>Username: ' + json.username + '</p>');
  json.boards.forEach(function (board) {
    $('#boards').append(createElements(board));
  });
}

function errorHandler(err) {
  console.warn(err);
}

function createElements(board) {
  var button = $('<button>DELETE</button>')
    .addClass(board)
    .click(function(){
      deleteBoard( button.attr('class') );
    });
  var p = $('<p>')
    .addClass(board)
    .append($('<a>')
      .attr('href', window.location.origin + '/' + board)
      .text(board))
    .append(button);
  return p;
}

function deleteBoard(board) {
  $.ajax({
    url: '/user/boards/' + board,
    type: 'DELETE',
    success: function() {
      $('.' + board).remove();
    }
  });
}
