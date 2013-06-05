steal('can', 'garbo/models/fixtures', function (can) {
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
		create : "POST /login"
	},
	/* @Prototype */
	{});
});