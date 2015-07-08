// This is the entry point for browserify. Requires all modules.

// Library
require('lodash');

require('./helpers/getTemplates');
require('./helpers/renderTemplates');
require('./canvas/canvas');
require('./editor/editor');
require('./messaging/messaging');
require('./video/video');