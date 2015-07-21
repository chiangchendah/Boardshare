// Renders all templates inside index.html using getTemplates
var getTemplates = require('./getTemplates');
var drawCanvas = require('../canvas/canvas').initialize;
var editor = require('../editor/editor').initialize;
var chat = require('../messaging/messaging').initialize;
var video = require('../video/video').initialize;

var routes = {
  drawCanvas: 'app/canvas/canvas.handlebars',
  editor: 'app/editor/editor.handlebars',
  video: 'app/video/video.handlebars',
  chat: 'app/messaging/messaging.handlebars'
};

if (window.ENV === 'test') {
    routes.drawCanvas = '../../client/' + routes.drawCanvas;
    routes.editor = '../../client/' + routes.editor;
    routes.video = '../../client/' + routes.video;
    routes.chat = '../../client/' + routes.chat;
}

getTemplates(routes.drawCanvas, 'paint-canvas', drawCanvas);
getTemplates(routes.editor, 'text-editor', editor);
getTemplates(routes.video, 'video', video);
getTemplates(routes.chat, 'messaging', chat);
