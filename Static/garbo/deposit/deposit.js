steal('can', 'jquery', 'garbo/models/deposit.js', './init.ejs', 'steal/less', function (can, $, Deposit, depositView) {

	    /**
	    * @class Gb.Deposit
	    */
	    can.Control('Gb.Deposit',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	    {
	        init: function () {
	            var _this = this;
	            Deposit.findAll({}, function (deposit) {
	                _this.element.html(depositView(deposit));
	            });
	        }
	    });
	});