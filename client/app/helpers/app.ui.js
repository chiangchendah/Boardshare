/**
 * Features can be toggled with one click, and expands to fill the window.
 */

(function() {
  
  var $wrapper = $('#main-wrapper'),
      $items = $wrapper.find('div.main > a'),
      kinetic_moving = false,  // true if dragging the container
      current = -1,
      isAnimating = false,
      // toggle states for menu
      opened = {
        Video: false,
        Whiteboard: false,
        'Text-Editor': false,
        Profile: false
      };

  function init() {
    loadKinetic();
    initEvents();
  }

  function loadKinetic() {
    setWrapperSize();

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
    $items.bind('click.app-ui', function() {
      var $item = $(this),
          selection = $item[0].innerText.trim();

      if ( !kinetic_moving ) {
        for (var item in opened) {
          if (opened[item]) {

            if (item === selection) {
              return false;
            }

            closeContentView(item, function(){
              openItem($item);
            });
          }
        }

        openItem($item);

        $('aside').text('loading...');
      }

      return false;
    });

    $(window).bind('resize.app-ui', function() {
      setWrapperSize();

      $('.content-view').css({
        width: $(window).width() - 220, // minue menu width
        height: $(window).height()
      });
    });
  }

  function openItem($item) {
    if (isAnimating) {
      return false;
    }

    isAnimating = true;
    current = $item.index('.content');

    loadContentItem($item, function() {
      isAnimating = false;
    });
  }

  function loadContentItem($item, callback) {

    var app = $item.find('div.teaser span').text(),
        appId = '#' + app;

    initContentViewEvents();
   
    $item.find('div.teaser').addClass('item-open');

    $(appId).css({
      width: $item.width(),
      height: $item.height(),
      left: $item.offset().left,
      top: $item.offset().top
    }).show().animate({
      width: $(window).width() - 220,
      left: 222 // menu plus scroll bar width
    }, 200, 'easeOutExpo', function() {
      $(this).animate({
        height: $(window).height(),
        top: 40 // header height
      }, 300, 'easeInQuad', function() {

        var $this = $(this),
            $teaser = $this.find('div.teaser'),
            $content= $this.find('div.content-full');

        $teaser.show();
        $content.fadeIn(600);

        opened[app] = true;

        if(callback) {
          callback();
        }

      });
    });
  }

  function initContentViewEvents() {
    $('.content-view')
      .find('span.close')
      .bind('click.app-ui', function(event) {
        var app = event.currentTarget.parentElement.id;
        closeContentView(app);
      });
  }

  function closeContentView(app, callback) {
    if(isAnimating) {
      return false;
    }

    isAnimating = true;

    var $item = $items.eq(current);
    var appId = '#' + app;

    $item.find('div.teaser').removeClass('item-open');

    $(appId)
      .find('div.teaser, div.content-full')
      .hide()
      .end()
      .animate({
        height: $item.height(),
        top: $item.offset().top
      }, 250, function() {
        $(this).animate({
          width: $item.width(),
          left: $item.offset().left
        }, 200, 'easeOutQuart', function() {
          $(this).fadeOut(function() {
            opened[app] = false;
            isAnimating = false;
            if (callback) {
              callback();
            }
          });
        });
      });
  }

  init();

})();
