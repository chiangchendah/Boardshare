var canvas = require('../canvas').canvas;

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

  // Update attribute
  if (canvas.getActiveObject) {
    var options = {};
    options[modifier] = value;
    obj.set(options);
    canvas.renderAll();
  }
};
