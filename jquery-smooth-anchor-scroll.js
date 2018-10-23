( function( $ ) {

	function smoothScrollTo( hash, offset, time ) {
		if ( !hash.match( '\#[^\&]+$' ) ) {
			return;
		}

		var $target = $( hash );

		if ( !$target.length ) {
			$target = $( '[name="' + hash.slice(1) + '"]' );
		} 

		if ( $target.length ) {
			var beforeScrollPromise = false;

			if ( window.smoothAnchorScroll && window.smoothAnchorScroll.beforeScroll ) {
				beforeScrollPromise = window.smoothAnchorScroll.beforeScroll();
			} else {
				var dfd = $.Deferred();
				dfd.resolve();
				beforeScrollPromise = dfd.promise();
			}

			beforeScrollPromise.then( function() {
				var targetOffset = $target.offset().top - offset + 'px';
				$( 'html, body' ).animate( { scrollTop: targetOffset }, time, function () {
					if ( history.replaceState ) {
						history.replaceState(null, null, hash);
					} else {
						location.hash = hash;
					}

					if ( window.smoothAnchorScroll && window.smoothAnchorScroll.afterScroll ) {
						window.smoothAnchorScroll.afterScroll();
					}
				} );
			} );
		}
	}

	function getOffset() {
		var offset = 0;

		if ( window.smoothAnchorScroll && window.smoothAnchorScroll.offset ) {
			if ( $.isFunction( window.smoothAnchorScroll.offset ) ) {
				offset = window.smoothAnchorScroll.offset();
			} else {
				offset = parseInt( window.smoothAnchorScroll.offset, 10 );
			}
		}

		return offset;
	}

	function getScrollingDuration() {
		var duration = 600;

		if ( window.smoothAnchorScroll && window.smoothAnchorScroll.duration ) {
			if ( $.isFunction( window.smoothAnchorScroll.duration ) ) {
				duration = window.smoothAnchorScroll.duration();
			} else {
				duration = parseInt( window.smoothAnchorScroll.duration, 10 );
			}
		}

		return duration;
	}

	// setup smooth page scroll
	$( document ).on( 'click.smoothAnchorScroll', 'a[href*="#"]', function() {
		var href = $( this ).attr( 'href' );

		if ( location.pathname.replace( /^\//, '' ) === this.pathname.replace( /^\//, '' ) && location.hostname === this.hostname ) {
			smoothScrollTo( this.hash, getOffset(), $( this ).data( 'smooth-anchor-scroll-duration' ) || getScrollingDuration() );
			return false;
		}
	} );

	function init() {
		if ( location.hash.length ) {
			setTimeout( function() {
				smoothScrollTo( location.hash, getOffset(), 0 );
			} );
		}
	}

	$( document ).ready( function() {
		var pathname = location.protocol + '//' + location.hostname + ( location.port ? ':' + location.port : '' ) + location.pathname + ( location.search ? location.search : '' );
		
		$( 'a' ).each( function() {
			var hash = $( this ).attr( 'href' );
			if ( hash && hash[ 0 ] === "#") {
				$( this ).attr( 'href', pathname + hash );
			}
		} );

		init();
	} );

} )( jQuery );
