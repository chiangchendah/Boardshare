var remotePeers = require('../helpers/remotePeers');
var _ = require('lodash');
var videoInitialized = false;

// todo: switch over to keeping track of connections manually instead
// of using the built in peer.connections
// like how we are for data channels


var initialize = function(){
  // initializeVideo();
  $('#join-video').on('click', function(e){
    joinVideo();
  });
};

// gets cam permission and initializes media stream
function initializeVideo(cb){
  navigator.getUserMedia =
    navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  // getUserMedia takes 3 args: options hash, success cb, fail cb;
  navigator.getUserMedia(
    // options
    {audio: true, video: true},
    // success cb, has media stream
    function(stream){
      videoInitialized = true;
      $('#my-video').prop('src', URL.createObjectURL(stream));
      module.exports.videoStream = stream;
      if(cb){
        cb();
      }
    },
    // fail callback (usually happens when user disallows cam access)
    function(){
      console.log('error');
    }
  );
}

function joinVideo(){
  var rtc = require('../helpers/peerConnection').rtc;
  if(!videoInitialized){
    initializeVideo(callPeers);
    return;
  }
  function callPeers(){
    remotePeers.call(module.exports.videoStream, callHandler);
  }
}

function callHandler(call) {
  call.on('stream', function(stream){
    var container = $('<div class="peer-vid-container">');
    var vid = $('<video class="peer-vid" autoplay controls>');
    $('#video-container').append(container);
    container.append(vid);
    vid.prop('src', URL.createObjectURL(stream));
  });
  return call;
}

module.exports = {
  callHandler: callHandler,
  initialize: initialize,
};
