var remotePeers = require('./remotePeers');
var chat = require('../messaging/messaging');

/**
 * Create a new remote peer and add to remote peers collection
 * @param      {String}   id the peer ID of the remote peer
 * @param      {Object}   dc data connection to the remote peer
 * @return     {Object}   a new remote peer
 */
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

/**
 * Send a data object to a connected remote peer
 * @param      {Object}   data any data you want to send,
 *   should be namespaced to feature e.g. {chat: 'string', canvas: {...}}
 */
RemotePeer.prototype.sendData = function (data) {
  return this.dataConnection.open && this.dataConnection.send(data);
};


/**
 * Create an array of all the right files in the source dir
 * @param      {Object}   videoStream WebRTC video stream from getUserMedia()
 * @param      {Function} cb callback
 * @return     {Object}   Peer JS mediaConnection
 */
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
/**
 * End the call with the remote peer and dereference the mediaConnection
 */
RemotePeer.prototype.endCall = function () {
  if (this.mediaConnection !== null) {
    this.mediaConnection.close();
    this.mediaConnection = null;
  }
};

/**
 * Add listeners on the data connection and respond to incoming data
 */
RemotePeer.prototype.addDataEventListeners = function () {
  var self = this;
  this.dataConnection.on('open', function(){
    // maybe do something like have a list of conncted parties
  });

  // namespace the incoming data to your feature
  // e.g. { chat: "string", canvas: "..." }
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
      if (data.canvas.state) {
        canvas.state = data.canvas.state;
      }
      if (data.canvas.mods) {
        canvas.mods = data.canvas.mods;
      }
      canvas.loadFromJSON(data.canvas.currentState);
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
