function drawHorizontalLine(y, canvas, context) {
  context.beginPath();
  context.moveTo(0, y+0.5);
  context.lineTo(canvas.width, y+0.5);
  context.stroke();
}
function drawVerticalLine(x, canvas, context) {
  context.beginPath();
  context.moveTo(x+0.5, 0);
  context.lineTo(x+0.5, canvas.height);
  context.stroke();
}
function drawGuidewires(x, y, canvas, context) {
  context.save();
  context.strokeStyle = '#999';
  context.lineWidth = 0.5;
  drawVerticalLine(x, canvas, context);
  drawHorizontalLine(y, canvas, context);
  context.restore();
}

module.exports = drawGuidewires;