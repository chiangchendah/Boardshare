/**
 * Get the URL hash i.e. boardshare.io/{hash}
 * @return     {String} the url hash
 */
var getUrl = function () {
  return (/\w+$/).exec(window.location.href)[0];
};

module.exports = getUrl;
