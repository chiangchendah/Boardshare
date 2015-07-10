var drawGrid = require('./canvasHelpers/drawGrid');
var mouseActions = require('./canvasHelpers/mouseActions');
var getCoords = require('./canvasHelpers/getCoords');

module.exports = function() {
  // Declare variables
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  // Controls
  var strokeStyleSelect = document.getElementById('strokeStyleSelect');
  var fillStyleSelect = document.getElementById('fillStyleSelect');
  var lineWidthSelect = document.getElementById('lineWidthSelect');

  // Control Event Handlers
  strokeStyleSelect.onchange = function(e) {
    context.strokeStyle = strokeStyleSelect.value;
  };
  fillStyleSelect.onchange = function(e) {
    context.fillStyle = fillStyleSelect.value;
  };
  lineWidthSelect.onchange = function(e) {
    context.lineWidth = lineWidthSelect.value;
  };

  // Canvas Event Handlers
  canvas.onmousedown = getCoords(e, function(loc) {
    mouseActions.mouseDownInCanvas(loc, canvas, context);
  });
  canvas.onmousemove = getCoords(e, function(loc) {
    mouseActions.mouseMoveInCanvas(loc, canvas, context);
  });  
  canvas.onmouseup = getCoords(e, function(loc) {
    mouseActions.mouseUpInCanvas(loc, canvas, context);
  });

  // Initialize
  drawGrid(context, 'black', 10, 10);
};

