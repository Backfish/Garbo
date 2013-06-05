steal('can', function (can) {
	/**
	 * @constructor gb/models/register
	 * @alias Register
	 * @parent gb
	 * @inherits can.Model
	 *
	 * Wraps backend register services.
	 */
	return can.Model(
	/* @static */
	{

		/**
 		 * Create a register
		 */
		create : "POST /register"
		
	},
	/* @Prototype */
	{});
});