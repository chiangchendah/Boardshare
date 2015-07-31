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
  var logoutLink = $('<a href="/logout">Logout</a>');
  $('#user').html('<p>Hello <span>' + json.username + '</span>.  Here are the boards we have saved for you.</p>');
  $('#log').replaceWith(logoutLink);
  json.boards.forEach(function (board) {
    $('#boards').append(createElements(board));
  });
}

function errorHandler(err) {
  console.warn(err);
}

function createElements(board) {
  var button = $('<button><i class="fa fa-times-circle"></i></button>')
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
