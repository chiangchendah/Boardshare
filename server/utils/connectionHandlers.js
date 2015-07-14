var boardShares = require('./boardShares');
var BoardShare = require('./boardShare');


exports.returnPeerIds = function(socket, peerId, boardId){
  var board = boardShares.get(boardId);
  board && socket.emit('peerIds', board.peerIds);
  board && board.addPeerId(socket.id, peerId);
};

exports.removePeerId = function(socket){
  var board = boardShares.get(socket.board);
  board && board.removePeerId(socket.id);
};
