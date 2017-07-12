# jQuery Smooth Anchor Scroll

## Usage

Include `jquery-smooth-anchor-scroll.js` to add support for smooth anchor scrolling to your website.

Optionally: Configure the scrolling duration either globally or per link element.

```
// Include this before including jquery-smooth-anchor-scroll.js

( function() {

	$( document ).ready( function() {

		window.smoothAnchorScroll = window.smoothAnchorScroll || {};

		window.smoothAnchorScroll = {
			// 600ms is the default scrolling duration
			// this can also be a function returning a duration in milliseconds  
			duration: 600 
		};

	} );

} )();
```

```
// Scrolling duration per link element

<a href="#some-anchor" data-smooth-anchor-scroll-duration="200">Smooth scroll to anchor</a>
```

Optionally: Configure the scrolling offset

```
// Include this before including jquery-smooth-anchor-scroll.js

( function() {

	$( document ).ready( function() {

		window.smoothAnchorScroll = window.smoothAnchorScroll || {};

		window.smoothAnchorScroll = {
			// this can also be a function returning the offset in pixels  
			offset: 80 
		};

	} );

} )();
``` 


## Release History

__1.1.0__

  * Added beforeScroll and afterScroll hooks.

__1.0.0__

  * Initial version.