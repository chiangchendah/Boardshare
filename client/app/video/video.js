var dataConnections = require('../helpers/peerHelpers').dataConnections;
var setDataListeners = require('../helpers/peerHelpers').setDataListeners;
var emitDataToPeers = require('../helpers/peerHelpers').emitDataToPeers;
var _ = require('lodash');
var videoInitialized = false;

// todo: switch over to keeping track of connections manually instead
// of using the built in peer.connections
// like how we are for data channels


var initialize = function(){
  initializeVideo();
  $('#join-video').on('click', function(e){
    joinVideo();
  });
};

function initializeVideo(cb){
  navigator.getUserMedia = 
    navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  navigator.getUserMedia({audio: true, video: true}, function(stream){
    videoInitialized = true;
    $('#my-video').prop('src', URL.createObjectURL(stream)); 
    window.localStream = stream;
    if(cb){
      cb(); 
    }
  }, function(){
    console.log('error');
  });
}

function joinVideo(){
  var peer = require('../helpers/peerConnection').peer;
  if(!videoInitialized){
    initializeVideo(subRoutine);
    return;
  } else {
    subRoutine();
  }
  function subRoutine(){
    var peersToCall = [];
    _.forEach(peer.connections, function(peerObj, peerId){
      var shouldCall = true;
      _.forEach(peerObj, function(conn){
        if(conn.type === 'media'){
          shouldCall = false;
        }
      });
      if(shouldCall){
        peersToCall.push(peerId);
      }
    });
    _.forEach(peersToCall, function(id){
      var call = peer.call(id, window.localStream);
      callHandler(call);
    });
  }
}

function callHandler(call) {
  call.on('stream', function(stream){
    var vid = $('<video class="peer-vid" autoplay></vid>');
    $('#video-container').append(vid);
    vid.prop('src', URL.createObjectURL(stream));
  });
}

module.exports = {
  callHandler: callHandler,
  initialize: initialize
};
