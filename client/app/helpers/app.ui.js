(function() {

  // cache jQuery object
  var $wrapper = $('#main-wrapper'),
      
      // true if dragging the container
      kinetic_moving  = false,
      // current index of the opened item
      current = -1,
      // true if the item is being opened / closed
      isAnimating = false,
      // items on the grid
      $items = $wrapper.find('div.main > a'),
      // image items on the grid
      $imgItems = $items.not('.content'),
      // total image items on the grid
      imgItemsCount = $imgItems.length;
      
  function init() {
    $imgItems.addClass('image');
    loadKinetic();
    initEvents();
  }

  function loadKinetic() {
    setWrapperSize();
    
    // apply the kinetic plugin to the wrapper
    $wrapper.kinetic({
      moved: function() {
        kinetic_moving = true;
      },
      stopped: function() {
        kinetic_moving = false;
      }
    });
  }
  
  function setWrapperSize() {
    var containerMargins = $('#top').outerHeight(true) + parseFloat( $items.css('margin-top') );
    $wrapper.css('height', $(window).height() - containerMargins );
  }
  
  function initEvents() {
    $items.bind('click.app-layout', function( event ) {
      // open the item only if not dragging the container
      if ( !kinetic_moving ) { openItem( $(this) ); }
    
      return false; 
    });
    
    // on window resize, set the wrapper and preview size accordingly
    $(window).bind('resize.app-layout', function( event ) {
      setWrapperSize();
      
      $('#content-view').css({
        width: $(window).width(),
        height: $(window).height()
      });
    });
  }

  function openItem( $item ) {
    if ( isAnimating ) { return false; }
    
    // if content item
    // TODO: differentiate between whiteboard, canvase, text-editor, user profile
    if ( $item.hasClass('content') ) {
      isAnimating = true;
      current = $item.index('.content'); // used for close
      
      // TODO: different screen ratio of whiteboard, canvas, text-editor, user profile
      loadContentItem( $item, function() { isAnimating = false; } );
    }
  }

  // opens one content item (currently fullscreen)
  function loadContentItem( $item, callback ) {
    
    var hasContentView = ( $('#content-view').length > 0 ),
        teaser = $item.children('div.teaser').html(),
        content = $item.children('div.content-full').html(),
        contentData = {
          teaser: teaser,
          content: content
        };
      
    if( !hasContentView ) {
      // load template for all content items
      // TODO: seems to be having synchrnous issues with main.js
      $('#contentTmpl').tmpl( contentData ).insertAfter( $wrapper );
      initContentPreviewEvents();

   
    }
    
    // in content template, set the returned values and show/animate view
    $('#content-view').css({
      width: $item.width(),
      height: $item.height(),
      left: $item.offset().left,
      top: $item.offset().top
    }).show().animate({
      // TODO: control the layout of content for ratio here
      width: $(window).width(),
      left: 0
    }, 500, 'easeOutExpo', function() {
    
      $(this).animate({
        height: $(window).height(),
        top: 0
      }, 400, function() {
        
        var $this = $(this),
          $teaser = $this.find('div.teaser'),
          $content= $this.find('div.content-full'),
          $close  = $this.find('span.close');
          
        if( hasContentView ) {
          // TODO: use injection API here
          // possibly decouple and inject associated script tags as well
          $teaser.html( teaser )
          $content.html( content )
        }
      
        $teaser.show();
        $content.show();
        $close.show();
        
        if( callback ) callback.call();
      
      });
    });
  }

  // load the events for the content preview - close button
  function initContentPreviewEvents() {
    $('#content-view')
      .find('span.close')
      .bind('click.app-layout', function( event ) {
        closeContentPreview();
      });
  }

  // closes the fullscreen content item
  function closeContentPreview() {
    
    if( isAnimating ) { return false; }
    
    isAnimating = true;
    
    // var $item = $items.not('.user').eq( current );
    var $item = $items.eq( current );
    
    // animation in order of height, width, visibility
    $('#content-view')
      .find('div.teaser, div.content-full, span.close')
      .hide()
      .end()
      .animate({
        height: $item.height(),
        top: $item.offset().top // account for top bar
      }, 500, 'easeOutExpo', function() {
        $(this).animate({
          width: $item.width(),
          left: $item.offset().left
        }, 400, function() {
          $(this).fadeOut(function() { isAnimating = false; });
        });
      });
  }

  init();

})();
