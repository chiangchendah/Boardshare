var Hashids = require('hashids'),
    hashids = new Hashids('salty travers');

exports.boardshares = {};

exports.Boardshare = function(){
  this.peerIds = {};
  this.boardId = hashids.encode(Math.floor(Math.random() * 1e9));
};

exports.Boardshare.prototype.addPeerId = function(id) {
  this.peerIds[id] = id;
};

exports.Boardshare.prototype.removePeerId = function(id) {
  delete this.peerIds[id];
};