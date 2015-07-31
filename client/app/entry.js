// This is the entry point for browserify. Requires all modules.

// Library
require('lodash');
// Helpers
require('./peer/peerConnection');
require('./peer/peerHelpers');
require('./peer/remotePeer');
require('./peer/remotePeers');
require('./helpers/getTemplates');
require('./helpers/renderTemplates');
require('./helpers/saveBoard');
// UI
require('./helpers/app.ui.js');

require('./canvas/canvas');
require('./editor/editor');
require('./profile/profile');
require('./video/video');
