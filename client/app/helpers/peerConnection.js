var helpers = require('./peerHelpers');
var _ = require('lodash');
var socket = io();
var peer;

socket.on('env', function(env, port){
  if (env === 'production'){
    peer = new Peer({
      host:'/', 
      secure:true, 
      port:443, 
      key: 'peerjs', 
      path: '/api', 
      config: {
        'iceServers': [
        { url: 'stun:stun.l.google.com:19302' } 
        ]
      }
    });
  } else {
    peer = new Peer({host: '/', port: port, path: '/api'});
  }
  peer.on('open', function(id){
    console.log('peer id is: ', id);
    socket.emit('peerId', id);
  });
  peer.on('connection', function(dataChannel){
    helpers.setDataListeners(dataChannel);
    helpers.dataConnections[dataChannel.id] = dataChannel;
  });
});

socket.on('peerIds', function(ids){
  _.forEach(ids, function(id){
    var dataChannel = peer.connect(id);
    helpers.setDataListeners(dataChannel);
    helpers.dataConnections[dataChannel.id] = dataChannel;
  });
});

module.exports = peer;