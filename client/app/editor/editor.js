var $ = require('jquery');
var URL = require('../helpers/urlGetter');

module.exports.initialize = function(){
  var firepadRef = new Firebase('glowing-heat-8297.firebaseIO.com/firepads/' + URL);
  var editor = ace.edit('firepad');
  var firepad = Firepad.fromACE(firepadRef, editor);
  window.editor = editor;
  window.jq = $;

  editor.setTheme("ace/theme/monokai");
  //extensions
  $('#settings').on('click', function(){
    editor.execCommand('showSettingsMenu');
  });
  $('.powered-by-firepad').remove();

  $('.teaser').click(function () {
    setTimeout(function () {
      checkSize();
    }, 1000);
  })
  $(window).resize(function () {
    checkSize();
  });

  function checkSize() {
    var containerHeight = $('#Text-Editor').height();
    var titleHeight = $('#editor-teaser').height();
    var aceHeight = containerHeight - titleHeight;
    $('#text-editor').height(aceHeight);
    $('#firepad').height(aceHeight);
  }
};
