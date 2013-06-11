steal('can', function (can) {
    /**
	 * @constructor gb/models/withdrawal
	 * @alias Withdrawal
	 * @parent gb
	 * @inherits can.Model
	 *
	 * Wraps backend withdrawal services.
	 */
	return can.Model(
	/* @static */
	{
		/**
 		 * Find all withdrawals
		 */
		findAll : "GET /withdrawals",
		/**
 		 * Find one withdrawal
		 */
		findOne : "GET /withdrawals/{id}"
	},
	/* @Prototype */
	{});
});