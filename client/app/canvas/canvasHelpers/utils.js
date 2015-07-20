var canvas = require('../canvas').canvas;
/**
* When an object is selected and a modifier updated, change attribute
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
  var obj = canvas.getActiveObject();
  var options = {};
  options[modifier] = value;
  if (obj) {
    obj.set(options);
    canvas.renderAll();
  }
};
