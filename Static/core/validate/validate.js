steal('can', 'jquery','core/popover', 'core/notification', function (can, $) { 
        /**
	    * @class Core.Validate
	    * 
	    */
	    can.Control('Core.Validate',
	    /** @Static */
	    {
	    defaults: {
	        validator: '',
	        url: '',
	        successCallback: '',
	        errorCallback: '',
	        loader: null,
	        method: 'POST',
	        extraParam: ''
	    }
	},
	/** @Prototype */
	    {
	    init: function () {
	        new Core.Popover(this.element, { triggerObj: 'input[type=text]' });
	        new Core.Popover(this.element, { triggerObj: 'input[type=Password]' });
            if (!Modernizr.input.placeholder) {
	            this.element.find('[placeholder]').each(function () {
	                var input = $(this);
	                if (input.val() == '' || input.val() == input.attr('placeholder')) {
	                    input.addClass('placeholder');
	                    input.val(input.attr('placeholder'));
	                }
	            });
	        }
	    },
	    "[placeholder] blur": function (el, ev) {
	        if (!Modernizr.input.placeholder) {
	            var input = el;
	            if (input.val() == '' || input.val() == input.attr('placeholder')) {
	                input.addClass('placeholder');
	                input.val(input.attr('placeholder'));
	            }
	        };
	    },
	    "[placeholder] focus": function (el, ev) {
	        if (!Modernizr.input.placeholder) {
	            var input = el;
	            if (input.val() == input.attr('placeholder')) {
	                input.val('');
	                input.removeClass('placeholder');
	            }
	        };
	    },
	    "input[type=text] blur": function (el, ev) {
	        this.validate(el);
	    },
	    "input[type=password] blur": function (el, ev) {
	        this.validate(el);
	    },
	    "select change": function (el, ev) {
	        el.removeClass('error');
	    },
	    validate: function (el) {
	        this.validateOk(el)
	    },
	    success: function (data) {
	        //Show notifiers/alert with msg?
	        if (typeof this.options.successCallback == "function") {
	            this.options.successCallback();
	        }
	    },
	    error: function (jqXHR, textStatus, err) {
	        var responseText = $.parseJSON(jqXHR.responseText);
	        if (responseText != null) {
	            var errorList = responseText.ErrorList;
	            if (errorList != null && errorList.length > 0) {
	                this.element.find('.error').data('error', '');
	                var alertString = '';
	                for (var i = 0; i < errorList.length; i++) {
	                    var el = this.element.find('#' + errorList[i].Field);
	                    el.data('error', '');
	                    el.addClass('error');
	                    el.data('error', el.data('error') + errorList[i].ErrMsg);
	                    alertString += errorList[i].ErrMsg + '<br>';
	                }
	                new Core.Notification('', { state: 'error', title: alertString });
	            }
	            else if (responseText.Message != null && responseText.Message != '') {
	                new Core.Notification('', { state: 'error', title: responseText.Message });
	            }
	            if (typeof this.options.errorCallback == "function") {
	                this.options.errorCallback(jqXHR, textStatus, err);
	            }
	        } else {
	            Core.Notification('', { state: 'error', title: 'You cannot post an empty form.' });
	        }
	    },
	    validateOk: function (el) {
	        el.data('error', '');
	        el.removeClass('error').addClass('success');
	    },
	    "input keypress": function (el, ev) {
	        $(el).removeClass('error').removeClass('success');
	    }
	});

});