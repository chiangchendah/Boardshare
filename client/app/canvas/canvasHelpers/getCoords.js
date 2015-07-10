var windowToCanvas = require('./canvasHelpers/windowToCanvas');

module.exports = function(e, cb) {
  var x = e.x || e.clientX; // browser workaround
  var y = e.y || e.clientY;
  var loc = windowToCanvas(canvas, x, y);
  e.preventDefault();
  cb(loc);
};