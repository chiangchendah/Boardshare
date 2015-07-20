var fabric = require('../../../lib/fabric/dist/fabric').fabric;

module.exports = function(canvas) {
  var pencilBrush = new fabric.PencilBrush(canvas);
  var eraserBrush = new fabric.CircleBrush(canvas);
  return {
    pencil: pencilBrush,
    eraser: eraserBrush
  };
};
