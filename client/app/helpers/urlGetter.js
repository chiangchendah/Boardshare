/**
 * Get the URL hash for the board instance
 * @return     {String} the 7 digit hash that identifies the board
 */
var URL = (function getURL() {
  var url;
  try {
    url = (/\w+$/).exec(window.location.href)[0]; // fail for #
  }
  catch (e) {
    try {
      url = (/(\w+)(?=#$)/).exec(window.location.href)[0];
    }
    catch (e) {
      console.error(e, 'url get failed');
    }
  }
  return url;
})();

module.exports = URL;
