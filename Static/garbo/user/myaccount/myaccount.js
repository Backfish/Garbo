steal('jquery', 'can')
	.then(function ($) {

	    /**
	    * @class User.Myaccount
	    */
	    can.Control('User.Myaccount',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            var _this = this;
	            /*$.getJSON('api/api/balance/GetPlayerBalance', function (data) {
	                _this.element.find('#MyAccountBalance').html(data.Amount);
	            });*/
	            //Click the first tab.
	            this.element.find('.nav a').eq(0).click();
	        },
	        ".nav li:not(.disabled) a click": function (el, ev) {
	            ev.preventDefault();
	            var selector = el.attr('href')
	            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
	            this.element.find('.tab-content .active').removeClass('active');
	            this.element.find('.active').removeClass('active');
	            this.loadContent(el, selector);
	            el.parent().addClass('active')
	            this.element.find(selector).addClass('active');
	        },
	        loadContent: function (el, selector) {
	            var href = el.data('href');
	            if (href != null && href != '') {
	                this.element.find(selector).load(href);
	            }
	        }
	    });

	});