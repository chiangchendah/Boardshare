var canvas = require('../canvas').canvas;
var toolSelect = require('./getSelectors');
var mouseEvents = require('./mouseEvents');
var stateManager = require('./stateManager');

/**
* Set canvas to select mode and remove event handlers
*/
exports.selectMode = function() {
  $('.fa-remove').removeClass('disabled');
  $('.fa-copy').removeClass('disabled');
  // Toggle state
  canvas.isDrawingMode = false;
  // Allow multiselect
  canvas.selection = true;

  // Make each object selectable  
  canvas.forEachObject(function(obj) {
    obj.selectable = true;
  });
  canvas.forEachObject(function(obj){
    obj.setCoords();
  });
  
  // remove event handlers
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
  canvas.on('object:modified', function() {
    stateManager.updateState();
  });
};
/**
* Set canvas to edit mode and add event handler
* @param      {Boolean}   drawingMode optional: is drawingmode true or not
*/
exports.editMode = function(drawingMode) {
  $('.fa-copy').addClass('disabled');
  $('.fa-remove').addClass('disabled');
  // Account for free drawing
  if (drawingMode) {
    canvas.isDrawingMode = true;
    // For now with one brush we hardcode this in
    canvas.freeDrawingBrush = canvas.brushes.pencil;
    canvas.freeDrawingBrush.color = toolSelect.stroke.value;
    canvas.freeDrawingBrush.width = parseInt(toolSelect.lineWidth.value);
  } else {
    canvas.isDrawingMode = false;
  }

  // Make everything unselectable
  canvas.selection = false;
  canvas.forEachObject(function(o) {
    o.selectable = false;
  });

  // Attach our event handlers
  canvas.on('mouse:down', function(options){
    canvas.isDragging = true;
    var loc = canvas.getPointer(options.e);
    mouseEvents.down(loc);
  });
  canvas.on('mouse:move', function(options){
    if (!canvas.isDragging) {return;}
    var loc = canvas.getPointer(options.e);
    mouseEvents.move(loc);
  });
  canvas.on('mouse:up', function(options){
    canvas.isDragging = false;
    var loc = canvas.getPointer(options.e);
    mouseEvents.up(loc);
  });
};