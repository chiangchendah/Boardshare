var $ = require('jquery');
var URL = require('../helpers/urlGetter');

module.exports.initialize = function(){
  var firepadRef = new Firebase('glowing-heat-8297.firebaseIO.com/firepads/' + URL);
  var editor = ace.edit('firepad');
  editor.setTheme("ace/theme/monokai");
  var firepad = Firepad.fromACE(firepadRef, editor);
  //setting defaults
  var sess = editor.getSession();
  sess.setMode('ace/mode/javascript');
  sess.setTabSize(2);
  sess.setUseWrapMode(true);
  //extensions
  $('#settings').on('click', function(){
    editor.execCommand('showSettingsMenu');
  });
  // remove firepad logo
  $('.powered-by-firepad').remove();
  // size the editor div
  setInterval(checkSize, 32);
  var oldHeight;
  function checkSize() {
    var newHeight = $('body').height() - $('#editor-teaser').height();
    if (oldHeight !== newHeight) {
      oldHeight = newHeight;
      $('#firepad').height(newHeight);
      editor.resize(true);
    }
  }
};
