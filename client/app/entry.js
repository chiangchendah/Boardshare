// This is the entry point for browserify. Requires all modules.

// Library
require('lodash');
require('interact.js');

// Helpers
// require('./helpers/peerConnections');
require('./helpers/getTemplates');
require('./helpers/renderTemplates');
require('./helpers/resizeElement');

require('./canvas/canvas');
require('./editor/editor');
require('./messaging/messaging');
require('./video/video');
