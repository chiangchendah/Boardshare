var remotePeers = require('../../peer/remotePeers');
var canvas = require('../canvas').canvas;
var URL = require('../../helpers/urlGetter');
var socket = require('../../peer/peerConnection').socket;


/**
* Updates the canvas state array and sends peers this data
* @param      {Boolean}   clear Optional: decides whether to clear the canvas or not
*/
exports.updateState = function(clear) {
  if (clear) {
    canvas.clear();
    canvas.state.push(JSON.stringify(canvas));
    canvas.state = canvas.state.slice(canvas.state.length-2);
  } else {
    canvas.state.push(JSON.stringify(canvas));
    console.log(canvas.state[canvas.state.length-1]);
  }

  remotePeers.sendData({canvas: {
    currentState: canvas.state[canvas.state.length-1]
  }});

  socket.emit('saveCanvas',
    {id: URL, canvasState: JSON.stringify([canvas.state[canvas.state.length-1]])},
    function (saved) {
      // can do something once it's saved if you want
    });
};
/**
* Undo a recently made addition. Goes backwards in state array.
*/
exports.undo = function() {
  if (canvas.mods < canvas.state.length) {
    canvas.clear().renderAll();
    var currentState = canvas.state[canvas.state.length - 1 - canvas.mods - 1];
    // Rerender user's state
    canvas.loadFromJSON(currentState, canvas.renderAll.bind(canvas));
    // Send over to peers
    remotePeers.sendData({canvas: {currentState: currentState, mods: canvas.mods}});
    canvas.mods += 1;
  }
};
/**
* Redo a recently undid change. Goes forwards in state array
*/
exports.redo = function() {
  if (canvas.mods > 0) {
    canvas.clear().renderAll();
    var currentState = canvas.state[canvas.state.length - 1 - canvas.mods + 1];
    canvas.loadFromJSON(currentState, canvas.renderAll.bind(canvas));
    remotePeers.sendData({canvas: {currentState: currentState, mods: canvas.mods}});
    canvas.mods -= 1;
  }
};
