var makeResizableCanvas = require('../helpers/resizeElement').makeResizableCanvas;
var setImmediate = require('../helpers/setImmediate');
var elem = document.getElementById('paint-canvas');

elem.addEventListener('templateRendered', function() {
  console.log('canvas template rendered');
});
