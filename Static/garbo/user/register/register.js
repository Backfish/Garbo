steal('can', 'jquery','garbo/models/register.js', 'steal/less', 'resources/bootstrap/bootstrap-switch.js', 'core/popover/popover.js', function (can, $, Register) {

	    /**
	    * @class User.Register
	    */
	    can.Control('User.Register',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            this.element.find('[data-toggle=switch]').parent().bootstrapSwitch();
	            new Core.Popover(this.element, { triggerObj: 'input[type=text]' });
	            new Core.Popover(this.element, { triggerObj: 'input[type=password]' });
	        },
	        'submit': function (el, ev) {
	            ev.preventDefault();
	            var _this = this;
	            new Register(el.serializeObject()).save(function (register) {
	                alert('You are now registered.')
	            });
	        }

	    });

	});