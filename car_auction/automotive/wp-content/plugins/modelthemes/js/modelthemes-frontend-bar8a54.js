/*
 File name:          Custom Admin JS
*/

// (function ($) {
//   'use strict';
// 	jQuery( document ).ready(function() {
		// ... Start Admin JS here ...
    
		(function() {
			var mt_triggerBttn = document.getElementById( 'mt_trigger-overlay' ),
				mt_overlay = document.querySelector( '.mt_overlay' ),
				mt_closeBttn = mt_overlay.querySelector( '.mt_overlay-close' );
				mt_transEndEventNames = {
					'WebkitTransition': 'webkitTransitionEnd',
					'MozTransition': 'transitionend',
					'OTransition': 'oTransitionEnd',
					'msTransition': 'MSTransitionEnd',
					'transition': 'transitionend'
				},
				mt_transEndEventName = mt_transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
				mt_support = { transitions : Modernizr.csstransitions };

			function mt_toggleOverlay() {
				if( classie.has( mt_overlay, 'open' ) ) {
					classie.remove( mt_overlay, 'open' );
					classie.add( mt_overlay, 'close' );
					var mt_onEndTransitionFn = function( ev ) {
						if( mt_support.transitions ) {
							if( ev.propertyName !== 'visibility' ) return;
							this.removeEventListener( mt_transEndEventName, mt_onEndTransitionFn );
						}
						classie.remove( mt_overlay, 'close' );
					};
					if( mt_support.transitions ) {
						mt_overlay.addEventListener( mt_transEndEventName, mt_onEndTransitionFn );
					}
					else {
						mt_onEndTransitionFn();
					}
				}
				else if( !classie.has( mt_overlay, 'close' ) ) {
					classie.add( mt_overlay, 'open' );
				}
			}

			mt_triggerBttn.addEventListener( 'click', mt_toggleOverlay );
			mt_closeBttn.addEventListener( 'click', mt_toggleOverlay );
		})();


// 	});
// } (jQuery) )