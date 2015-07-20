var canvas = require('../canvas').canvas;
var toolSelect = require('./getSelectors');
var stateManager = require('./stateManager');
var shapes = require('./shapes');

exports.down = function(loc) {
  canvas.origX = loc.x;
  canvas.origY = loc.y;
  var options = {
    strokeColor: toolSelect.stroke.value,
    fillColor: toolSelect.fill.value,
    lineWidth: parseInt(toolSelect.lineWidth.value),
  };
  
  switch(canvas.selectedTool) {
    case 'line':
      canvas.shape = shapes.createLine(loc, options);
      canvas.add(canvas.shape);
      break;
    case 'rect':
      break;
    case 'ellipse':
      break;
    case 'triangle':
      break;
  }
};
exports.move = function(loc) {
  switch(canvas.selectedTool) {
    case 'line':
      console.log('mouse move line');
      shapes.updateLine(canvas.shape, loc);
      break;
    case 'rect':
      break;
    case 'ellipse':
      break;
    case 'triangle':
      break;
  }
};
exports.up = function(loc) {
  stateManager.updateState();
};