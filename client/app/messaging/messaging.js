var remotePeers = require('../helpers/remotePeers');

exports.initialize = function(){
  $('#messages-form').on('submit', function(e){
    e.preventDefault();
    var msg = $('#m').val();
    if(msg === ''){
      return false;
    }
    remotePeers.sendData({chat: msg});
    $('#m').val('');
    $('#messages').append($('<li>').text('me' + ': ' + msg));
    return false;
  });
};

exports.appendMessage = function(name, data) {
  $('#messages').append($('<li>').text(name + ': ' + data));
};
