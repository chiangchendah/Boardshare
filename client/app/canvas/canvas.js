var fabric = require('fabric-browserify').fabric;

module.exports = function() {
  var canvas = new fabric.Canvas('canvas', {selection: false});
  var dragging = false;

  var backgroundColorSelect = document.getElementById('backgroundColor');
  var strokeColorSelect = document.getElementById('strokeColor');
  var fillColorSelect = document.getElementById('fillColor');
  var lineWidthSelect = document.getElementById('lineWidth');
  var toolSelect = document.getElementById('toolSelect');
  var clearAllButton = document.getElementById('clearAll');
  var undoButton = document.getElementById('undo');
  var redoButton = document.getElementById('redo');

  var origX, origY;
  var rect, line;

  var selectedFunction = toolSelect.value;
  canvas.isDrawingMode = true;

  toolSelect.onchange = function(e) {
    if (this.value !== 'pencil') {
      canvas.isDrawingMode = false;
    } else {
      canvas.isDrawingMode = true;
    }
  };
  clearAllButton.onclick = function() {
    canvas.clear();
  };


};






// var drawGrid = require('./canvasHelpers/drawGrid');
// var drawBackground = require('./canvasHelpers/drawBackground').drawBackground;
// var mouseActions = require('./canvasHelpers/mouseActions');
// var getCoords = require('./canvasHelpers/getCoords');
// var drawingSurface = require('./canvasHelpers/saveAndRestore');


// module.exports = function() {
//   // Declare variables
//   var canvas = document.getElementById('canvas');
//   var context = canvas.getContext('2d');
//   var strokeStyleSelect = document.getElementById('strokeStyleSelect');
//   var fillStyleSelect = document.getElementById('fillStyleSelect');
//   var lineWidthSelect = document.getElementById('lineWidthSelect');
//   var toolSelect = document.getElementById('toolSelect');
//   var eraseAllButton = document.getElementById('eraseAllButton');
//   var snapshotButton = document.getElementById('snapshotButton');
//   var undoButton = document.getElementById('undoButton');

//   var selectedFunction = toolSelect.value || 'line';
//   var SHADOW_COLOR = 'rgba(0,0,0,0.7)';

//   // Control Event Handlers
//   strokeStyleSelect.onchange = function(e) {
//     context.strokeStyle = strokeStyleSelect.value;
//   };
//   fillStyleSelect.onchange = function(e) {
//     context.fillStyle = fillStyleSelect.value;
//   };
//   lineWidthSelect.onchange = function(e) {
//     context.lineWidth = lineWidthSelect.value;
//   };
//   toolSelect.onchange = function(e) {
//     selectedFunction = toolSelect.value;
//   };
//   eraseAllButton.onclick = function(e) {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     drawGrid(context, 'black', 10, 10);
//     drawingSurface.save(canvas, context);
//   };
//   undoButton.onclick = function(e) {
//     // TODO
//   };

//   // Canvas Event Handlers
//   canvas.onmousedown = function(e) {
//     getCoords(e, function(loc) {
//       mouseActions.mouseDownInCanvas(loc, selectedFunction);
//     });
//   };
//   canvas.onmousemove = function(e) {
//     getCoords(e, function(loc) {
//       mouseActions.mouseMoveInCanvas(loc, selectedFunction);
//     });  
//   };
//   canvas.onmouseup = function(e) {
//     getCoords(e, function(loc) {
//       mouseActions.mouseUpInCanvas(loc, selectedFunction);
//     });
//   };

//   // Initialize
//   context.strokeStyle = strokeStyleSelect.value;
//   context.fillStyle = fillStyleSelect.value;
//   context.lineWidth = lineWidthSelect.value;

//   drawGrid(context, 'black', 10, 10);
//   drawBackground();
// };

