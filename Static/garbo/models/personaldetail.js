steal('can', function (can) {
	/**
	 * @constructor gb/models/personaldetail
	 * @alias Personaldetail
	 * @parent gb
	 * @inherits can.Model
	 *
	 * Wraps backend personaldetail services.
	 */
	return can.Model(
	/* @static */
	{
		/**
 		 * Find one personaldetail
		 */
		findOne : "GET /personaldetails/{id}",
		/**
		 * Update a personaldetail
		 */
		update : "PUT /personaldetails/{id}"
		
	},
	/* @Prototype */
	{});
});