var fabric = require('../../../lib/fabric/dist/fabric').fabric;

/**
* Exports all brush options
* @param      {Object}   canvas html5 canvas 
* @return     {Object} an object of all brushes
*/
module.exports = function(canvas) {
  var pencilBrush = new fabric.PencilBrush(canvas);
  var eraserBrush = new fabric.CircleBrush(canvas);
  return {
    pencil: pencilBrush,
    eraser: eraserBrush
  };
};
