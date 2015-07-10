// Gets the cursor location relative to the canvas and not the window
module.exports = function(canvas, x, y) {
  // returns {left: v, right: v, top: v, bottom: v, width: v, height: v}
  var bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width / bbox.width), 
           y: y - bbox.top * (canvas.height / bbox.height)
         };
};