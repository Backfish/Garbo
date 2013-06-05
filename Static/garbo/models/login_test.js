steal( "./login.js", 
	   "funcunit/qunit", 
	   "gb/models/fixtures", 
	   function( Login ){
	   	
	module("gb/models/login");
	
	test("findAll", function(){
		expect(4);
		stop();
		Login.findAll({}, function(logins){
			ok(logins, "findAll provides an object")
	        ok(logins.length, "findAll provides something array-like")
	        ok(logins[0].name, "findAll provides an object with a name")
	        ok(logins[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Login({name: "dry cleaning", description: "take to street corner"}).save(function(login) {
			ok(login, "save provides an object");
			ok(login.id, "save provides and object with an id");
			equals(login.name,"dry cleaning", "save provides an objec with a name")
			login.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Login({name: "cook dinner", description: "chicken"}).save(function(login) {
			equals(login.description,"chicken", "save creates with description");
			login.attr({description: "steak"}).save(function(login){
				equals(login.description,"steak", "save udpates with description");
				login.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Login({name: "mow grass", description: "use riding mower"}).destroy(function(login) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});