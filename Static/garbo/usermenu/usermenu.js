steal('can', 'jquery', function (can,$) {
        
	    /**
	    * @class Gb.Usermenu
	    */
	    can.Control('Gb.Usermenu',
	    /** @Static */
	        {
	            defaults: {
                    login: null
	            }
	        },
	    /** @Prototype */
	    {
	        init: function () {

	        },
	        '.user-login click': function (el, ev) {
	            ev.preventDefault();
	            ev.stopPropagation()
	            new User.Login('.login-form');
	        }
	    });

	});