var drawingSurface = require('./saveAndRestore');
var dragging = false;
var selectedFunction = 'lineTool';
var mousedown = {};
var lastX, lastY;

function mouseDownInCanvas(loc, canvas, context) {
  dragging = true;
  drawingSurface.save(canvas, context);
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  if (selectedFunction === 'lineTool') {
    context.beginPath();
    context.moveTo(loc.x, loc.y);
  }
  lastX = loc.x;
  lastY = loc.y;
}
function mouseMoveInCanvas(loc, canvas, context) {
  if (dragging) {
    context.lineTo(loc.x, loc.y);
    context.stroke();
  }
  lastX = loc.x;
  lastY = loc.y;
}
function mouseUpInCanvas(loc, canvas, context) {

  dragging = false;

}
module.exports = {
  mouseDownInCanvas: mouseDownInCanvas,
  mouseMoveInCanvas: mouseMoveInCanvas,
  mouseUpInCanvas: mouseUpInCanvas
};