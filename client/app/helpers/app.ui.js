(function() {

  // cache jQuery object
  var $wrapper = $('#main-wrapper'),
      // items on the grid
      $items = $wrapper.find('div.main > a'),
      
      // true if dragging the container
      kinetic_moving = false,
      // current index of the opened item
      current = -1,
      // true if the item is being opened / closed
      isAnimating = false;
      
      
  function init() {
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
    // open apps
    $items.bind('click.app-ui', function( event ) {
      // open only if not dragging the container
      if ( !kinetic_moving ) {
        openItem( $(this) );

        // change empty state
        $('aside').hide().text('You look nice today.');
      }
    
      return false; 
    });
    
    // on window resize, set the wrapper and view size accordingly
    $(window).bind('resize.app-ui', function( event ) {
      setWrapperSize();
      
      $('.content-view').css({
        width: $(window).width(),
        height: $(window).height()
      });
    });
  }

  function openItem( $item ) {
    if ( isAnimating ) {
      return false;
    }
  
    isAnimating = true;
    current = $item.index('.content'); // used for close
    
    // TODO: different screen ratio of whiteboard, canvas, text-editor, user profile
    loadContentItem($item, function() {
      isAnimating = false;
    });
  }

  // opens one content item (currently fullscreen)
  function loadContentItem( $item, callback ) {
      
    var appId = '#' + $item.find('div.teaser span').text();

    // load template for all content items
    initContentViewEvents();
    
    // in content template, set values and animate view
    $( appId ).css({
      width: $item.width(),
      height: $item.height(),
      left: $item.offset().left,
      top: $item.offset().top
    }).show().animate({
      // TODO: control content layout ratio here
      width: $(window).width() - 220,
      left: 222
    }, 200, 'easeOutExpo', function() {
    
      $(this).animate({
        height: $(window).height(),
        top: 40 // header height
      }, 300, 'easeInQuad', function() {
        
        var $this = $(this),
            $teaser = $this.find('div.teaser'),
            $content= $this.find('div.content-full'),
            $close  = $this.find('span.close');

        $teaser.show();
        $content.fadeIn(600);
        $close.show();
        $('aside').show();
        
        if( callback ) {
          callback();
        }
      
      });
    });
  }

  // events for the content preview
  function initContentViewEvents() {
    // close button
    $('.content-view')
      .find('span.close')
      .bind('click.app-ui', function( event ) {
        var app = event.currentTarget.parentElement.id;
        closeContentView(app);
      });
  }

  // closes the fullscreen content item
  function closeContentView(app) {
    
    if( isAnimating ) {
      return false;
    }
    
    isAnimating = true;
    
    // var $item = $items.not('.user').eq( current );
    var $item = $items.eq( current );
    var appId = '#' + app;

    // animation
    $( appId )
      .find('div.teaser, div.content-full, span.close')
      .hide()
      .end()
      .animate({
        height: $item.height(),
        top: $item.offset().top // account for top bar
      }, 250, function() {
        $(this).animate({
          width: $item.width(),
          left: $item.offset().left
        }, 200, 'easeOutQuart', function() {
          $(this).fadeOut(function() {
            isAnimating = false;
          });
        });
      });
  }

  init();

})();
