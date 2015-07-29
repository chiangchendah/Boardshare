var handlers = require('../utils/connectionHandlers');

module.exports = function (io, app) {
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
};
