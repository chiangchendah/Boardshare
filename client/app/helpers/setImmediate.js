/*
* When calling a function, sometimes the DOM is not ready with what element you're requesting
* Wrapping our function calls in setImmediate removes this behavior for somereason
*/

module.exports = function(callback) {
  setTimeout(callback, 0);
};

