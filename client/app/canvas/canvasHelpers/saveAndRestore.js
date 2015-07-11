var drawingSurfaceImageData;
function saveDrawingSurface(canvas, context) {
  drawingSurfaceImageData = context.getImageData(0, 0,
    canvas.width, canvas.height);
}
function restoreDrawingSurface(canvas, context) {
  console.log(drawingSurfaceImageData);
  context.putImageData(drawingSurfaceImageData, 0, 0);
}

module.exports = {
  save: saveDrawingSurface,
  restore: restoreDrawingSurface
};