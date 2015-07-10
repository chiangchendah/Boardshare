var _ = require('lodash');
var peer = require('./peerConnection');

exports.dataConnections = {};

exports.emitDataToPeers = function(peerDataConnections, data){
  _.forEach(peerDataConnections, function(connection){
    if (connection.open) {
      connection.send(data);
    }
  });
};

exports.setDataListeners = function(peerDataConnection){
  peerDataConnection.on('open', function(){
    // maybe do something
  });
  peerDataConnection.on('data', function(data){
    if (data.chat) {
      $('#messages').append($('<li>').text(peerConnection.id + ': ' + data.chat));
    }
    // console.log(data);
  });
  peerDataConnection.on('close', function(){
    delete exports.dataConnections[peerConnection.id];
  });
  peerConnection.on('error', function(err){
    console.log(err);
  });
};