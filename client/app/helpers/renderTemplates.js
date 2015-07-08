// Renders all templates inside index.html using getTemplates
var getTemplates = require('./getTemplates');

getTemplates('canvas/canvas.handlebars', 'paint-canvas');
getTemplates('editor/editor.handlebars', 'text-editor');
getTemplates('video/video.handlebars', 'video');
getTemplates('messaging/messaging.handlebars', 'messaging');