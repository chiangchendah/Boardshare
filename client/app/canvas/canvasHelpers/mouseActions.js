var drawingSurface = require('./saveAndRestore');
var eraser = require('./eraser');
var dragging = false;
var mousedown = {};
var lastX, lastY;
var drawGuidewires = require('./guidewires');

var backgroundContext = require('./drawBackground').backgroundContext;

var ERASER_LINE_WIDTH = 1;
var ERASER_SHADOW_STYLE = 'blue';
var ERASER_STROKE_STYLE = 'rgba(0,0,255,0.6)';
var ERASER_SHADOW_OFFSET = -5;
var ERASER_SHADOW_BLUR = 20;
var ERASER_RADIUS = 40;

function setPathForEraser() {
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.arc(lastX, lastY, ERASER_RADIUS + ERASER_LINE_WIDTH,
    0, Math.PI*2, false);
}
function setEraserAttributes() {
  context.lineWidth = ERASER_LINE_WIDTH;
  context.shadowColor = ERASER_SHADOW_STYLE;
  context.shadowOffsetX = ERASER_SHADOW_OFFSET;
  context.shadowOffsetY = ERASER_SHADOW_OFFSET;
  context.shadowBlur = ERASER_SHADOW_BLUR;
  context.strokeStyle = ERASER_STROKE_STYLE;
}
// Uses a background canvas
function eraseLast() {
  var x = lastX - ERASER_RADIUS-ERASER_LINE_WIDTH;
  var y = lastY - ERASER_RADIUS-ERASER_LINE_WIDTH;
  var w = ERASER_RADIUS*2 + ERASER_LINE_WIDTH*2;
  var h = w;
  var cw = context.canvas.width;
  var ch = context.canvas.height;

  context.save();
  setPathForEraser();
  context.clip();

  if (x + w > cw) w = cw - x;
  if (y + h > ch) h = ch - y;

  if (x < 0) {x = 0;}
  if (y < 0) {y = 0;}

  context.drawImage(backgroundContext.canvas, x, y, w, h, x, y, w, h);
  context.restore();
}
function drawEraser(loc) {
  context.save();
  setEraserAttributes();

  context.beginPath();
  context.arc(loc.x, loc.y, ERASER_RADIUS,
    0, Math.PI*2, false);
  context.clip();
  context.stroke();
}

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
  console.log(lastX);
}
function mouseMoveInCanvas(loc, tool) {
  if (dragging) {
    if (cursorOffCanvas(loc, 5)) {
      dragging = false;
    }
    if (tool === 'eraser') {
      eraseLast();
      drawEraser(loc);
    } else {
      context.lineTo(loc.x, loc.y);
      context.stroke();
    }
  }
  lastX = loc.x;
  lastY = loc.y;
}
function mouseUpInCanvas(loc, tool) {
  if (tool !== 'eraser') {
    drawingSurface.restore();
  }
  if (dragging) {
    if (tool === 'eraser') {
      eraseLast();
    } else if (tool === 'line') {
      context.stroke();
    }
  }
  // drawingSurface.restore();
  dragging = false;
}


module.exports = {
  mouseDownInCanvas: mouseDownInCanvas,
  mouseMoveInCanvas: mouseMoveInCanvas,
  mouseUpInCanvas: mouseUpInCanvas
};