var drawGrid = require('./canvasHelpers/drawGrid');
var mouseActions = require('./canvasHelpers/mouseActions');
var getCoords = require('./canvasHelpers/getCoords');
var drawingSurface = ('./canvasHelpers/saveAndRestore');

module.exports = function() {
  // Declare variables
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var strokeStyleSelect = document.getElementById('strokeStyleSelect');
  var fillStyleSelect = document.getElementById('fillStyleSelect');
  var lineWidthSelect = document.getElementById('lineWidthSelect');
  var eraseAllButton = document.getElementById('eraseAllButton');
  var snapshotButton = document.getElementById('snapshotButton');

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
  eraseAllButton.onclick = function(e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(context, 'black', 10, 10);
    drawingSurface.save(canvas, context);
  };

  // Canvas Event Handlers
  canvas.onmousedown = function(e) {
    getCoords(e, function(loc) {
      mouseActions.mouseDownInCanvas(loc, canvas, context);
    });
  };
  canvas.onmousemove = function(e) {
    getCoords(e, function(loc) {
      mouseActions.mouseMoveInCanvas(loc, canvas, context);
    });  
  };
  canvas.onmouseup = function(e) {
    getCoords(e, function(loc) {
      mouseActions.mouseUpInCanvas(loc, canvas, context);
    });
  };

  // Initialize
  drawGrid(context, 'black', 10, 10);
};

