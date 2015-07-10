module.exports = function(){
var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/javascript");

var editSession = ace.createEditSession('ff', 'javascript');
//setting defaults
editor.getSession().setTabSize(2);
editor.getSession().setUseWrapMode(true);

editor.on('change', function(data){
  console.log(data);  //data.data.text === whatever's in the editor
                      //data.data.action === "insertText"
});

//extensions
$('#settings').on('click', function(){
    editor.execCommand('showSettingsMenu');
});

//menu functionality
$('#fontSize').on('change', function(){
  var e = document.getElementById("fontSize");
  var fontSize = e.options[e.selectedIndex].value;
  editor.setFontSize(parseInt(fontSize));
});

$('#wordWrap').on('change', function(){
  var e = document.getElementById('wordWrap');
  var wordWrap = e.options[e.selectedIndex].value;
  if (wordWrap === "false"){
    wordWrap = false;
  } else {
    wordWrap = true;
  }
  editor.getSession().setUseWrapMode(wordWrap);
});

$('#tabSize').on('change', function(){
  var e = document.getElementById('tabSize');
  var tabSize = e.options[e.selectedIndex].value;
  editor.getSession().setTabSize(tabSize);
});

$('#highlightActiveLine').on('change', function(){
  var e = document.getElementById('highlightActiveLine');
  var highlightActiveLine = e.options[e.selectedIndex].value;
  if (highlightActiveLine === "false"){
    highlightActiveLine = false;
  } else {
    highlightActiveLine = true;
  }
  editor.setHighlightActiveLine(highlightActiveLine);
});

$('#language').on('change', function(){
  var e = document.getElementById('language');
  var language = e.options[e.selectedIndex].value;
  editor.session.setMode("ace/mode/" + language);
});
};s
