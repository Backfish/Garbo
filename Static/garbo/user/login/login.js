steal('can', 'jquery', 'can/construct/super','core/form', function (can, $) {

	    /**
	    * @class User.Login
	    */
	    Core.Form('User.Login',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            this._super();
	        },
	        "{document.documentElement} user:login": function () { this.loggedIn(); },
	        "{document.documentElement} modal.animation.finished": function () {
	            try {
	                this.element.find('[type=text]:first').focus();
	            } catch (err) {
	            }
	        },
	        success: function (data) {
	            this.element.closest('.core_modal').find('.close').trigger('click');
	            if ($('#LangCountry').val() == data.LangCountry) {
	                $('#navUsername').html(data.PlayerName);
	                $(document.documentElement).trigger('user:login');
	            } else {
	                //Reload the page with the users registered LangCountry.
	                location.href='/?Lang='+data.LangCountry;
	            }
	        },
	        loggedIn: function () {
	            $(document.body).removeClass('logged-out').addClass('logged-in');
	        },
	        ".lnkForgottenPassword click": function (el, ev) {
	            ev.preventDefault();
	            location.hash = '#!forgottenpassword';
	        }
	    });

	});