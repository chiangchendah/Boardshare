var fabric = require('../../../lib/fabric/dist/fabric').fabric;

exports.createLine = function(loc, options) {
  return new fabric.Line([loc.x, loc.y, loc.x, loc.y], {
    strokeWidth: options.lineWidth,
    fill: options.fillColor,
    stroke: options.strokeColor,
    originX: 'left',
    originY: 'top'
  });
};
exports.updateLine = function(line, loc) {
  line.set({x2: loc.x, y2: loc.y});
};