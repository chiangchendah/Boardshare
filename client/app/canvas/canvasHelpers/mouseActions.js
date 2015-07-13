var drawingSurface = require('./saveAndRestore');
var dragging = false;
var mousedown = {};
var lastX, lastY;

var selectedFunction = 'line';
var drawGuidewires = require('./guidewires');

function cursorOffCanvas(loc, epsilon) {
  if (loc.x > canvas.width-epsilon || loc.x < epsilon || 
      loc.y > canvas.height-epsilon || loc.y < epsilon) {
    return true;
  }
  return false;
}
function mouseDownInCanvas(loc) {
  drawingSurface.save();
  dragging = true;
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  if (selectedFunction === 'line') {
    context.beginPath();
    context.moveTo(loc.x, loc.y);
  }
  lastX = loc.x;
  lastY = loc.y;
}
function mouseMoveInCanvas(loc) {
  if (dragging) {
    if (cursorOffCanvas(loc, 5)) {
      dragging = false;
    }
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