var drawingSurfaceImageData;
function saveDrawingSurface(canvas, context) {
  drawingSurfaceImageData = context.getImageData(0, 0,
    canvas.width, canvas.height);
}
function restoreDrawingSurface(canvas, context) {
  context.putImageData(drawingSurfaceImageData, 0, 0);
}

module.exports = {
  drawingSurfaceImageData: drawingSurfaceImageData,
  saveDrawingSurface: saveDrawingSurface,
  restoreDrawingSurface: restoreDrawingSurface
};