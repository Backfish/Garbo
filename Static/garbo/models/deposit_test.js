steal( "./deposit.js", 
	   "funcunit/qunit", 
	   "gb/models/fixtures", 
	   function( Deposit ){
	   	
	module("gb/models/deposit");
	
	test("findAll", function(){
		expect(4);
		stop();
		Deposit.findAll({}, function(deposits){
			ok(deposits, "findAll provides an object")
	        ok(deposits.length, "findAll provides something array-like")
	        ok(deposits[0].name, "findAll provides an object with a name")
	        ok(deposits[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Deposit({name: "dry cleaning", description: "take to street corner"}).save(function(deposit) {
			ok(deposit, "save provides an object");
			ok(deposit.id, "save provides and object with an id");
			equals(deposit.name,"dry cleaning", "save provides an objec with a name")
			deposit.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Deposit({name: "cook dinner", description: "chicken"}).save(function(deposit) {
			equals(deposit.description,"chicken", "save creates with description");
			deposit.attr({description: "steak"}).save(function(deposit){
				equals(deposit.description,"steak", "save udpates with description");
				deposit.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Deposit({name: "mow grass", description: "use riding mower"}).destroy(function(deposit) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});