var $ = require('jquery');

/**
 * Save a BoardShare to an authed user's profile
 */
var saveBoard = function () {
  var id = (/\w+$/).exec(window.location.href)[0];
  $.post('user/boards/' + id);
};

module.exports = saveBoard;
