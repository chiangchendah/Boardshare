var Hashids = require('hashids'),
    hashids = new Hashids('salty travers');

exports.boardshares = {};

exports.Boardshare = function(){
  this.peerIds = {};
  this.boardId = hashids.encode(Math.floor(Math.random() * 1e9));
};

exports.Boardshare.prototype.addPeerId = function(socketId, peerId) {
  this.peerIds[socketId] = peerId;
};

exports.Boardshare.prototype.removePeerId = function(socketId) {
  delete this.peerIds[socketId];
};

exports.Boardshare.prototype.getIds = function () {
  return this.peerIds
};
