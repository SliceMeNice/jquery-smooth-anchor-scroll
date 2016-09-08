( function( $ ) {

	function smoothScrollTo( hash, offset, time ) {
		var $target = $( hash );

		if ( !$target.length ) {
			$target = $( '[name="' + hash.slice(1) + '"]' );
		} 

		if ( $target.length ) {
			var targetOffset = $target.offset().top - offset + 'px';
			$( 'html, body' ).animate( { scrollTop: targetOffset }, time, function () {
				window.location.hash = hash;
			} );
		}
	}

	function getOffset() {
		var offset = 0;

		if ( window.smoothAnchorScroll && window.smoothAnchorScroll.offset ) {
			if ( $.isFunction( window.smoothAnchorScroll.offset ) ) {
				offset = window.smoothAnchorScroll.offset();
			} else {
				offset = parseInt( windo.smoothAnchorScroll.offset, 10 );
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
				duration = parseInt( windo.smoothAnchorScroll.duration, 10 );
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
