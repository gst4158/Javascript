jQuery.validator.addMethod('DateGeneral', function(value, element) {
	return this.optional(element) || /^(0?[1-9]|1[012])[-\/.](0?[1-9]|[12][0-9]|3[01])[-\/.](19|20)\d\d$/.test(value);
}, 'Please enter a valid date.');

jQuery.validator.addMethod('customRange', function (value, element) {
	var	elmLength = value.length,
		minVal = ( $(element).attr('data-min') ? $(element).attr('data-min') : 4 ),
		maxVal = ( $(element).attr('data-max') ? $(element).attr('data-max') : 500 );

	// if no data-attr return true.
	if ( !$(element).attr('data-min') || !$(element).attr('data-max') ) return true;
	// if within range return true.
	if ( elmLength >= minVal && elmLength <= maxVal ) return true;
	// allow blank fields to pass
	return this.optional(element);

}, function(params, element) {
	// return our error
	return 'Please enter between ' + $(element).attr('data-min') + ' and '+ $(element).attr('data-max') +' characters.'
});

jQuery.validator.standardValidationOptions = {
	// showErrors is a function that sends form error information to Omniture for tracking
	showErrors: function(errorMap, errorList) {
		trackFormErrors(this.errorList, this.currentForm);
		//========BEGIN defaultShowErrors from jQuery.validator======
		for ( var i = 0; this.errorList[i]; i++ ) {
			var error = this.errorList[i];
			this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
			this.showLabel( error.element, error.message );

			// Highlight invalid field's <label>
			this.settings.highlightLabel( this.settings.findLabel(this.currentForm, error.element), this.settings.errorLabelClass, true );
		}

		if( this.errorList.length ) {
			this.toShow = this.toShow.add( this.containers );
		}
		if (this.settings.success) {
			for ( var i = 0; this.successList[i]; i++ ) {
				this.showLabel( this.successList[i] );
			}
		}
		if (this.settings.unhighlight) {
			for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
				this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );

			// Unhighlight invalid field's <label>
				this.settings.highlightLabel( this.settings.findLabel(this.currentForm, elements[i]), this.settings.errorLabelClass, false);
			}
		}
		this.toHide = this.toHide.not( this.toShow );
		this.hideErrors();
		this.addWrapper( this.toShow ).show();
		//=========END defaultShowErrors from jQuery.validator=======

	},
	// End of show Errors

	// Locates associated <label> of a form field
	findLabel: function (form, element){
		if ($(element).length < 1){ return false; }

		var _form = $(form),
			_element = $(element),
			_parentElement = _element.parent(),
			_labels = _parentElement.find('label');

		// if no label found, check if element is contained within its own label
		if (_labels.length < 1 && _parentElement.attr('tagName') === 'LABEL') {
			_labels = _parentElement;
		}

		// if no label found, loop upward through form to locate a label with proper "for" attribute
		while (_labels.length < 1) {
			if (_parentElement[0] === _form[0]) {break;} // reached the top of the form, break out of loop

			_parentElement = _parentElement.parent();
			_labels = _parentElement.find('label[for= '+ _element.attr('id') +']');
		}

		// collect all label elements that reside in a particular radiobox
		if (_element.attr('type') === 'radio'){
			var _radioLabels = _element.closest('.radiobox').find('label');
			if (_radioLabels.length > 0){
				_labels = _labels.add(_radioLabels);
			}
		}

		return _labels;
	},

	// Sets highlighting for <label> elements
	highlightLabel: function (label, errorLabelClass, highlight) {
		if (typeof label === undefined || $(label).length < 1) {return false}

		if(highlight) {
			$(label).addClass(errorLabelClass);
		}
		else {
			$(label).removeClass(errorLabelClass);
		}
	},
	// End label highlighting

	errorElement: 'span',
	errorClass: 'invalid',
	errorLabelClass: 'validate',

	rules: {
		customRange: {
			customRange: true,
		},
		DateGeneral: {
			DateGeneral: true
		},
	},
	messages: {
		consent: {
			required: 'Please agree to the statement'
		}
	},
	onfocusout: function(element, event){
		// this function returns determines what to do on blur for each field
		// if there are rules set for the current field (element)
		if(typeof this.settings.rules[element.name] != 'undefined'){
			// if 'phonecustom' is the validation method for this field, and the field is valid
			if(this.settings.rules[element.name]['phonecustom'] && this.element(element)){
				// strip whitespaces from this field
				element.value = element.value.replace(/ /g, '');
			}
		}
		// required so all fields are validated on blur
		this.element(element);
	}

	/* The following options are also available:
	onkeyup:
	onsubmit:
	*/
};
