	// add custom rules to elements
	$(':input').each(function() {

		// add date rule
		if ( $(this).is('#custom_ID_one') || $(this).is('#custom_ID_two') || $(this).is('#custom_ID_three') ) {
			$(this).rules('add', {
				// Checks date with 'please enter a valid date' message
				DateGeneral: true
			});
		}

		// if no min/max value skip teration
		if ( $(this).attr('data-min') != undefined || $(this).attr('data-max') != undefined ) {
			// add input range rule
			$(this).rules('add', {
				// checks number of inputed characters
				// if characters are in range than validate else throw error
				customRange: true
			});
		};
	});
