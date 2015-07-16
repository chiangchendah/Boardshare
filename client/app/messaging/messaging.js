var $ = require('jquery');
var remotePeers = require('../helpers/remotePeers');

// Helper function to create chats
function createChat(name, data) {
  return $('<li>').append(
    $('<div>', {'class': 'content'}).append(
      $('<h3>', {'text': name})
    ).append($('<span>', {'class': 'preview', 'text': data}))
  );
}

exports.initialize = function(){
  var chatBody = $('.body')[0];
  $('#messages-form').on('submit', function(e){
    e.preventDefault();
    var msg = $('#m').val();
    if(msg === ''){
      return false;
    }
    remotePeers.sendData({chat: msg});
    $('#m').val('');
    var chat = createChat('Me', msg);
    $('#messages').append(chat);
    chatBody.scrollTop = $('#messages')[0].scrollHeight += 20;
    return false;
  });
};

exports.appendMessage = function(name, data) {
  var chat = createChat(name, data);
  var chatBody = $('.body')[0];
  $('#messages').append(chat);
  chatBody.scrollTop = $('#messages')[0].scrollHeight += 20;
};
