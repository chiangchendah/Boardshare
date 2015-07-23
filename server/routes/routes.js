var path = require('path');
var auth = require('./auth');
var db = require('../db/db.js');
var Hashids = require('hashids');
var User = require('../db/db').User;
var Board = require('../db/db').Board;
var hashids = new Hashids('salty travers', 7);
var PeerGroup = require('../utils/peerGroup');
var peerGroups = require('../utils/peerGroups');
var includes = require('lodash/collection/includes');
var handleError = require('../utils/connectionHandlers').handleError;

module.exports = function(app){
  auth(app);

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

  app.get('/user/profile', isAuthenticated, function (req, res) {
    User.findById(req.user._id)
      .exec(function (error, user) {
        handleError(error, res);
        user ? res.send(user) : res.sendStatus(500);
      });
  });

  app.post('/user/boards/:id', function (req, res) {
    if (!req.isAuthenticated() ) {
      return res.sendStatus(200);
    }
    var id = req.params.id;
    var userid = req.user._id;
    User.findById(userid)
      .exec(function (error, user) {
        handleError(error, res);
        if (user) {
          Board.findOne({url: id})
            .exec(function (error, board) {
              handleError(error, res);
              if (board && !includes(user.boards, id)) {
                user.boards.push(id);
                user.save(function (error, user) {
                  handleError(error, res);
                  user && res.sendStatus(201);
                });
              } else {
                res.sendStatus(200);
              }
            });
        }
      });
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

function isAuthenticated(req, res, next){
  if(req.isAuthenticated()) {
    next();
  } else {
    res.sendStatus(401);
  }
}
