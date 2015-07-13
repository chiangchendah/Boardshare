var lastCoords = require('./mouseActions').lastCoords;
var lastX = lastCoords.lastX;
var lastY = lastCoords.lastY;

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