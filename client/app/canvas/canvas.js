var drawGrid = require('./canvasHelpers/drawGrid');

module.exports = function() {
  // Declare variables
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');

  // Initialize
  drawGrid(context, 'black', 10, 10);
};

