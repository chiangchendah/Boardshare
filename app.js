'use strict';
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var expressPeerServer = require('peer').ExpressPeerServer;

app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + '/client'));

var peerOptions = {
  debug: true
};

app.use('/api', expressPeerServer(server, peerOptions));

io.on('connection', function(socket){
  socket.on('peerId', function(id){
    // do something with the id;
    console.log(id);
  });
});


server.listen(app.get('port'), function(){
  console.log('Server running at localhost: ', app.get('port'));
});
