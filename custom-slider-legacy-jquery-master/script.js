/**
	 * Displays basic slider compatable with jQuery version 1.4.2
	 * @param {string} slider_wrapper
	 * @param {string} slider_child
	 * @param {int} aniSpeed
	 * @returns {boolean}
	 */
	function simpleSlider(options) {
		// slider options + targeted elements
		var slider_wrapper	= options.slider_wrapper || '.slidewrapper',
			slider_child	= options.slider_child || '.leaderboard',
			aniSpeed		= options.aniSpeed || 400;

		// slider vars
		var slideArray = $(slider_wrapper).children();
		var slideCount = $(slider_child).length;
		var slideWidth = $(slider_child).width();
		var sliderUlWidth = slideCount * slideWidth;

		// slider setup
		$(slider_wrapper).css({ width: sliderUlWidth });
		$(slider_wrapper).css('transform','translate3d(0px, 0px, 0px)');
		$(slider_wrapper).css('transition-duration', aniSpeed+'ms');
		$(slider_wrapper).data('the_position', 0);
		var sliderUlWidth = sliderUlWidth - slideWidth; // fixes slide true widths

		// slider startup
		currentSlide();
		checkStatus();

		// slider actions + functions
		// --------------------------//
		// slide action
		function moveAction(direction) {
			var direction = direction || 'right';
			var position = $(slider_wrapper).data('the_position');

			// get new position
			var newPosition = ( direction == 'right' ? position - slideWidth : position + slideWidth );

			// var checkers
			var newPosition = ( newPosition < 0 ? 0 : newPosition );
			var newPosition = ( newPosition > sliderUlWidth ? 0 : newPosition );
			var position = $(slider_wrapper).data('the_position', newPosition);

			// translate slides + other actions
			if ( newPosition >= 0 && newPosition <= sliderUlWidth ) {
				$(slider_wrapper).css('transform','translate3d('+ ( newPosition ) +'px, 0px, 0px)');
				currentSlide(direction);
				checkStatus();
				changeDate();
			}
		}

		// set active slide
		function currentSlide(direction) {
			var currentIndex = $(slider_child+'.active').index();

			$(slider_child + '.active').removeClass('active');
			if ( direction === 'right' && currentIndex != 0 ) {
				$(slider_child).eq(currentIndex - 1).addClass('active');
			} else if ( direction === 'left' && currentIndex != (slideCount - 1) ) {
				$(slider_child).eq(currentIndex + 1).addClass('active');
			} else if ( currentIndex == 0 || currentIndex == slideCount ) {
				return false;
			} else {
				$(slider_child).eq(0).addClass('active');
			}
		}

		// set active slide
		function changeDate() {
			var changeDate = $(slider_child +'.active').data('date');
			$( 'nav.ribbon-nav .leaderboard-date' ).html(changeDate);
		}

		function checkStatus() {
			$( 'nav.ribbon-nav .prev, nav.ribbon-nav .next' ).removeClass('disabled');
			if( $(slider_child + '.current').hasClass('active') ) {
				$( '.notifications').removeClass('active');
				$( '.leaderboard-updated-wrapper' ).fadeIn();
				$( 'nav.ribbon-nav .next' ).addClass('disabled');
			} else {
				$( '.notifications' ).addClass('active');
				$( '.leaderboard-updated-wrapper' ).fadeOut();
			};

			if( $(slider_child).last().hasClass('active') ) {
				$( 'nav.ribbon-nav .prev' ).addClass('disabled');
			}
		}

		// controls
		$('a.next').bind('click', function() {
			if ( $(this).hasClass('disabled') ) return false;
			moveAction('right');
		});

		$('a.prev').bind('click', function() {
			if ( $(this).hasClass('disabled') ) return false;
			moveAction('left');
		});

		// --------------------------//
		// end slider actions + functions

		// slider keyboard movements
		// --------------------------//
		document.onkeydown = checkKey;
		function checkKey(e) {
			e = e || window.event; // makes old versions of IE (pre IE9) work

			/*
			if (e.keyCode == '38') {
				// up arrow
			}
			else if (e.keyCode == '40') {
				// down arrow
			}
			*/
			if (e.keyCode == '37') {
				if ( $('a.prev').hasClass('disabled') ) return false;
				moveAction('left');
			}
			else if (e.keyCode == '39') {
				if ( $('a.next').hasClass('disabled') ) return false;
				moveAction('right');
			}

		}
		// --------------------------//
		// end slider keyboard movements
	}
