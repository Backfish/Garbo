steal( "./game.js", 
	   "funcunit/qunit", 
	   "gb/models/fixtures", 
	   function( Game ){
	   	
	module("gb/models/game");
	
	test("findAll", function(){
		expect(4);
		stop();
		Game.findAll({}, function(games){
			ok(games, "findAll provides an object")
	        ok(games.length, "findAll provides something array-like")
	        ok(games[0].name, "findAll provides an object with a name")
	        ok(games[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Game({name: "dry cleaning", description: "take to street corner"}).save(function(game) {
			ok(game, "save provides an object");
			ok(game.id, "save provides and object with an id");
			equals(game.name,"dry cleaning", "save provides an objec with a name")
			game.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Game({name: "cook dinner", description: "chicken"}).save(function(game) {
			equals(game.description,"chicken", "save creates with description");
			game.attr({description: "steak"}).save(function(game){
				equals(game.description,"steak", "save udpates with description");
				game.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Game({name: "mow grass", description: "use riding mower"}).destroy(function(game) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});