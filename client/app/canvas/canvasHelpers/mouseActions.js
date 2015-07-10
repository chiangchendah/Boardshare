var saveDrawingSurface = require('./saveAndRestore').saveDrawingSurface;
var dragging = false;
var selectedFunction = 'line';
var mousedown = {};
var lastX, lastY;

function mouseDownInCanvas(loc, canvas, context) {
  dragging = true;
  saveDrawingSurface(canvas, context);
  mousedown.x = loc.x;
  mousedown.y = loc.y;
  if (selectedFunction === 'line') {
    context.beginPath();
    context.moveTo(loc.x, loc.y);
  }
  console.log(loc.x);
  console.log(loc.y);
  lastX = loc.x;
  lastY = loc.y;
}
function mouseMoveInCanvas(loc, canvas, context) {

}
function mouseUpInCanvas(loc, canvas, context) {

}
module.exports = {
  mouseDownInCanvas: mouseDownInCanvas,
  mouseMoveInCanvas: mouseMoveInCanvas,
  mouseUpInCanvas: mouseUpInCanvas
};