var $ = require('jquery');

module.exports.initialize = function(){
  var ext = ((/\w+$/).exec(window.location.href)[0]);
  var firepadRef = new Firebase('glowing-heat-8297.firebaseIO.com/firepads/' + ext);
  console.log(ace);
  var editor = ace.edit('firepad');
  console.log(editor);
  var firepad = Firepad.fromACE(firepadRef, editor);
  
  editor.setTheme("ace/theme/monokai");
  //extensions
  $('#settings').on('click', function(){
    editor.execCommand('showSettingsMenu');
  });

  $('#single').on('click', function(){
    $('.fire').removeClass('fireSplit');
    $('.fire').attr('id="fireSingle"');
  });

  $('#split').on('click', function() {
    $('.fire').removeAttr('id');
    $('.fire').addClass('fireSplitLeft');
    $('#firepad2').show();
  });

  // //menu functionality
  // $('#fontSize').on('change', function(){
  //   var fontSize = this.options[this.selectedIndex].value;
  //   editor.setFontSize(parseInt(fontSize));
  // });
  //
  // $('#wordWrap').on('change', function(){
  //   var wordWrap = this.options[this.selectedIndex].value;
  //   if (wordWrap === "false"){
  //     wordWrap = false;
  //   } else {
  //     wordWrap = true;
  //   }
  //   editor.getSession().setUseWrapMode(wordWrap);
  // });
  //
  // $('#tabSize').on('change', function(){
  //   var tabSize = this.options[this.selectedIndex].value;
  //   editor.getSession().setTabSize(tabSize);
  // });
  //
  // $('#highlightActiveLine').on('change', function(){
  //   var highlightActiveLine = this.options[this.selectedIndex].value;
  //   if (highlightActiveLine === "false"){
  //     highlightActiveLine = false;
  //   } else {
  //     highlightActiveLine = true;
  //   }
  //   editor.setHighlightActiveLine(highlightActiveLine);
  // });
  //
  // $('#language').on('change', function(){
  //   var language = this.options[this.selectedIndex].value;
  //   editor.session.setMode("ace/mode/" + language);
  // });

};
