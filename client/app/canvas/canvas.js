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
  };  

  // Initialize our canvas tool as a pencil
  modes.editMode(true);
};
