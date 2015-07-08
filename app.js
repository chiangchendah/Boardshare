'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var expressPeerServer = require('peer').ExpressPeerServer;

app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + '/client'));

var peerOptions = {
  debug: false
};

app.use('/api', expressPeerServer(server, peerOptions));

var peerIds = [];

io.on('connection', function(socket){
  socket.emit('port', app.get('port'));
  socket.on('peerId', function(id){
    socket.emit('peerIds', peerIds);
    peerIds.push(id);
  });

   // adding this temporarily so that we can empty our the peerIds
  // array every once in a while until we get rooms set up
  socket.on('flushIds', function(){
    peerIds = [];
  });
});

server.listen(app.get('port'), function(){
  console.log('Server running at localhost: ', app.get('port'));
});
