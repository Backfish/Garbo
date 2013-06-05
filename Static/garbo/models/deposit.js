steal('can', function (can) {
    var store = can.fixture.store(5, function (i) {
        return {
            name: "deposit " + i,
            description: "deposit " + i
        }
    });

    can.fixture({
        'GET /deposits': store.findAll,
        'GET /deposits/{id}': store.findOne
    });
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