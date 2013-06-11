steal('can', function (can) {
    /**
	 * @constructor gb/models/login
	 * @alias Login
	 * @parent gb
	 * @inherits can.Model
	 *
	 * Wraps backend login services.
	 */
	return can.Model(
	/* @static */
	{
		/**
 		 * Create a login
		 */
	    create: "POST //172.17.100.150/api/login"
	},
	/* @Prototype */
	{});
});