steal('jquery', 'can', 'can/construct/super')
	.then('core/form', function ($) {

	    /**
	    * @class Gb.User.Register.Partone
	    */
	    Core.Form('Register.Parttwo',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            this._super();
	        },
	        update: function () {
	            this._super();
	        },
	        "submit": function (el, ev) {
	            ev.preventDefault();
	            var year = this.element.find('#year').val();
	            var m = this.element.find('#month').val();
	            var month = (m != '' && parseInt(m, 0) < 10) ? '0' + m : m;
	            var d = this.element.find('#day').val();
	            var day = (d != '' && parseInt(d, 0) < 10) ? '0' + d : d;
	            var birthdate = year + '-' + month + '-' + day;
	            this.element.find('input[name=BirthDate]').val(birthdate);
	            this._super(el, ev);
	        }

	    });

	});