var forEach = require('lodash/collection/forEach');
var Peer = require('peerjs');
var socket = require('socket.io-client')();
var helpers = require('./peerHelpers');
var remotePeers = require('./remotePeers');
var RemotePeer = require('./remotePeer');
var callHandler = require('../video/video').callHandler;
var saveBoard = require('./saveBoard');
var rtc;

socket.on('env', function(env, port){
  if (env === 'production'){
    exports.rtc = new Peer({ host:'/', secure:true, port:443, path: '/api' });
  } else {
    exports.rtc = new Peer({ host: '/', port: port, path: '/api' });
  }
  rtc = exports.rtc;
  rtc.on('open', function(id){
    // console.log('peer id is: ', id);
    socket.emit('rtcReady', id, (/\w+$/).exec(window.location.href)[0]);
    helpers.stayAlive(rtc);
    saveBoard();
  });
  rtc.on('connection', function(dataConnection){
    var remotePeer = new RemotePeer(dataConnection.peer, dataConnection);
  });
  rtc.on('disconnection', function(id){
    console.log('disconnected from peer server', id);
    setTimeout(function(){
      rtc.reconnect();
    }, 300);
  });
  rtc.on('call', function(call){
    var stream = require('../video/video').videoStream;
    if(stream){
      call.answer(stream);
      callHandler(call);
      remotePeers.getPeer(call.peer).mediaConnection = call;
    }
  });
});
socket.on('peerIds', function(ids){
  forEach(ids, function(id){
    if (! remotePeers.alreadyExists(id)) {
      var remotePeer = new RemotePeer(id, rtc.connect(id));
    }
  });
});
