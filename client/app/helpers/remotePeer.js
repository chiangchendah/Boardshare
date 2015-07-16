var remotePeers = require('./remotePeers');
var chat = require('../messaging/messaging');

var RemotePeer = function(id, dc){
  this.id = id;
  this.dataConnection = dc || null;
  this.mediaConnection = null;
  this.name = "guest-" + this.id.slice(-4);
  if (dc) {
    this.addDataEventListeners();
  }
  if (! remotePeers.alreadyExists(id)) {
    remotePeers.addPeer(this);
  }
};

RemotePeer.prototype.sendData = function (data) {
  return this.dataConnection.open && this.dataConnection.send(data);
};

// videoStream is a WebRTC stream from getUserMedia
RemotePeer.prototype.call = function (videoStream, cb) {
  var rtc = require('./peerConnection').rtc;
  if (this.mediaConnection === null) {
    return cb(this.mediaConnection = rtc.call(this.id, videoStream));
  } else if (this.mediaConnection && !this.mediaConnection.open) {
    return cb(this.mediaConnection = rtc.call(this.id, videoStream));
  } else if (this.mediaConnection && !this.mediaConnection.open) {
    return this.mediaConnection;
  }
};

RemotePeer.prototype.endCall = function () {
  if (this.mediaConnection !== null) {
    this.mediaConnection.close();
    this.mediaConnection = null;
  }
};

RemotePeer.prototype.addDataEventListeners = function () {
  var self = this;
  this.dataConnection.on('open', function(){
    // maybe do something like have a list of conncted parties
  });

  // { editor: "some string" }
  // { chat: "string" }
  this.dataConnection.on('data', function(data){
    if (data.chat) {
      chat.appendMessage(self.name, data.chat);
    }
    if (data.editor) {
      var updateEditor = require('../editor/editor').updateEditorByAPI;
      updateEditor(data.editor);
    }
    if (data.canvas) {
      var canvas = require('../canvas/canvas').canvas;
      canvas.loadFromJSON(data.canvas);
      canvas.renderAll();
    }
    if (data.name) {
      this.name = name;
      // need to update name on display wherever it appears,
      // hopefully we'll have a handlebars thing for that
    }
  });

  // firefox doesn't support the 'close' event yet.
  // this is why we are checking if connections are open before we do things
  // shouldn't break either way, but console logs a lot of stuff if you try to
  // send stuff to a closed connection
  this.dataConnection.on('close', function(){
    this.dataConnection = null;
    remotePeers.removePeer(this.id);
  });

  this.dataConnection.on('error', function(err){
    console.log('data channel error: ', err);
  });
};

module.exports = RemotePeer;
