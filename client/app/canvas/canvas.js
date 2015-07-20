// Libraries
var $ = require('jquery');
var fabric = require('../../lib/fabric/dist/fabric').fabric;
var spectrum = require('../../lib/spectrum/spectrum')($);
$.fn.spectrum.load = false; // Don't polyfill HTML5 color inputs
// WebRTC
var remotePeers = require('../helpers/remotePeers');
// Helpers
var makeColorInputs = require('./canvasHelpers/makeColorInputs');
var getBrushes = require('./canvasHelpers/getBrushes');
var shapes = require('./canvasHelpers/shapes');
var lineTool = require('./canvasHelpers/lineTool');
var uploadImage = require('./canvasHelpers/uploadImage');

exports.initialize = function() {
  // Wrap our canvas in fabric
  canvas = new fabric.Canvas('canvas', {selection: false});
  exports.canvas = canvas;
  // All the DOM elements
  canvas.selectors = require('./canvasHelpers/getSelectors');
  canvas.brushes = getBrushes(canvas);
  // Keep track of our canvas state
  canvas.counter = 0;
  canvas.mods = 0;
  canvas.state = [];
  canvas.isDrawingMode = true;
  canvas.isDragging = false;
  canvas.selectedTool = '';
  // Our color input plugin that allows for transparency
  makeColorInputs(
    {input: canvas.selectors.stroke, color: '#000'},
    {input: canvas.selectors.fill, color: '#fff'}
  );
  // Imports that require template to have been rendered
  var utils = require('./canvasHelpers/utils');
  var stateManager = require('./canvasHelpers/stateManager');
  var modes = require('./canvasHelpers/modes');

  // Event Handlers for UI changes
  canvas.selectors.stroke.onchange = function() { 
    utils.updateModifier.call(this, 'stroke'); 
  };
  canvas.selectors.fill.onchange = function(){ 
    utils.updateModifier.call(this, 'fill'); 
  };
  canvas.selectors.lineWidth.onchange = function(){ 
    utils.updateModifier.call(this, 'strokeWidth'); 
  }; 
  canvas.selectors.clear.onclick = function() {
    stateManager.updateState(true);
  };
  canvas.selectors.undo.onclick = function() {
    stateManager.undo();
  };
  canvas.selectors.redo.onclick = function() {
    stateManager.redo();
  };
  canvas.selectors.tool.onchange = function() {
    // Change our selected tool
    canvas.selectedTool = this.value;
    // Change our canvas mode depending on tool
    if (this.value === 'cursor') {
      modes.selectMode();
    } else if (this.value in canvas.brushes) {
      modes.editMode(true);
    } else {
      modes.editMode();
    }
    // utils.setTool.call(this);
  };  
};



// // On template render
// exports.initialize = function() {
//   // All objects rendered are unselectable
//   fabric.Object.prototype.selectable = false;

//   // Wrap our canvas with fabric
//   var canvas = new fabric.Canvas('canvas', {
//     hoverCursor: 'pointer',
//     selection: false
//   });
//   exports.canvas = canvas;
  
//   // Keep track of our canvas state
//   canvas.counter = 0;
//   canvas.mods = 0;
//   canvas.state = [];
//   canvas.isDrawingMode = true;
//   canvas.isDragging = false;
//   canvas.brushes = getBrushes(canvas);

//   // Grab all of our DOM elements
//   var backgroundColorSelect = document.getElementById('backgroundColor');
//   var strokeColorSelect = document.getElementById('strokeColor');
//   var fillColorSelect = document.getElementById('fillColor');
//   var lineWidthSelect = document.getElementById('lineWidth');
//   var toolSelect = document.getElementById('toolSelect');
//   var clearAllButton = document.getElementById('clearAll');
//   var undoButton = document.getElementById('undo');
//   var redoButton = document.getElementById('redo');
//   var imageUpload = document.getElementById('imageUpload');
//   makeColorInputs(
//     {input: strokeColorSelect, color: '#000'}, 
//     {input: fillColorSelect, color: '#fff'}
//   );

//   var origX, origY;
//   var rect, ellipse, triangle, line;
//   var selectedFunction = toolSelect.value;

//   canvas.on('mouse:down', function(obj) {
//     canvas.isDragging = true;
//     var loc = canvas.getPointer(obj.e);
//     mouseDownInCanvas(loc, selectedFunction);
//   });
//   canvas.on('mouse:move', function(obj) {
//     if (!canvas.isDragging) {
//       return;
//     }
//     var loc = canvas.getPointer(obj.e);
//     mouseMoveInCanvas(loc, selectedFunction);
//   });
//   canvas.on('mouse:up', function(obj) {
//     canvas.isDragging = false;
//     var loc = canvas.getPointer(obj.e);
//     mouseUpInCanvas(loc, selectedFunction);
//   });
//   canvas.on('object:added', function(e) {
//     console.log(e.target);
//   });
//   canvas.on('object:modified', function(e) {

//   });

//   toolSelect.onchange = function() {
//     if (!(this.value in canvas.brushes)) {
//       canvas.isDrawingMode = false;
//     } else {
//       canvas.isDrawingMode = true;
//       canvas.freeDrawingBrush.color = strokeColorSelect.value;
//       canvas.freeDrawingBrush.width = lineWidthSelect.value;
//     }
//     selectedFunction = toolSelect.value;
//   };
//   strokeColorSelect.onchange = function() {
//     if (canvas.isDrawingMode) {
//       canvas.freeDrawingBrush.color = strokeColorSelect.value;
//     }
//   };
//   fillColorSelect.onchange = function() {

//   };
//   lineWidthSelect.onchange = function() {
//     if (canvas.isDrawingMode) {
//       canvas.freeDrawingBrush.width = lineWidthSelect.value;
//     }
//   };
//   clearAllButton.onclick = function() {
//     canvas.clear();
//     stateManager.updateState(canvas);
//     remotePeers
//       .sendData({canvas: {currentState: canvas.state[canvas.state.length-1]}});
//   };
//   undoButton.onclick = function() {
//     stateManager.undo(canvas);
//   };
//   redoButton.onclick = function() {
//     stateManager.redo(canvas);
//   };
//   // imageUpload.onchange = function(e) {
//   //   uploadImage(e, canvas, function() {
//   //     stateManager.updateState(canvas);
//   //     remotePeers.sendData({canvas: {
//   //       state: canvas.state,
//   //       currentState: canvas.state[canvas.state.length-1]
//   //     }});
//   //   });
//   // };


//   var mouseDownInCanvas = function(loc, tool) {
//     origX = loc.x;
//     origY = loc.y;

//     var options = {
//       lineWidth: lineWidthSelect.value,
//       strokeColor: strokeColorSelect.value,
//       fillColor: fillColorSelect.value
//     };

//     switch(tool) {
//       case 'pencil':
//         canvas.freeDrawingBrush = canvas.brushes.pencil;
//         break;
//       case 'cursor':
//         console.log('selecting');
//         break;
//       case 'eraser':
//         canvas.freeDrawingBrush = canvas.brushes.eraser;
//         canvas.freeDrawingBrush.color = '#fff';
//         canvas.freeDrawingBrush.width = lineWidthSelect.value * 20;
//         break;
//       case 'rect':
//         rect = shapes.createRect(loc, options);
//         canvas.add(rect);
//         break;
//       case 'ellipse':
//         ellipse = shapes.createEllipse(loc, options);
//         canvas.add(ellipse);
//         break;
//       case 'line':
//         line = lineTool.createLine(loc, options);
//         canvas.add(line);
//         break;                
//     }
//     canvas.counter++;
//   };
//   var mouseMoveInCanvas = function(loc, tool) {
//     switch(tool) {
//       case 'rect':
//         shapes.updateRect(rect, loc, origX, origY);
//         break;
//       case 'ellipse':
//         shapes.updateEllipse(ellipse, loc, origX, origY);
//         break;
//       case 'line':
//         lineTool.updateLine(line, loc);
//         break;
//     }
//     canvas.renderAll();
//   };
//   var mouseUpInCanvas = function(loc, tool) {
//     switch(tool) {
//       case 'rect':
//           rect.setCoords();
//         break;
//       case 'ellipse':
//           ellipse.setCoords();
//         break;
//       case 'line':
//           line.setCoords();
//         break;
//     };
//     stateManager.updateState(canvas);
//     var data = {};
//     data.canvas = {
//       state: canvas.state,
//       currentState: canvas.state[canvas.state.length-1]
//     };
//     remotePeers.sendData(data);
//   };

// };
