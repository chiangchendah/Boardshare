var Boardshare = require('./boardshare').Boardshare;
var boardshares = require('./boardshare').boardshares;

var boardshare = new Boardshare();
boardshares[ boardshare.boardId ] = boardshare;

exports.returnPeerIds = function(socket, peerId){
    // give them list with everyone elses peer id
    socket.emit('peerIds', boardshare.peerIds);
    // put their id into the list
    boardshare.addPeerId(socket.id, peerId);
};

exports.removePeerId = function(socket){
  boardshare.removePeerId(socket.id);
};


(function test(){
  var count = 0;
  return setInterval(function(){
    count++
    var dash = ' ----- ';
    var message = dash + 'Minute ' + count + dash + 'Peer IDs: ' + JSON.stringify( boardshare.getIds() );
    console.log(message);
  }, 60000);
})();
