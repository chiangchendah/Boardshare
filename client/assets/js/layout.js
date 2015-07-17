(function() {

	'use strict';

	var layout = document.getElementById( 'layout' ),
			leftSide = layout.querySelector( 'div.home > div.side-left' ),
			middleSide = layout.querySelector( 'div.home > div.side-middle' ),
			rightSide = layout.querySelector( 'div.home > div.side-right' ),
			pageLeft = layout.querySelector( 'div.page-left' ),
			pageMiddle = layout.querySelector( 'div.page-middle' ),
			pageRight = layout.querySelector( 'div.page-right' ),
			
			// See https://github.com/twbs/bootstrap/issues/2870
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[Modernizr.prefixed( 'transition' )];
	
	function init() {
		classie.add( layout, 'reset-layout' );
		
		leftSide.querySelector( 'div.menu' ).addEventListener( 'click', function( ev ) {
			reset();
			classie.add( layout, 'open-left' );
		});
		middleSide.querySelector( 'div.menu' ).addEventListener( 'click', function( ev ) {
			reset();
			classie.add( layout, 'open-middle' );
		});
		rightSide.querySelector( 'div.menu' ).addEventListener( 'click', function( ev ) {
			reset();
			classie.add( layout, 'open-right' );
		});

		var	backToHome = function( ev ) {
					ev.preventDefault();
					ev.stopPropagation();
					if ( classie.has( ev.target, 'back-left' ) ) {
						classie.remove( layout, 'open-right' );
						classie.add( layout, 'close-right' );
					} else if ( classie.has( ev.target, 'back-middle' ) ) {
						classie.remove( layout, 'open-middle' );
						classie.add( layout, 'close-middle' );
					} else if ( classie.has( ev.target, 'back-right' ) ) {
						classie.remove( layout, 'open-left' );
						classie.add( layout, 'close-left' );
					}
				};

			layout.querySelector( 'a.back-left' ).addEventListener( 'click', backToHome );
			layout.querySelector( 'a.back-middle' ).addEventListener( 'click', backToHome );
			layout.querySelector( 'a.back-right' ).addEventListener( 'click', backToHome );
	}

	function reset() {
		classie.remove( layout, 'close-left' );
		classie.remove( layout, 'close-middle' );
		classie.remove( layout, 'close-right' );
		classie.remove( layout, 'reset-layout' );
	}

	init();

})();
