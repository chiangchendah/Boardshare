var path = require('path');
var Hashids = require('hashids');
var User = require('../db/db').User;
var Board = require('../db/db').Board;
var hashids = new Hashids('salty travers', 7);
var PeerGroup = require('../utils/peerGroup');
var peerGroups = require('../utils/peerGroups');
var handleError = require('../utils/connectionHandlers').handleError;

module.exports = function(app){
  app.get('/start', function(req, res){
    var hash = hashids.encode(Math.floor(Math.random() * 1e9));
    var peerGroup = new PeerGroup(hash);
    var id = encodeURIComponent(hash);
    // create board in db
    var board = new Board({
      url: hash,
    });
    board.save(function (error, board) {
      handleError(error, res);
    });
    res.redirect('/' + id);
  });

  app.get('/:id', function(req, res){
    var id = req.params.id;
    Board.findOne({url: id}, function (error, board) {
      handleError(error, res);
      if (board) {
        res.sendFile(
          path.join(__dirname, '../../client/app/board.html'),
          function (error) {
            handleError(error, res);
            !peerGroups.groupExists(id) && ( new PeerGroup(id) );
          });
      } else {
        res.sendStatus(404);
      }
    });
  });
};
