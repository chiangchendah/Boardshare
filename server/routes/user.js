var User = require('../db/db').User;
var Board = require('../db/db').Board;
var includes = require('lodash/collection/includes');
var handleError = require('../utils/connectionHandlers').handleError;

module.exports = function(app){
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

  app.delete('/user/boards/:id', isAuthenticated, function (req, res) {
    var id = req.params.id;
    var userid = req.user._id;
    User.findById(userid)
      .exec(function (error, user) {
        handleError(error, res);
        if (user) {
          var boardId = user.boards.indexOf(id);
          user.boards.splice(boardId, boardId + 1);

          user.save(function (error, user) {
            handleError(error, res);
            user && res.sendStatus(201);
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
