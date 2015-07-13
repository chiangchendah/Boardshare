'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var connHandlers = require('./server/utils/connectionHandlers');
var router = require('./server/routes/routes');
var path = require('path');
var expressPeerServer = require('peer').ExpressPeerServer;

app.set('port', (process.env.PORT || 9000));

router(app);

app.use(express.static(path.join(__dirname, '/client')));

var peerOptions = {
  debug: false
};

app.use('/api', expressPeerServer(server, peerOptions));

io.on('connection', function(socket){
  exports.socket = socket;
  // emit port to user so they can initiate peerjs stuff
  socket.emit('env', process.env.NODE_ENV, app.get('port'));
  // user giving server their peer id
  socket.on('rtcReady', function(peerId, boardId){
    socket.join(boardId);
    socket.board = boardId;
    connHandlers.returnPeerIds(socket, peerId, boardId);
  });

  socket.on('disconnect', function(){
    connHandlers.removePeerId(socket);
  });
});

server.listen(app.get('port'), function(){
  console.log('Server running at localhost: ', app.get('port'));
});

exports.app = app;
