steal('jquery', 'can', 'can/construct/super')
	.then('core/form', function ($) {

	    /**
	    * @class User.Personaldetails
	    */
	    Core.Form('User.Personaldetails',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            var _this = this;
	            $.ajax({
	                type: "POST",
	                url: '/api/api/playerInfo/getPlayerInfo',
	                contentType: "application/json; charset=utf-8",
	                dataType: "json",
	                statusCode: {
	                    200: function (data) {
	                        //TODO. Make as an observer instead. ejs-powered.
	                        _this.element.find('#Email').val(data.Email);
	                        _this.element.find('#FirstName').val(data.FirstName);
	                        _this.element.find('#LastName').val(data.LastName);
	                        _this.element.find('#CountryCode').val(data.CountryCode);
	                        _this.element.find('#Address').val(data.Address);
	                        _this.element.find('#ZipCode').val(data.ZipCode);
	                        _this.element.find('#City').val(data.City);
	                        _this.element.find('#PhoneSuffix').val(data.PhoneSuffix);
	                        _this.element.find('#Phone').val(data.Phone);
	                    }
	                },
	                error: function () { alert('General error'); },
	                complete: function () { }
	            });
	            this._super();
	        },
	        update: function () {
	            this._super();
	        },
	        "submit": function (el, ev) {
	            ev.preventDefault();
	            this._super(el, ev);
	        },
	        success: function (msg) {
	            new Core.Notification('', { state: 'success', title: 'Tu perfil ha sido actualizado.' });
	        }
	    });

	});