var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var expressPeerServer = require('peer').ExpressPeerServer;
var path = require('path');
var router = require('./server/routes/routes');
var socketRouter = require('./server/sockets/sockets');

router(app);
socketRouter(io, app);
app.set('port', (process.env.PORT || 9000));
app.use(express.static(path.join(__dirname, '/client')));
app.use('/api', expressPeerServer(server, {debug: false}));
server.listen(app.get('port'), function(){
  console.log('Server running at localhost: ', app.get('port'));
});
