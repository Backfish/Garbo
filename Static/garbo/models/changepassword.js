steal('can', function (can) {
	/**
	 * @constructor gb/models/changepassword
	 * @alias Changepassword
	 * @parent gb
	 * @inherits can.Model
	 *
	 * Wraps backend changepassword services.
	 */
	return can.Model(
	/* @static */
	{
		/**
		 * Update a changepassword
		 */
		create : "POST /changepassword"
	},
	/* @Prototype */
	{});
});