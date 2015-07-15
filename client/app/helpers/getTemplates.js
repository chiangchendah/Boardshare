/* Allows us to dynamically render templates with just clientside code */

// Create event to signal when template is rendered
var $ = require('jquery');
var Handlebars = require('handlebars');
var onTemplateRender = new CustomEvent('templateRendered');

module.exports = function(path, container, callback) {
  var source, template;
  var elem = document.getElementById(container);
  elem.addEventListener('templateRendered', callback);
  
  $.ajax({
    url: path,
    cache: true,
    success: function(data) {
      source = data;
      template = Handlebars.compile(source);
      $(elem).html(template);
    },
    complete: function() {
      elem.dispatchEvent(onTemplateRender);
    }
  });   
};
