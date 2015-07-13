
var BoardShares = function () {
  this._storage = {};
};

BoardShares.prototype.addBoard = function (boardShare) {
   this._storage[ boardShare.id ] = boardShare;
   return boardShare;
};

BoardShares.prototype.removeBoard = function (id) {
  delete this._storage[ id ];
};

BoardShares.prototype.boardExists = function (id) {
  return id in this._storage;
};

BoardShares.prototype.get = function (id) {
  return this._storage[ id ];
};
module.exports = new BoardShares();
