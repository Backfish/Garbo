steal('jquery', 'can', 'steal/less')
	.then('./views/currencyitems.ejs','./partone/partone.js', './parttwo/parttwo.js', 'core/tooltip', './register.less', function ($) {

	    /**
	    * @class Gb.User.Register
	    */
	    can.Control('Gb.User.Register',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            var _this = this;
	            this.element.find('#CountryCode').change();
	            new Core.Tooltip(this.element, { triggerObj: '.nav .disabled' });
	            new Register.Partone('#frmRegisterUserInfo', { validator: '/api/api/PlayerValidator/Validate', url: '/api/api/PlayerFirstPartRegistration/AddDataFirstPart', successCallback: function () {
	                _this.element.find('#hidEmail').val($('#frmRegisterUserInfo').find('#Email').val());
	                _this.element.find('.nav .active').next().removeClass('disabled').find('a').trigger('click');
	            }, errorCallback: function () { }
	            });
	            new Register.Parttwo('#frmRegisterPersonalDetails', { validator: '/api/api/PlayerValidator/Validate', url: '/api/api/PlayerSecondPartRegistration/AddDataSecondPart', successCallback: function () {
	                $('#navUsername').html(_this.element.find('#FirstName').val() + ' ' + _this.element.find('#LastName').val());
	                $(document.body).removeClass('logged-out').addClass('logged-in');
                    $(document.documentElement).trigger('user:login');
	                location.hash = "#!welcome";
	            }, errorCallback: function () { }
	            });
	        },
	        update: function () {
	            this._super();
	        },
	        "#CountryCode change": function (el,ev) {
	            var _this = this;
	            var currencycode = el.val() != '' ? el.val() : 'sv';
	            $.getJSON('api/api/currency/GetCurrencies?countryCode='+currencycode, function (data) {
	                _this.element.find('#CurrencyCode').html(can.view('//gb/user/register/views/currencyitems.ejs', data));
	            });
	        },
	        "{document.documentElement} modal.animation.finished": function () {
	            try {
	                this.element.find('[type=text]:first').focus();
	            } catch (err) {
	            }
	        },
	        ".nav li:not(.disabled) a click": function (el, ev) {
	            ev.preventDefault();
	            var selector = el.attr('href')
	            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
	            this.element.find('.tab-content .active').removeClass('active');
	            this.element.find('.active').removeClass('active');
	            el.parent().addClass('active')
	            this.element.find(selector).addClass('active');
	        },
	        ".nav .disabled a click": function (el, ev) {
	            ev.preventDefault();
	        },
	        ".nav .disabled mouseenter": function (el, ev) {

	        },
	        ".nav .disabled mouseleave": function (el, ev) {

	        }

	    });

	});