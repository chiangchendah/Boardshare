var _ = require('lodash');

var RemotePeers = function(){
  this._storage = {};
  this._numPeers = 0;
};

RemotePeers.prototype.addPeer = function (remotePeer) {
  if (!this.alreadyExists(remotePeer.id)) {
    this._storage[ remotePeer.id ] = remotePeer;
    this._numPeers++;
  }
};

RemotePeers.prototype.removePeer = function (remotePeerId) {
  if (this.alreadyExists(remotePeerId)) {
    delete this._storage[ remotePeerId ];
    this._numPeers--;
  }
};

RemotePeers.prototype.alreadyExists = function (remotePeerId) {
  return remotePeerId in this._storage;
};

RemotePeers.prototype.getPeer = function (remotePeerId) {
  return this._storage[ remotePeerId ];
};

RemotePeers.prototype.sendData = function (data) {
  _.forEach(this._storage, function(remotePeer){
    remotePeer.sendData(data);
  });
};

RemotePeers.prototype.call = function (stream, cb) {
  _.forEach(this._storage, function(remotePeer){
    remotePeer.call(stream, cb);
  });
};

RemotePeers.prototype.endCalls = function () {
  _.forEach(this._storage, function(remotePeer){
    remotePeer.endCall();
  });
};

module.exports = new RemotePeers();
