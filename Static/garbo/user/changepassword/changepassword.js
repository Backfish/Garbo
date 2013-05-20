steal('jquery', 'can', 'can/construct/super')
	.then('core/form', function ($) {

	    /**
	    * @class User.Changepassword
	    */
	    Core.Form('User.Changepassword',
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
	            new Core.Notification('', { state: 'success', title: 'Your password is updated.' });
	        }
	    });

	});