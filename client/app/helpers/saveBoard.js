var $ = require('jquery');
var URL = require('./urlGetter');

/**
 * Save a BoardShare to an authed user's profile
 */
var saveBoard = function () {
  $.post('user/boards/' + URL);
};

module.exports = saveBoard;
