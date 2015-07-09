// Renders all templates inside index.html using getTemplates
var getTemplates = require('./getTemplates');

getTemplates('app/canvas/canvas.handlebars', 'paint-canvas');
getTemplates('app/editor/editor.handlebars', 'text-editor');
getTemplates('app/video/video.handlebars', 'video');
getTemplates('app/messaging/messaging.handlebars', 'messaging');