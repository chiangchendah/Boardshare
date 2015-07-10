/*
* A function that draws lines on a grid.
*/
module.exports = function(context, color, stepx, stepy) {
  context.save();

  context.strokeColor = color;
  context.fillStyle = '#fff';
  context.lineWidth = 0.5;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  context.globalAlpha = 0.1;

  context.beginPath();
  for (var i = stepx + 0.5; i < context.canvas.width; i += stepx) {
    context.moveTo(i, 0);
    context.lineTo(i, context.canvas.height);
  }
  context.stroke();

  context.beginPath();
  for (var j = stepy + 0.5; j < context.canvas.height; j+= stepy) {
    context.moveTo(0, j);
    context.lineTo(context.canvas.width, j);
  }
  context.stroke();

  context.restore();
};