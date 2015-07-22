var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var handlers = require('./server/utils/connectionHandlers');
var router = require('./server/routes/routes');
var path = require('path');
var expressPeerServer = require('peer').ExpressPeerServer;

router(app);
app.set('port', (process.env.PORT || 9000));
app.use(express.static(path.join(__dirname, '/client')));
app.use('/api', expressPeerServer(server, {debug: false}));
server.listen(app.get('port'), function(){
  console.log('Server running at localhost: ', app.get('port'));
});
exports.app = app;

/**
 * socket.io event stuff
 * mite move to another file if it gets any bigger, not sure where yet
 */
io.on('connection', function(socket){
  socket.emit('env', process.env.NODE_ENV, app.get('port'));
  socket.on('rtcReady', function(peerId, groupId){
    socket.join(groupId);
    socket.group = groupId;
    handlers.returnPeerIds(socket, peerId, groupId);
  });
  socket.on('saveCanvas', function (data, cb) {
    handlers.saveCanvas(socket, data, cb);
  });
  socket.on('getCanvas', function (data, cb) {
    handlers.getCanvas(socket, data, cb);
  });
  socket.on('disconnect', function(){
    handlers.removePeerId(socket);
  });
});
