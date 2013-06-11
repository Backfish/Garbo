steal('can', function (can) {
	/**
	 * @constructor gb/models/deposit
	 * @alias Deposit
	 * @parent gb
	 * @inherits can.Model
	 *
	 * Wraps backend deposit services.
	 */
	return can.Model(
	/* @static */
	{
		/**
 		 * Find all deposits
		 */
		findAll : "GET /deposits",
		/**
 		 * Find one deposit
		 */
		findOne : "GET /deposits/{id}"
	},
	/* @Prototype */
	{});
});