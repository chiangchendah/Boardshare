// Allows us to dynamically render templates with just clientside code

// Create event to signal when template is rendered
var onTemplateRender = new Event('templateRendered');

module.exports = function(path, container) {
  var source, template;
  var elem = document.getElementById(container);
  $.ajax({
    url: path,
    cache: true,
    success: function(data) {
      source = data;
      template = Handlebars.compile(source);
      $(elem).html(template);
      elem.dispatchEvent(onTemplateRender);
    }               
  });   
};
