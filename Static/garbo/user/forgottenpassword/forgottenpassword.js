steal('jquery', 'can', 'can/construct/super')
	.then('core/form', 'core/notification', function ($) {

	    /**
	    * @class Gb.User.Forgottenpassword
	    */
	    Core.Form('Gb.User.Forgottenpassword',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            this._super();
	        },
	        success: function (data) {
	            new Core.Notification('', { title: $('#hidForgottenPasswordMail').val(), state: 'success' });
	        }
	    });

	});