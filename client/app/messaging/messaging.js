var peer = require('../helpers/peerConnection');
var dataConnections = require('../helpers/peerHelpers').dataConnections;
var setDataListeners = require('../helpers/peerHelpers').setDataListeners;
var emitDataToPeers = require('../helpers/peerHelpers').emitDataToPeers;
var _ = require('lodash');

// currently on a timeout because waiting for template
// to load before we can do stuff
setTimeout(function(){
  $(function(){
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

    $('#join-video').on('click', function(e){
      initiateVideo(joinVideo);
    });
  });
}, 500);

function initiateVideo(cb){
    navigator.getUserMedia = 
      navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    navigator.getUserMedia({audio: true, video: true}, function(stream){
      $('#my-video').prop('src', URL.createObjectURL(stream)); 
      window.localStream = stream;
      cb();
    }, function(){
      console.log('error');
    });
}

function joinVideo(){
  peer.on('call', function(call){
    console.log('incoming call');
    call.answer(window.localStream);
    callHandler(call);
  });
  var peersToCall = [];
  _.forEach(peer.connections, function(peerObj, peerId){
    var shouldCall = true;
    _.forEach(peerObj, function(conn){
      if(conn.type === 'media' && conn.open){
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

function callHandler(call) {
  call.on('stream', function(stream){
    var vid = $('<video class="peer-vid" autoplay></vid>');
    $('#video-container').append(vid);
    vid.prop('src', URL.createObjectURL(stream));
  });
}
