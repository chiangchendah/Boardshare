'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var reqUtils = require('./server/utils/connectionHandlers');

var expressPeerServer = require('peer').ExpressPeerServer;

app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + '/client'));

var peerOptions = {
  debug: false
};

app.use('/api', expressPeerServer(server, peerOptions));

io.on('connection', function(socket){
  // emit port to user so they can initiate peerjs stuff
  socket.emit('port', app.get('port'));
  // user giving server their peer id
  socket.on('peerId', function(id){
    reqUtils.returnPeerIds(socket, id);
  });
});

server.listen(app.get('port'), function(){
  console.log('Server running at localhost: ', app.get('port'));
});
