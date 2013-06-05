steal('can', function (can) {
	/**
	 * @constructor gb/models/game
	 * @alias Game
	 * @parent gb
	 * @inherits can.Model
	 *
	 * Wraps backend game services.
	 */
	return can.Model(
	/* @static */
	{
		/**
 		 * Find all games
		 */
		findAll : "GET /games",
		/**
 		 * Find one game
		 */
		findOne : "GET /games/{id}"
		
	},
	/* @Prototype */
	{});
});