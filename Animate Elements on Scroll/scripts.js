	// hide/reveals the slash page
	//-------------------------------//
	$(function(){
		var _top = $(window).scrollTop();
		var _direction;
	
		// hides splash if we're not at top of page
		if ( $(window).scrollTop() != 0  ) {
			$('.splashwrapper').removeClass('active').addClass('fast');
		}
	
		// checks window position on if we should show splash page
		$(window).scroll(function(e){
			var _cur_top = $(window).scrollTop();
			var current = $(window).scrollTop();
			
			// conditional to check if scrolling up or down
			if(_top < _cur_top) {
				// scroll down
				_direction = 'down';
				if ( $(window).scrollTop()  > 0 ) {
					if ( $('.splashwrapper').hasClass('active') ) $('html,body').scrollTop(1);
					setTimeout(function() { 
						$('.splashwrapper').removeClass('active').removeClass('fast');
					}, 350);
					
					//
				}				
			} else {
				// scroll up
				_direction = 'up';
				if ( $(window).scrollTop() == 0 ) {
					$('.splashwrapper').addClass('active').removeClass('fast');
				}
			}
			_top = _cur_top;
			//console.log(_direction);
			//console.log($(window).scrollTop());
		});
	});
