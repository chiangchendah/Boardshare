var forEach = require('lodash/collection/forEach');
var Peer = require('peerjs');
var socket = require('socket.io-client')();
var helpers = require('./peerHelpers');
var remotePeers = require('./remotePeers');
var RemotePeer = require('./remotePeer');
var callHandler = require('../video/video').callHandler;
var getStream = require('../video/video').getStream;
var saveBoard = require('../helpers/saveBoard');
var URL = require('../helpers/urlGetter');
var rtc;
exports.socket = socket;

socket.on('env', function(env, port){
  socket.emit('getCanvas', { id: URL });
  if (env === 'production'){
    exports.rtc = new Peer({ host:'/', secure:true, port:443, path: '/api' });
  } else {
    exports.rtc = new Peer({ host: '/', port: port, path: '/api' });
  }
  rtc = exports.rtc;
  rtc.on('open', function(id){
    socket.emit('rtcReady', id, URL);
    helpers.stayAlive(rtc);
    saveBoard();
  });
  rtc.on('connection', function(dataConnection){
    new RemotePeer(dataConnection.peer, dataConnection);
  });
  rtc.on('call', function(call){
    if(getStream()){
      call.answer(getStream());
      callHandler(call);
      remotePeers.getPeer(call.peer).mediaConnection = call;
    }
  });
});
socket.on('updateCanvas', function (data) {
  var canvas = require('../canvas/canvas').canvas;
  var state = JSON.parse(data);
  state && (state = state[state.length-1]);
  canvas.loadFromJSON(state, canvas.renderAll.bind(canvas));
});
socket.on('peerIds', function(ids){
  forEach(ids, function(id){
    ! remotePeers.alreadyExists(id) && new RemotePeer(id, rtc.connect(id));
  });
});
