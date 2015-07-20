var remotePeers = require('../../helpers/remotePeers');
var canvas = require('../canvas').canvas;

exports.updateState = function(clear) {
  if (clear) {
    canvas.clear();
  }
  canvas.state.push(JSON.stringify(canvas));
  remotePeers.sendData({canvas: {
    state: canvas.state,
    currentState: canvas.state[canvas.state.length-1]
  }})
};
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
exports.redo = function() {
  if (canvas.mods > 0) {
    canvas.clear().renderAll();
    var currentState = canvas.state[canvas.state.length - 1 - canvas.mods + 1];
    canvas.loadFromJSON(currentState, canvas.renderAll.bind(canvas));
    remotePeers.sendData({canvas: {currentState: currentState, mods: canvas.mods}});
    canvas.mods -= 1;
  }
};