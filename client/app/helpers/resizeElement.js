var interact = require('interact.js');

function makeResizable(elementIdentifier) {
  interact(elementIdentifier)
    // Make element resizeable
    .resizable({
      edges: {left: true, right: true, bottom: true, top: true}
    })
    .on('resizemove', function(event) {
      var target = event.target;
      var x = (parseFloat(target.getAttribute('data-x')) || 0);
      var y = (parseFloat(target.getAttribute('data-y')) || 0);

      // Update style
      target.style.width = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // Translate top/left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform = 
        'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      target.textContent = event.rect.width + '×' + event.rect.height;
    });
}
/*
* Question: Why make a seperate function for a canvas?
* Canvas has two size properties: the size of the drawing surface
* and the size of the element. Resizing with css will change just the element
* we want the drawing surface to also expand with the change.
* This functions takes a DOM node as an input
*/
// function makeResizableCanvas(canvas) {
//   var canvasId = canvas.id;
//   var ctx = canvas.getContext('2d');

//   interact(canvasId)
//     // Make element resizeable
//     .resizable({
//       edges: {left: true, right: true, bottom: true, top: true}
//     })
//     .on('resizemove', function(event) {
//       var target = event.target;
//       var x = (parseFloat(target.getAttribute('data-x')) || 0);
//       var y = (parseFloat(target.getAttribute('data-y')) || 0);

//       // Update style
//       target.style.width = event.rect.width + 'px';
//       target.style.height = event.rect.height + 'px';

//       ctx.canvas.width = event.rect.width;
//       ctx.canvas.height = event.rect.height;

//       // Translate top/left edges
//       x += event.deltaRect.left;
//       y += event.deltaRect.top;

//       target.style.webkitTransform = target.style.transform = 
//         'translate(' + x + 'px,' + y + 'px)';

//       target.setAttribute('data-x', x);
//       target.setAttribute('data-y', y);
//       target.textContent = event.rect.width + '×' + event.rect.height;
//     });
// }

// module.exports = {
//   makeResizable: makeResizable,
//   makeResizableCanvas: makeResizableCanvas
// };