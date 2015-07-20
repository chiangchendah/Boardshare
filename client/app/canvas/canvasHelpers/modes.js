var canvas = require('../canvas').canvas;
var toolSelect = require('./getSelectors');
var mouseEvents = require('./mouseEvents');

exports.selectMode = function() {
  // Toggle state
  canvas.isDrawingMode = false;

  // Make each object selectable  
  canvas.forEachObject(function(obj) {
    obj.selectable = true;
  });
  // Allow multiselect
  canvas.selection = true;
  // remove event handlers
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
  canvas.forEachObject(function(obj){
    obj.setCoords();
  });
};

exports.editMode = function(drawingMode) {
  // Account for free drawing
  if (drawingMode) {
    canvas.isDrawingMode = true;
    // For now with one brush we hardcode this in
    canvas.freeDrawingBrush = canvas.brushes.pencil;
    canvas.freeDrawingBrush.color = toolSelect.stroke.value;
    canvas.freeDrawingBrush.width = parseInt(toolSelect.lineWidth.value);
  } else {
    canvas.isDrawingMode = false;
  }

  // Make everything unselectable
  canvas.selection = false;
  canvas.forEachObject(function(o) {
    o.selectable = false;
  });

  // Attach our event handlers
  canvas.on('mouse:down', function(options){
    canvas.isDragging = true;
    var loc = canvas.getPointer(options.e);
    mouseEvents.down(loc);
  });
  canvas.on('mouse:move', function(options){
    if (!canvas.isDragging) {return;}
    var loc = canvas.getPointer(options.e);
    mouseEvents.move(loc);
  });
  canvas.on('mouse:up', function(options){
    canvas.isDragging = false;
    var loc = canvas.getPointer(options.e);
    mouseEvents.up(loc);
  });

  // canvas.on('mouse:down', function(o){
  //   isDown = true;
  //   var pointer = canvas.getPointer(o.e);
  //   var points = [pointer.x, pointer.y, pointer.x, pointer.y];
  //   line = new fabric.Line(points, {
  //     strokeWidth: 5,
  //     fill: 'red',
  //     stroke: 'red',
  //     originX: 'center',
  //     originY: 'center'
  //   });
  //   canvas.add(line);
  //   console.log(canvas.getActiveObject());
  // });

  // canvas.on('mouse:move', function(o) {
  //   if (!isDown) return;
  //   var pointer = canvas.getPointer(o.e);
  //   line.set({x2: pointer.x, y2: pointer.y});
  //   canvas.renderAll(); 
  // });

  // canvas.on('mouse:up', function(){
  //   isDown = false;
  // });

};