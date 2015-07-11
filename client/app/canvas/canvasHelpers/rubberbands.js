var rubberbandW, rubberbandH;
var rubberbandUlhc = {},

function updateRubberbandRectangle(loc) {
  rubberbandW = Math.abs(loc.x - mousedown.x);
  rubberbandH = Math.abs(loc.y - mousedown.y);

  if (loc.x > mousedown.x) {
    rubberbandUlhc.x = mousedown.x;
  } else {
    rubberbandUlhc.x = loc.x;
  }
  if (loc.y > mousedown.y) {
    rubberbandUlhc.y = mousedown.y;
  } else {
    rubberbandUlhc.y = loc.y;
  }
}
function drawRubberBandLine(loc, context) {
  context.beginPath();
  context.moveTo(mousedown.x, mousedown.y);
  context.lineTo(loc.x, loc.y);
  context.stroke();
}
function drawRubberBandRectangle(context) {
  context.strokeRect(rubberbandUlhc.x, rubberbandUlhc.y,
                      rubberbandW, rubberbandH);
}
function drawRubberbandCircle(loc, context) {
  var angle = Math.atan(rubberbandH/rubberbandW);
  var radius = rubberbandH / Math.sin(angle);
   
  if (mousedown.y === loc.y) {
    radius = Math.abs(loc.x - mousedown.x); 
  }

  context.beginPath();
  context.arc(mousedown.x, mousedown.y, radius, 0, Math.PI*2, false); 
  context.stroke();
}
function drawRubberband(loc, context, tool) {
  context.save();
  context.strokeStyle = 'brown';
  context.lineWidth = 1;

  if (tool === 'rectangle') {
    drawRubberbandRectangle(context);
  } else if (tool === 'line' || tool === 'curve') {
    drawRubberbandLine(loc, context);
  } else if (tool === 'circle') {
    drawRubberbandCircle(loc, context);
  }

  context.restore();
}

module.exports = {
  drawRubberband: drawRubberband,
  updateRubberbandRectangle: updateRubberbandRectangle
};