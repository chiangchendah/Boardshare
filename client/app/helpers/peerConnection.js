var helpers = require('./peerHelpers');
var _ = require('lodash');
var socket = io();
var callHandler = require('../video/video').callHandler;

// todo: don't identify peers by peerjs id, use metadata
// on the channel.
// when connecting do something like:
// peer.connect(id, {metadata: whatever});


socket.on('env', function(env, port){
  if (env === 'production'){
    exports.peer = new Peer({
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
    exports.peer = new Peer({host: '/', port: port, path: '/api'});
  }
  exports.peer.on('open', function(id){
    console.log('peer id is: ', id);
    socket.emit('peerId', id);
  });
  exports.peer.on('connection', function(dataChannel){
    helpers.setDataListeners(dataChannel);
    helpers.dataConnections[dataChannel.id] = dataChannel;
  });
  exports.peer.on('call', function(call){
    console.log('incoming call');
    var stream = require('../video/video').videoStream;
    if(stream){
      call.answer(stream);
      callHandler(call);
    }
  });
});

socket.on('peerIds', function(ids){
  _.forEach(ids, function(id){
    var dataChannel = exports.peer.connect(id);
    helpers.setDataListeners(dataChannel);
    helpers.dataConnections[dataChannel.id] = dataChannel;
  });
});