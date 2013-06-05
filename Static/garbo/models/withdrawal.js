steal('can', function (can) {
    var store = can.fixture.store(5, function (i) {
        return {
            name: "withdrawal " + i,
            description: "withdrawal " + i
        }
    });

    can.fixture({
        'GET /withdrawals': store.findAll,
        'GET /withdrawals/{id}': store.findOne
    });
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