steal('can', 'jquery', 'can/construct/super','core/form', function (can, $) {
        /**
	    * @class User.Login
	    */
	    Core.Form('User.Login',
	    /** @Static */
	        {
	        defaults: {
	            active: false,
	            url: '/login'
	        }
	    },
	    /** @Prototype */
	    {
	        init: function() {
	            this.element.show();
	            this.options.active = true;
	            this.element.find('[type=text]:first').focus();
	            this._super();
	        },
	        '{document} click': function(el, ev) {
	            // hide only if we clicked outside the login-form
	            if (this.options.active && !this.element.has(ev.target).length) {
	                this.hide();
	            }
	        },
	        "{document.documentElement} user:login": function() { this.loggedIn(); },
	        success: function (data) {
	            State.attr('Loggedin', true);
	            this.hide();
	        },
	        hide: function() {
	            this.options.active = false;
	            this.element.hide();
	            this.destroy();
	        },
	        '{State} Loggedin': function () {
	            $(document.body).removeClass('logged-out').addClass('logged-in');
	        },
	        ".link-forgotten-password click": function (el, ev) {
	            ev.preventDefault();
	            location.hash = '#!forgottenpassword';
	        }
	        });
});
