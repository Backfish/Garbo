steal( "./register.js", 
	   "funcunit/qunit", 
	   "gb/models/fixtures", 
	   function( Register ){
	   	
	module("gb/models/register");
	
	test("findAll", function(){
		expect(4);
		stop();
		Register.findAll({}, function(registers){
			ok(registers, "findAll provides an object")
	        ok(registers.length, "findAll provides something array-like")
	        ok(registers[0].name, "findAll provides an object with a name")
	        ok(registers[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Register({name: "dry cleaning", description: "take to street corner"}).save(function(register) {
			ok(register, "save provides an object");
			ok(register.id, "save provides and object with an id");
			equals(register.name,"dry cleaning", "save provides an objec with a name")
			register.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Register({name: "cook dinner", description: "chicken"}).save(function(register) {
			equals(register.description,"chicken", "save creates with description");
			register.attr({description: "steak"}).save(function(register){
				equals(register.description,"steak", "save udpates with description");
				register.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Register({name: "mow grass", description: "use riding mower"}).destroy(function(register) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});