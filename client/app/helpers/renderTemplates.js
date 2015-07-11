// Renders all templates inside index.html using getTemplates
var getTemplates = require('./getTemplates');
var drawCanvas = require('../canvas/canvas');
var editor = require('../editor/editor');
var chat = require('../messaging/messaging');
var video = require('../video/video').initialize;

getTemplates('app/canvas/canvas.handlebars', 'paint-canvas', drawCanvas);
getTemplates('app/editor/editor.handlebars', 'text-editor', editor);
getTemplates('app/video/video.handlebars', 'video', video);
getTemplates('app/messaging/messaging.handlebars', 'messaging', chat);