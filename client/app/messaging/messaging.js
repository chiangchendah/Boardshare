var dataConnections = require('../helpers/peerHelpers').dataConnections;
var setDataListeners = require('../helpers/peerHelpers').setDataListeners;
var emitDataToPeers = require('../helpers/peerHelpers').emitDataToPeers;
var _ = require('lodash');

module.exports = function(){
  $('#messages-form').on('submit', function(e){
    e.preventDefault();
    var msg = $('#m').val();
    if(msg === ''){
      return false;
    }
    emitDataToPeers(dataConnections, { chat: msg });
    $('#m').val('');
    $('#messages').append($('<li>').text('me' + ': ' + msg));
    return false;
  });
};
