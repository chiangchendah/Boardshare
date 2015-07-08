// Allows us to dynamically render templates with just clientside code
module.exports = function(path, container) {
  var source;
  var template;
  $.ajax({
    url: path,
    cache: true,
    success: function(data) {
      source = data;
      template = Handlebars.compile(source);
      $('#' + container ).html(template);
    }               
  });   
};
