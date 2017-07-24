// Document Ready
$(document).ready(function() {
  
  // Does stuff on load and scrolls
  //-------------------------------//	
	$(window).on("load scroll",function(e){
		// splash page
		$().SplashScreen();
	});

});

//-------------------------------//	
//	Splash Page Scroll   	 //
//-------------------------------//
	$.fn.SplashScreen = function() {
	
		// Set vars & ready activation states
		var $window = $(window),
			element = '.splashwrapper';

		if ( $window.scrollTop() === 0 && !$('.splashwrapper').hasClass('ready') ) {
			$window.scrollTop(1);
			setTimeout(function() {
				$('.splashwrapper').addClass('ready');
			}, 500);
		}

		if ( $window.scrollTop() === 0 && $('.splashwrapper').hasClass('ready') ) {
			$window.scrollTop(1);
			$('.splashwrapper').removeClass('ready').removeClass('remove');
		}	
		
		// hide/show splash screen
		//=========================//
			// chrome/FF
			$('.splashwrapper').bind('DOMMouseScroll', function(e){
				
				// get scroll direction
				var direction = (function () {
				
					var delta = (e.type === 'DOMMouseScroll' ?
						e.originalEvent.detail * -40 :
						e.originalEvent.wheelDelta);
						return delta > 0 ? 0 : 1;
				}());
				
				if( direction === 0 ) {
					// scroll up
				
				} else {
					// scroll down
					$('.splashwrapper').addClass('remove').removeClass('ready');					
				}
				
				//prevent page fom scrolling
				return false;
			});
			
			//IE, Opera, Safari
			$('.splashwrapper').bind('mousewheel', function(e){

				// get scroll direction
				var direction = (function () {
				
					var delta = (e.type === 'DOMMouseScroll' ?
						e.originalEvent.detail * -40 :
						e.originalEvent.wheelDelta);
						return delta > 0 ? 0 : 1;
				}());
				
				if( direction === 0 ) {
					// scroll up

				} else {
					// scroll down
					$('.splashwrapper').addClass('remove').removeClass('ready');					
				}
			
				//prevent page fom scrolling
				return false;
			});

			// touch device - uses touchSwipe.js
			$(".splashwrapper").swipe({
				swipeUp:function() {
					$('.splashwrapper').addClass('remove').removeClass('ready');
				}
			});

			// keyboard controls
			$(document).keydown(function(e) {
				// if down arrow, page down, or end are pressed on the keyboard
				if (e.keyCode == 40 || e.keyCode == 34 || e.keyCode == 35) { 
					$(element).addClass('remove').removeClass('ready');
				}
			
			});
			
	};
