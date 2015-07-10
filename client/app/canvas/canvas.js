var makeResizableCanvas = require('../helpers/resizeElement').makeResizableCanvas;
var setImmediate = require('../helpers/setImmediate');

setImmediate(function(){
  makeResizableCanvas(document.getElementById('canvas'));
});
