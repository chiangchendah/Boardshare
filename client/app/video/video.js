var $ = require('jquery');
var _ = require('lodash');
var remotePeers = require('../helpers/remotePeers');
var videoInitialized = false;
var localStream;

/**
 * Attaches click listener to join video button
 */
var initialize = function(){
  $('#join-video').on('click', function(e){
    joinVideo();
  });
  $('#leave-video').on('click', function (e) {
    leaveVideo();
  });
};
exports.initialize = initialize;

/**
 * Gets camera permission and initializes media stream
 * @param      {Function}   cb execute callback on successful stream initialization
 */
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
      localStream = stream;
      $('#my-video').prop('src', URL.createObjectURL(stream));
      exports.videoStream = stream;
      cb && cb();
    },
    // fail callback (usually happens when user disallows cam access)
    function(arg){
      console.log(arg);
      console.log('error');
    }
  );
}

/**
 * initializes video and calls all connected peers. Video mediaConnection will open
 * and stream will start if the given peers have opted into the video call as well
 */
function joinVideo(){
  var rtc = require('../helpers/peerConnection').rtc;
  (!videoInitialized) && initializeVideo(callPeers);
  function callPeers(){
    remotePeers.call(exports.videoStream, callHandler);
  }
}

function leaveVideo() {
  var rtc = require('../helpers/peerConnection').rtc;
  localStream.stop();
  videoInitialized = false;
  remotePeers.endCalls();
  $('.peer-vid').each(function (index, item) {
    $(item).remove();
  });
}

/**
 * Adds video to the dom for incoming calls
 * @param      {Object}   call a peerJS video call
 * @return     {Object} a peerJS video call
 */
function callHandler(call) {
  call.on('stream', function(stream){
    var container = $('<div class="peer-vid-container">');
    var $vid = $('<video class="peer-vid" autoplay controls>');
    window.$vid = $vid;
    $vid.data('peer', call.peer);
    $('#video-container').append(container);
    container.append($vid);
    $vid.prop('src', URL.createObjectURL(stream));
    call.on('close', function () {
      $vid.remove();
    });

  });
  return call;
}
exports.callHandler = callHandler;
