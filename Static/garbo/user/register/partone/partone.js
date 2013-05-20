steal('jquery', 'can', 'can/construct/super')
	.then('core/form', function ($) {

	    /**
	    * @class Register.Partone
	    */
	    Core.Form('Register.Partone',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            this._super();
	        },
	        update: function () {
	            this._super();
	        },
	        "submit": function (el, ev) {
	            ev.preventDefault();
	            var _this = this;
	            this.options.extraParam = '?ioBlackBox=' + encodeURIComponent(_this.element.find('#ioBlackBox').val());
	            this._super(el, ev);
	        },
	        "#CountryCode change": function (el, ev) {
	            if (el.val() != '') {
	                $.get('/api/api/PhoneSuffix/GetPhoneSuffix?countryCode=' + el.val(), function (data) {
	                    $('#PhoneSuffix').val(data);
                    });
	                
	            }
	        }

	    });

	});