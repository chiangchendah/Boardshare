// This is an in-memory empty canvas. Used for erasing
var drawGrid = require('./drawGrid');
var backgroundContext = document.createElement('canvas').getContext('2d');

module.exports = function() {
  backgroundContext.canvas.width = context.canvas.width;
  backgroundContext.canvas.height = context.canvas.height;
  drawGrid(backgroundContext, 'black', 10, 10);
};