var BoardShares = function () {
  this._storage = {};
  this._count = 0;
};

BoardShares.prototype.addBoard = function (boardShare) {
   this._storage[ boardShare.id ] = boardShare;
   this._count++;
   return boardShare;
};

BoardShares.prototype.removeBoard = function (id) {
  delete this._storage[ id ];
  this._count--;
};

BoardShares.prototype.boardExists = function (id) {
  return id in this._storage;
};

BoardShares.prototype.get = function (id) {
  return this._storage[ id ];
};

BoardShares.prototype.count = function() {
  return this._count;
};
module.exports = new BoardShares();
