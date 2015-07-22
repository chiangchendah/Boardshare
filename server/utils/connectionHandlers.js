var PeerGroup = require('./peerGroup');
var peerGroups = require('./peerGroups');
var Board = require('../db/db').Board;

/**
 * Get the peerIds for a boardshare instance and emit them to the socket
 * and add the requesting user to the PeerGroup
 * @param      {Object}   socket Socket.io socket obj of requesting user
 * @param      {String}   peerId The peerId of the requesting user
 * @param      {String}   groupId The groupId of the group the user is trying to join
 */
var returnPeerIds = function(socket, peerId, groupId){
  var group = peerGroups.getGroup(groupId);
  group && socket.emit('peerIds', group.peerIds);
  group && group.addPeerId(socket.id, peerId);
};

/**
 * Remove a peerId from the collection (used when peer disconnects), also
 * deletes the group form the collection if the group is empty
 * @param      {Object}   socket Socket.io socket obj of disconnecting user
 */
var removePeerId = function(socket){
  var group = peerGroups.getGroup(socket.group);
  if (group) {
    group.removePeerId(socket.id);
    group.isEmpty() && peerGroups.removeGroup(group.id);
  }
};

/**
 * Saves canvas state to the database
 * @param      {Object}   socket Socket.io object for the connected client
 * @param      {Object}   data contains data.id and data.canvasState
 * @param      {Function}   cb callbacks takes a boolean arg
 */
var saveCanvas = function (socket, data, cb) {
  Board.findOne({url: data.id})
    .exec(function (error, board) {
      if (error) {
        console.error(error);
      }
      if (board) {
        board.canvas = data.canvasState;
        board.save(function (error, board) {
          if (error) {
            console.error(error);
            cb(false);
          }
          if (board) {
            cb(true);
          }
        });
      } else {
        cb(false);
      }
  });
};

/**
 * Get the canvas state for a particular board from the DB and emit it on socket
 * @param      {Object}   socket Socket.io socket of connected client
 * @param      {Object}   data contains data.id of board
 */
var getCanvas = function (socket, data, cb) {
  Board.findOne({url: data.id})
    .exec(function (error, board) {
      handleError(error);
      board && socket.emit('updateCanvas', board.canvas);
    });
};

/**
 * Handle DB errors
 * @param      {Object}   error the error given by the DB
 * @param      {Object}   res response object from client requesting
 */
var handleError = function (error, res) {
  if (error) {
    console.error(error);
    res && res.sendStatus(error.status);
  }
};

// put the exports down here so doxx wouldn't get confused
exports.returnPeerIds = returnPeerIds;
exports.removePeerId = removePeerId;
exports.handleError = handleError;
exports.saveCanvas = saveCanvas;
exports.getCanvas = getCanvas;
