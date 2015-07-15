var remotePeers = require('../helpers/remotePeers');

exports.initialize = function() {
  var canvas = new fabric.Canvas('canvas', {selection: false});
  exports.canvas = canvas;
  fabric.Object.prototype.selectable = false;
  canvas.counter = 0;

  var state = [];
  var mods = 0;

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
  var rect, ellipse, triangle, line;

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

  });
  canvas.on('object:modified', function(e) {

  });

  toolSelect.onchange = function() {
    if (!(this.value in brushes)) {
      canvas.isDrawingMode = false;
    } else {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = strokeColorSelect.value;
      canvas.freeDrawingBrush.width = lineWidthSelect.value;
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
    updateState(true);
    remotePeers.sendData({canvas: state[state.length-1]});
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
    }
  };
  var undo = function() {
    if (mods < state.length) {
      canvas.clear().renderAll();
      var currentState = state[state.length - 1 - mods - 1];
      // Rerender user's state
      canvas.loadFromJSON(currentState, canvas.renderAll.bind(canvas));
      // Send over to peers
      remotePeers.sendData({canvas: currentState});
      mods += 1;
    }
  };
  var redo = function() {
    if (mods > 0) {
      canvas.clear().renderAll();
      var currentState = state[state.length - 1 - mods + 1];
      canvas.loadFromJSON(currentState, canvas.renderAll.bind(canvas));
      remotePeers.sendData({canvas: currentState});
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

    switch(tool) {
      case 'pencil':
        canvas.freeDrawingBrush = brushes.pencil;
        break;
      case 'eraser':
        canvas.freeDrawingBrush = brushes.eraser;
        canvas.freeDrawingBrush.color = '#fff';
        canvas.freeDrawingBrush.width = lineWidthSelect.value * 20;
        break;
      case 'rect':
        rect = createRect(origY, origX, loc.x-origX, loc.y-origY);
        canvas.add(rect);
        break;
      case 'ellipse':
        ellipse = createEllipse(loc);
        canvas.add(ellipse);
        break;
      case 'line':
        line = createLine(loc);
        canvas.add(line);
        break;                
    }
    canvas.counter++;
  };
  var mouseMoveInCanvas = function(loc, tool) {
    switch(tool) {
      case 'rect':
        updateRect(loc);
        break;
      case 'ellipse':
        updateEllipse(loc);
        break;
      case 'line':
        updateLine(loc);
        break;
    }
    canvas.renderAll();
  };
  var mouseUpInCanvas = function(loc, tool) {
    updateState(true);
    remotePeers.sendData({canvas: state[state.length-1]});
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

  var createEllipse = function(loc) {
    return new fabric.Ellipse({
      top: loc.y,
      left: loc.x,
      originY: 'top',
      originX: 'center',
      rx: 1,
      ry: 1,
      fill: fillColorSelect.value,
      stroke: strokeColorSelect.value,
      strokeWidth: lineWidthSelect.value
    });
  };
  var updateEllipse = function(loc) {
    if (origX > loc.x) {
      ellipse.set({ left: Math.abs(loc.x) });
    }
    if (origY > loc.y) {
      ellipse.set({ top: Math.abs(loc.y) });
    }
    ellipse.set({rx: Math.abs(origX - loc.x)});
    ellipse.set({ry: Math.abs(origY - loc.y)});
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