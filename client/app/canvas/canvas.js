var drawGrid = require('./canvasHelpers/drawGrid');
var windowToCanvas = require('./canvasHelpers/windowToCanvas');

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

  // Initialize
  drawGrid(context, 'black', 10, 10);
};

