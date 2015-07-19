var forEach = require('lodash/collection/forEach');

/**
 * Create a new remote peers collection
 * @return     {Object} A new remote peer collection
 */
var RemotePeers = function(){
  this._storage = {};
  this._count = 0;
};

/**
 * Add a remote peer to the collection
 * @param      {Object}   remotePeer an instance of Remote Peer
 */
RemotePeers.prototype.addPeer = function (remotePeer) {
  if (!this.alreadyExists(remotePeer.id)) {
    this._storage[ remotePeer.id ] = remotePeer;
    this._count++;
  }
};

/**
 * Remove a remote peer from the collection
 * @param      {String}   remotePeerId the ID of the remote peer
 */
RemotePeers.prototype.removePeer = function (remotePeerId) {
  if (this.alreadyExists(remotePeerId)) {
    delete this._storage[ remotePeerId ];
    this._count--;
  }
};

/**
 * Check if a remote peer instance is already in the collection
 * @param      {String}   remotePeerId the ID of the remote peer
 * @return     {Boolean}  true if exists, false if not
 */
RemotePeers.prototype.alreadyExists = function (remotePeerId) {
  return remotePeerId in this._storage;
};

/**
 * Get a remote peer from the collection
 * @param      {String}   remotePeerId the ID of the remote peer
 */
RemotePeers.prototype.getPeer = function (remotePeerId) {
  return this._storage[ remotePeerId ];
};

/**
 * Send data to every remote peer in the collection
 * @param      {Object}   data any data you want to
 *   send should be namespaced to feature e.g. {chat: 'string', canvas: {...}}
 */
RemotePeers.prototype.sendData = function (data) {
  forEach(this._storage, function(remotePeer){
    remotePeer.sendData(data);
  });
};

/**
 * Initiate a video conference with all remote peers in the collection
 * @param      {Object}   videoStream WebRTC video stream from getUserMedia()
 * @param      {Function} cb callback
 */
RemotePeers.prototype.call = function (videoStream, cb) {
  forEach(this._storage, function(remotePeer){
    remotePeer.call(videoStream, cb);
  });
};

/**
 * End close all existing calls
 */
RemotePeers.prototype.endCalls = function () {
  forEach(this._storage, function(remotePeer){
    remotePeer.endCall();
  });
};

module.exports = new RemotePeers();
