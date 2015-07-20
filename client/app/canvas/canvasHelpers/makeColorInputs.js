var $ = require('jquery');

/**
* Creates color inputs from all arguments
*/
module.exports = function() {
  var args = Array.prototype.slice.call(arguments);

  for (var i = 0; i < args.length; i++) {
    $(args[i].input).spectrum({
      preferredFormat: 'rgb',
      showAlpha: true,
      color: args[i].color
    });
  }
};