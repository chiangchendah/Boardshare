var path = require('path');
var BoardShare = require('../utils/boardShare');
var boardShares = require('../utils/boardShares');

module.exports = function(app){
  app.get('/start', function(req, res){
    var board = new BoardShare();
    var id = encodeURIComponent(board.id);
    res.redirect('/board?boardId=' + id);
  });
  app.get('/board', function(req, res){
    var id = req.query.boardId;
    console.log(id);
    if (boardShares.boardExists(id)) {
      console.log('joining board: ', id);
    } else {

    }
    res.sendFile(path.join(__dirname, '../../client/app/board.html'));
  });
  app.get('/:id', function(req, res){
    var id = encodeURIComponent(req.params.id);
    if (!boardShares.boardExists(id)) {
      res.sendStatus(404);
    } else {
      res.redirect('/board?boardId=' + id);
    }
    console.log('id route', id);
  });
};
