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
      canvas.shape = shapes.createRect(loc, options);
      canvas.add(canvas.shape);
      break;
    case 'ellipse':
      canvas.shape = shapes.createEllipse(loc, options);
      canvas.add(canvas.shape);      
      break;
    case 'triangle':
      break;
  }
};
exports.move = function(loc) {
  var shape = canvas.shape;
  switch(canvas.selectedTool) {
    case 'line':
      shapes.updateLine(shape, loc);
      break;
    case 'rect':
      shapes.updateRect(shape, loc);
      break;
    case 'ellipse':
      shapes.updateEllipse(shape, loc);
      break;
    case 'triangle':
      break;
  }
  canvas.renderAll();
};
exports.up = function(loc) {
  stateManager.updateState();
};