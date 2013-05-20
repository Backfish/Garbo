steal('jquery', 'can/control')
	.then(function ($) {

	    /**
	    * @class Gb.User.Logout
	    */
	    can.Control('Gb.User.Logout',
	        /** @Static */
	        {
	            defaults: { }
	        },
	        /** @Prototype */
	        {
	            init: function() {
	                var _this = this;
	                new Core.Modal('', { href: '/account/Logout/', headerText: "Logout", width: 500 });
	                $.ajax({
	                    type: "POST",
	                    url: '/api/api/Security/logoff',
	                    contentType: "application/json; charset=utf-8",
	                    dataType: "json",
	                    statusCode: {
	                        200: function(data) {
	                            _this.successCallback();
	                        }
	                    },
	                    error: function() {
	                    },
	                    complete: function() {
	                    }
	                });
	            },
	            successCallback: function() {
	                $(document.documentElement).trigger('user:logout');
	                $(document.body).removeClass('logged-in').addClass('logged-out');
	            }
	        });

	});