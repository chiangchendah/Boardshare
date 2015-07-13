var drawingSurfaceImageData;
function saveDrawingSurface() {
  drawingSurfaceImageData = context.getImageData(0, 0,
    canvas.width, canvas.height);
}
function restoreDrawingSurface() {
  context.putImageData(drawingSurfaceImageData, 0, 0);
}

module.exports = {
  save: saveDrawingSurface,
  restore: restoreDrawingSurface
};