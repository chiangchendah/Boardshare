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

module.exports = function(app){
  auth(app);

  app.get('/start', function(req, res){
    // var board = new BoardShare();
    var hash = hashids.encode(Math.floor(Math.random() * 1e9));
    var peerGroup = new PeerGroup(hash);
    var id = encodeURIComponent(hash);
    // create board in db
    var board = new Board({
      url: hash,
    });
    board.save(function (error, board) {
      if (error) { throw error; }
    });
    res.redirect('/' + id);
  });

  app.get('/user/profile', isAuthenticated, function (req, res) {
    User.findById(req.user._id)
      .exec(function (error, user) {
        if (error) {
          console.error(error);
          res.sendStatus(error.status);
        }
        if (user) {
          res.send(user);
        } else {
          res.sendStatus(500);
        }
      });
  });

  app.post('/user/boards/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    var userid = req.user._id;
    User.findById(userid)
      .exec(function (error, user) {
        if (error) {
          console.error(error);
          res.sendStatus(error.status);
        }
        if (user) {
          Board.findOne({url: id})
            .exec(function (error, board) {
              if (error) {
                console.error(error);
                res.sendStatus(error.status);
              }
              if ( board && !includes(user.boards, id) ) {
                user.boards.push(id);
                user.save(function (error, user) {
                  if (error) {
                    console.error(error);
                    res.sendStatus(error.status);
                  }
                  if (user) {
                    res.sendStatus(201);
                  }
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
    // look up board for the requested id
    Board.findOne({url: id}, function (error, board) {
      if (error) { console.error(error); }
      if (board) {
        res.sendFile(
          path.join(__dirname, '../../client/app/board.html'),
          // after file is sent callback
          function (error) {
            if (error) { res.status(error.status).end(); }
            if (! peerGroups.groupExists(id)){
              var peerGroup = new PeerGroup(id);
            }
          });
      } else {
        // board not in db
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
