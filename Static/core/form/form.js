steal('can', 'jquery','core/popover', 'core/notification', function (can, $) { 
        can.fixture('POST /login', function (req) {
            return { username: 'HenkeBenke' };
        });
        /**
	    * @class Core.Form
	    * 
	    */
	    can.Control('Core.Form',
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
	    submitform: function (el) {
	        var _this = this;
	        var params = this.options.method == 'GET' ? el.serializeObject() : JSON.stringify(el.serializeObject());
	        $.ajax({
	            type: _this.options.method,
	            url: _this.options.url + _this.options.extraParam,
	            data: params,
	            contentType: "application/json; charset=utf-8",
	            dataType: "json",
	            success: function (data) {
	                el.find('.error').removeClass('error');
	                _this.success(data);
	            },
	            error: function (jqXHR, textStatus, err) {
	                if (!Modernizr.input.placeholder) {
	                    _this.element.find('[placeholder]').each(function () {
	                        var input = $(this);
	                        if (input.val() == '' || input.val() == input.attr('placeholder')) {
	                            input.addClass('placeholder');
	                            input.val(input.attr('placeholder'));
	                        }
	                    });
	                }
	                _this.error(jqXHR, textStatus, err);
	            },
	            complete: function () { _this.complete(); }
	        });
	    },
	    "submit": function (el, ev) {
	        ev.preventDefault();
	        this.options.loader = new Core.Loader(el, { delay: 0 });
	        if (!Modernizr.input.placeholder) {
	            var els = this.element.find('[placeholder]');
	            for (var i = 0; i < els.length; i++) {
	                var input = $(els[i]);
	                if (input.val() == input.attr('placeholder')) {
	                    input.val('');
	                };
	            };
	        };
	        this.submitform(el);
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
	        if (!el.hasClass('no-validate')) {
	            var _validator = { Name: el.prop('name'), Value: el.val() };
	            var _this = this;

	            if (this.options.validator != '' && el.val() != '' && el.val() != el.attr('placeholder')) {
	                $.ajax({
	                    type: "POST",
	                    url: _this.options.validator,
	                    data: JSON.stringify(_validator),
	                    contentType: "application/json; charset=utf-8",
	                    dataType: "json",
	                    success: function (data) {
	                        _this.validateOk(el);
	                    },
	                    error: function (jqXHR, textStatus, err) {
	                        var responseText = $.parseJSON(jqXHR.responseText);
	                        if (responseText != null) {
	                            el.data('error', '');
	                            el.addClass('error');
	                            el.data('error', el.data('error') + responseText.Message);
	                        } else {
	                            Core.Notification('', { state: 'error', title: 'You cannot post an empty form.' });
	                        }
	                    },
	                    complete: function () {
	                    }
	                });
	            }
	        }
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
	    complete: function () {
	        if (this.options.loader != null) {
	            this.options.loader.remove();
	        }
	    },
	    "input keypress": function (el, ev) {
	        $(el).removeClass('error').removeClass('success');
	    }
	});

});