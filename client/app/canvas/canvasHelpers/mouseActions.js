var drawingSurface = require('./saveAndRestore');
var dragging = false;
var mousedown = {};
var lastX, lastY;
var drawGuidewires = require('./guidewires');

function cursorOffCanvas(loc, epsilon) {
  if (loc.x > canvas.width-epsilon || loc.x < epsilon || 
      loc.y > canvas.height-epsilon || loc.y < epsilon) {
    return true;
  }
  return false;
}
function mouseDownInCanvas(loc, tool) {
  dragging = true;

  drawingSurface.save();
  mousedown.x = loc.x;
  mousedown.y = loc.y;

  if (tool === 'line') {
    context.beginPath();
    context.moveTo(loc.x, loc.y);
  } else if (tool === 'eraser') {
    console.log('using eraser');
  }

  lastX = loc.x;
  lastY = loc.y;
}
function mouseMoveInCanvas(loc, tool) {
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
function mouseUpInCanvas(loc, tool) {
  // context.stroke();
  // drawingSurface.restore();
  dragging = false;
}
module.exports = {
  lastCoords: {lastX: lastX, lastY, lastY},
  mouseDownInCanvas: mouseDownInCanvas,
  mouseMoveInCanvas: mouseMoveInCanvas,
  mouseUpInCanvas: mouseUpInCanvas
};