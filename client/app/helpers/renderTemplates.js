// Renders all templates inside index.html using getTemplates
var getTemplates = require('./getTemplates');
<<<<<<< HEAD
var drawCanvas = require('../canvas/canvas');
var editor = require('../editor/editor').initialize;
var chat = require('../messaging/messaging');
var video = require('../video/video').initialize;

getTemplates('app/canvas/canvas.handlebars', 'paint-canvas', drawCanvas);
getTemplates('app/editor/editor.handlebars', 'text-editor', editor);
getTemplates('app/video/video.handlebars', 'video', video);
getTemplates('app/messaging/messaging.handlebars', 'messaging', chat);
=======
var drawCanvas = require('../canvas/canvas.js');
var editor = require('../editor/editor.js');

getTemplates('app/canvas/canvas.handlebars', 'paint-canvas', drawCanvas);
getTemplates('app/editor/editor.handlebars', 'text-editor', editor);
getTemplates('app/video/video.handlebars', 'video');
getTemplates('app/messaging/messaging.handlebars', 'messaging');
>>>>>>> 0ee91546509f0d46daf20a5eedffa1ef1be9f1dd
