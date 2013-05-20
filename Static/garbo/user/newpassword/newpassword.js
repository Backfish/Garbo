steal('jquery', 'can', 'can/construct/super')
	.then('core/form', 'core/notification', function ($) {

	    /**
	    * @class Gb.User.Newpassword
	    */
	    Core.Form('Gb.User.Newpassword',
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
	            this.element.closest('.core_modal').find('.close').trigger('click');
	            new Core.Notification('', { state: 'success', title: 'Your password is updated.' });
	            location.hash = '#!login';
	        }
	    });

	});