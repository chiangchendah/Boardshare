var drawingSurface = require('./saveAndRestore');
var dragging = false;
var selectedFunction = 'lineTool';
var mousedown = {};
var lastX, lastY;

var drawGuidewires = require('./guidewires');


function mouseDownInCanvas(loc) {
  drawingSurface.save();
  dragging = true;
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  if (selectedFunction === 'lineTool') {
    context.beginPath();
    context.moveTo(loc.x, loc.y);
  }
  lastX = loc.x;
  lastY = loc.y;
}
function mouseMoveInCanvas(loc) {
  if (dragging) {
    drawingSurface.restore();
    context.lineTo(loc.x, loc.y);
    context.stroke();
  }
  lastX = loc.x;
  lastY = loc.y;
}
function mouseUpInCanvas(loc) {
  context.stroke();
  // drawingSurface.restore();
  dragging = false;
}
module.exports = {
  mouseDownInCanvas: mouseDownInCanvas,
  mouseMoveInCanvas: mouseMoveInCanvas,
  mouseUpInCanvas: mouseUpInCanvas
};