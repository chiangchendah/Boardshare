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
exports.setTool = function() {
  if (this.value === 'cursor') {
    setEditMode();
  }
};

function setEditMode() {
  canvas.forEachObject(function(o) {
    o.selectable = true;
  });
  canvas.isDrawingMode = false;
  canvas.selection = true;
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
  canvas.forEachObject(function(obj){
    obj.setCoords();
  });
  canvas.on('object:selected', function(o) {
    console.log(o);
  });
};
function unsetEditMode() {
  canvas.forEachObject(function(o) {
    o.selectable = false;
  });
  canvas.isDrawingMode = false;
  canvas.selection = false; 
}