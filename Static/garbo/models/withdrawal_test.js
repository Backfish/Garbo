steal( "./withdrawal.js", 
	   "funcunit/qunit", 
	   "gb/models/fixtures", 
	   function( Withdrawal ){
	   	
	module("gb/models/withdrawal");
	
	test("findAll", function(){
		expect(4);
		stop();
		Withdrawal.findAll({}, function(withdrawals){
			ok(withdrawals, "findAll provides an object")
	        ok(withdrawals.length, "findAll provides something array-like")
	        ok(withdrawals[0].name, "findAll provides an object with a name")
	        ok(withdrawals[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Withdrawal({name: "dry cleaning", description: "take to street corner"}).save(function(withdrawal) {
			ok(withdrawal, "save provides an object");
			ok(withdrawal.id, "save provides and object with an id");
			equals(withdrawal.name,"dry cleaning", "save provides an objec with a name")
			withdrawal.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Withdrawal({name: "cook dinner", description: "chicken"}).save(function(withdrawal) {
			equals(withdrawal.description,"chicken", "save creates with description");
			withdrawal.attr({description: "steak"}).save(function(withdrawal){
				equals(withdrawal.description,"steak", "save udpates with description");
				withdrawal.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Withdrawal({name: "mow grass", description: "use riding mower"}).destroy(function(withdrawal) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});