/**
 * Get the URL hash for the board instance
 * @return     {String} the 7 digit hash that identifies the board
 */
var URL = (function getURL() {
  var url = (/\w+$/).exec(window.location.href)[0];
  (url === undefined || url === null) && console.error('getURL borked again');
  return url;
})();

module.exports = URL;
