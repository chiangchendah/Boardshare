var canvas = require('../canvas').canvas;
var stateManager = require('./stateManager');

/**
* Updates modifiers value.
* Example: when user updates a strokeColor it adds those 
* changes to the selected object and updates the property for the next object
* @param      {String}   modifier the type of modifier to update
*/
exports.updateModifier = function(modifier) {
  var value = this.value;

  // Floats ruin the selection sizing of canvas object
  if ( !(isNaN(this.value)) ) {
    value = +value;
  }

  // Handle case where we're in drawing mode
  if (canvas.isDrawingMode) {
    if (modifier === 'stroke') {
      canvas.freeDrawingBrush.color = value;
    } else if (modifier === 'strokeWidth') {
      canvas.freeDrawingBrush.width = value;
    }
  }

  // Update selected object
  var obj = canvas.getActiveObject();
  if (obj) {
    var options = {};
    options[modifier] = value;
    obj.set(options);
    canvas.fire('object:modified');
    canvas.renderAll();
  }
};
/**
* Deletes the currently selected object
*/
exports.deleteObject = function() {
  if (canvas.getActiveObject()) {
    canvas.remove(canvas.getActiveObject());
    stateManager.updateState();
  }
};
/**
* Copies the currently selected object
*/
exports.copyObject = function() {
  var obj = canvas.getActiveObject();
  if (obj) {
    var object = obj.clone();
    object.set("top", object.top+15);
    object.set("left", object.left+15);
    canvas.add(object);
  }
};