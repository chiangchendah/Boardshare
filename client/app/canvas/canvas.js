// var fabric = require('fabric-browserify').fabric;

module.exports = function() {
  var canvas = new fabric.Canvas('canvas', {selection: false});
  var state = [];
  var mods = 0;
  canvas.counter = 0;

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
  });

  toolSelect.onchange = function() {
    if (this.value !== 'pencil' && this.value !== 'eraser') {
      canvas.isDrawingMode = false;
    } else {
      canvas.isDrawingMode = true;
    }
    selectedFunction = toolSelect.value;
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
  undoButton.onclick = function() {
    undo();
  };
  redoButton.onclick = function() {
    redo();
  };

  var updateState = function(savehistory) {
    if (savehistory === true) {
      state.push(JSON.stringify(canvas));
      console.log(state.length);
    }
  };

  var undo = function() {
    if (mods < state.length) {
      canvas.clear().renderAll();
      canvas.loadFromJSON(state[state.length - 1 - mods - 1], canvas.renderAll.bind(canvas));
      mods += 1;
    }
  };
  var redo = function() {
    if (mods > 0) {
      canvas.clear().renderAll();
      canvas.loadFromJSON(state[state.length - 1 - mods + 1], canvas.renderAll.bind(canvas));
      mods -= 1;
    }
  };

  // Brushes
  var pencilBrush = new fabric.PencilBrush(canvas);
  var eraserBrush = new fabric.CircleBrush(canvas);
  var brushes = {
    pencil: pencilBrush,
    eraser: eraserBrush
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
    } else if (tool === 'eraser') {
      canvas.freeDrawingBrush = brushes.eraser;
      canvas.freeDrawingBrush.color = '#fff';
      canvas.freeDrawingBrush.width = lineWidthSelect.value * 20;
    }
    canvas.counter++;
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
    updateState(true);
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