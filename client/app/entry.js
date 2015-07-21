// This is the entry point for browserify. Requires all modules.

// Library
require('lodash');
require('interact.js');
// Helpers
require('./helpers/peerConnection');
require('./helpers/peerHelpers');
require('./helpers/remotePeer');
require('./helpers/remotePeers');
require('./helpers/getTemplates');
require('./helpers/renderTemplates');
require('./helpers/resizeElement');
require('./helpers/makeDraggable');
require('./helpers/saveBoard');

require('./canvas/canvas');
require('./editor/editor');
require('./messaging/messaging');
require('./video/video');
