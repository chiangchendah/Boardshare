// var fabric = require('fabric-browserify').fabric;

module.exports = function() {
  var canvas = new fabric.Canvas('canvas', {selection: false});
  fabric.Object.prototype.selectable = false;

  var backgroundColorSelect = document.getElementById('backgroundColor');
  var strokeColorSelect = document.getElementById('strokeColor');
  var fillColorSelect = document.getElementById('fillColor');
  var lineWidthSelect = document.getElementById('lineWidth');
  var toolSelect = document.getElementById('toolSelect');
  var clearAllButton = document.getElementById('clearAll');
  var undoButton = document.getElementById('undo');
  var redoButton = document.getElementById('redo');

  var dragging = false;
  var origX, origY;
  var rect, line;

  var selectedFunction = toolSelect.value;
  canvas.isDrawingMode = true;

  canvas.on('mouse:down', function(obj) {
    dragging = true;
    var loc = canvas.getPointer(obj.e);
    mouseDownInCanvas(loc, selectedFunction);
  });
  canvas.on('mouse:move', function(obj) {
    if (!dragging) {
      return;
    }
    var loc = canvas.getPointer(obj.e);
    mouseMoveInCanvas(loc, selectedFunction);
  });
  canvas.on('mouse:up', function(obj) {
    dragging = false;
    var loc = canvas.getPointer(obj.e);
    mouseUpInCanvas(loc, selectedFunction);
  });
  canvas.on('object:added', function(e) {
    console.log('object added');
  });
  canvas.on('object:modified', function(e) {
    console.log('object modified');
  });

  toolSelect.onchange = function() {
    if (this.value !== 'pencil') {
      canvas.isDrawingMode = false;
    } else {
      canvas.isDrawingMode = true;
    }
    selectedFunction = toolSelect.value;
  };
  backgroundColorSelect.onchange = function() {
    canvas.setBackgroundColor(backgroundColorSelect.value, function() {
      canvas.renderAll();
    });
  };
  strokeColorSelect.onchange = function() {
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush.color = strokeColorSelect.value;
    }
  };
  fillColorSelect.onchange = function() {

  };
  lineWidthSelect.onchange = function() {
    if (canvas.isDrawingMode) {
      canvas.freeDrawingBrush.width = lineWidthSelect.value;
    }
  };
  clearAllButton.onclick = function() {
    canvas.clear();
  };
  var pencilBrush = new fabric.PencilBrush(canvas);
  var brushes = {
    pencil: pencilBrush
  };


  var mouseDownInCanvas = function(loc, tool) {
    origX = loc.x;
    origY = loc.y;

    if (tool === 'pencil') {
      canvas.freeDrawingBrush = brushes.pencil;
    } else if (tool === 'rect') {
      rect = createRect(origY, origX, loc.x-origX, loc.y-origY);
      canvas.add(rect);
    } else if (tool === 'line') {
      line = createLine(loc);
      canvas.add(line);
    }
  };
  var mouseMoveInCanvas = function(loc, tool) {
    if (tool === 'rect') {
      updateRect(loc);
    } else if (tool === 'line') {
      updateLine(loc);
    }
    canvas.renderAll();
  };
  var mouseUpInCanvas = function(loc, tool) {

  };
  var createRect = function(top, left, width, height) {
      return new fabric.Rect({
        top: top,
        left: left,
        width: width,
        height: height,
        fill: fillColorSelect.value,
        stroke: strokeColorSelect.value,
        strokeWidth: lineWidthSelect.value,
        angle: 0,
        transparentCorners: false
      });
  };
  var updateRect = function(loc) {
    if (origX > loc.x) {
      rect.set({ left: Math.abs(loc.x) });
    }
    if (origY > loc.y) {
      rect.set({ top: Math.abs(loc.y) });
    }
    rect.set({ width: Math.abs(origX - loc.x) });
    rect.set({ height: Math.abs(origY - loc.y) });
  };

  var createLine = function(loc) {
    return new fabric.Line([loc.x, loc.y, loc.x, loc.y], {
      strokeWidth: lineWidthSelect.value,
      fill: fillColorSelect.value,
      stroke: strokeColorSelect.value,
      originX: 'left',
      originY: 'top'
    });
  };
  var updateLine = function(loc) {
    line.set({x2: loc.x, y2: loc.y});
  };
};





// var drawGrid = require('./canvasHelpers/drawGrid');
// var drawBackground = require('./canvasHelpers/drawBackground').drawBackground;
// var mouseActions = require('./canvasHelpers/mouseActions');
// var getCoords = require('./canvasHelpers/getCoords');
// var drawingSurface = require('./canvasHelpers/saveAndRestore');


// module.exports = function() {
//   // Declare variables
//   var canvas = document.getElementById('canvas');
//   var context = canvas.getContext('2d');
//   var strokeStyleSelect = document.getElementById('strokeStyleSelect');
//   var fillStyleSelect = document.getElementById('fillStyleSelect');
//   var lineWidthSelect = document.getElementById('lineWidthSelect');
//   var toolSelect = document.getElementById('toolSelect');
//   var eraseAllButton = document.getElementById('eraseAllButton');
//   var snapshotButton = document.getElementById('snapshotButton');
//   var undoButton = document.getElementById('undoButton');

//   var selectedFunction = toolSelect.value || 'line';
//   var SHADOW_COLOR = 'rgba(0,0,0,0.7)';

//   // Control Event Handlers
//   strokeStyleSelect.onchange = function(e) {
//     context.strokeStyle = strokeStyleSelect.value;
//   };
//   fillStyleSelect.onchange = function(e) {
//     context.fillStyle = fillStyleSelect.value;
//   };
//   lineWidthSelect.onchange = function(e) {
//     context.lineWidth = lineWidthSelect.value;
//   };
//   toolSelect.onchange = function(e) {
//     selectedFunction = toolSelect.value;
//   };
//   eraseAllButton.onclick = function(e) {
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     drawGrid(context, 'black', 10, 10);
//     drawingSurface.save(canvas, context);
//   };
//   undoButton.onclick = function(e) {
//     // TODO
//   };

//   // Canvas Event Handlers
//   canvas.onmousedown = function(e) {
//     getCoords(e, function(loc) {
//       mouseActions.mouseDownInCanvas(loc, selectedFunction);
//     });
//   };
//   canvas.onmousemove = function(e) {
//     getCoords(e, function(loc) {
//       mouseActions.mouseMoveInCanvas(loc, selectedFunction);
//     });  
//   };
//   canvas.onmouseup = function(e) {
//     getCoords(e, function(loc) {
//       mouseActions.mouseUpInCanvas(loc, selectedFunction);
//     });
//   };

//   // Initialize
//   context.strokeStyle = strokeStyleSelect.value;
//   context.fillStyle = fillStyleSelect.value;
//   context.lineWidth = lineWidthSelect.value;

//   drawGrid(context, 'black', 10, 10);
//   drawBackground();
// };

