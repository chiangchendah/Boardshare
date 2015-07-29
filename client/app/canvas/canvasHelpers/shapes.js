var fabric = require('../../../lib/fabric/dist/fabric').fabric;

/**
* Create an initial line at location mouse.x, mouse.y
* @param      {Object}   loc an object with x and y properties
* @param      {Object}   options an object with fill, stroke, and lineWidth properties
* @return     {Object} a fabric line object
*/
exports.createLine = function(loc, options) {
  return new fabric.Line([loc.x, loc.y, loc.x, loc.y], {
    strokeWidth: options.lineWidth,
    fill: options.fillColor,
    stroke: options.strokeColor,
    originX: 'left',
    originY: 'top'
  });
};
/**
* Update a line object's length
* @param      {Object}   line the line to update
* @param      {Object}   loc and object with x and y properties
*/
exports.updateLine = function(line, loc) {
  line.set({x2: loc.x, y2: loc.y});
};
/**
* Create an initial rectangle at location mouse.x, mouse.y
* @param      {Object}   loc an object with x and y properties
* @param      {Object}   options an object with fill, stroke, and lineWidth properties
* @return     {Object} a fabric rectangle object
*/
exports.createRect = function(loc, options) {
  return new fabric.Rect({
    top: loc.y,
    left: loc.x,
    width: 0,
    height: 0,
    fill: options.fillColor,
    stroke: options.strokeColor,
    strokeWidth: options.lineWidth,
    angle: 0,
    transparentCorners: false
  });
};
/**
* Update a rectangle object's size
* @param      {Object}   rect the rectangle to update
* @param      {Object}   loc and object with x and y properties
*/
exports.updateRect = function(rect, loc) {
  if (canvas.origX > loc.x) {
    rect.set({ left: Math.abs(loc.x) });
  }
  if (canvas.origY > loc.y) {
    rect.set({ top: Math.abs(loc.y) });
  }
  rect.set({ width: Math.abs(canvas.origX - loc.x) });
  rect.set({ height: Math.abs(canvas.origY - loc.y) });
};
/**
* Create an initial ellipse at location mouse.x, mouse.y
* @param      {Object}   loc an object with x and y properties
* @param      {Object}   options an object with fill, stroke, and lineWidth properties
* @return     {Object} a fabric ellipse object
*/
exports.createEllipse = function(loc, options) {
  return new fabric.Ellipse({
    top: loc.y,
    left: loc.x,
    originY: 'top',
    originX: 'center',
    rx: 0,
    ry: 0,
    fill: options.fillColor,
    stroke: options.strokeColor,
    strokeWidth: options.lineWidth
  });
};
/**
* Update an ellipse object's size
* @param      {Object}   line the line to update
* @param      {Object}   loc and object with x and y properties
*/
exports.updateEllipse = function(ellipse, loc) {
  if (canvas.origX > loc.x) {
    ellipse.set({ left: Math.abs(loc.x) });
  }
  if (canvas.origY > loc.y) {
    ellipse.set({ top: Math.abs(loc.y) });
  }
  ellipse.set({rx: Math.abs(canvas.origX - loc.x)});
  ellipse.set({ry: Math.abs(canvas.origY - loc.y)});
};