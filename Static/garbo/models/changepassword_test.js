steal( "./changepassword.js", 
	   "funcunit/qunit", 
	   "gb/models/fixtures", 
	   function( Changepassword ){
	   	
	module("gb/models/changepassword");
	
	test("findAll", function(){
		expect(4);
		stop();
		Changepassword.findAll({}, function(changepasswords){
			ok(changepasswords, "findAll provides an object")
	        ok(changepasswords.length, "findAll provides something array-like")
	        ok(changepasswords[0].name, "findAll provides an object with a name")
	        ok(changepasswords[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Changepassword({name: "dry cleaning", description: "take to street corner"}).save(function(changepassword) {
			ok(changepassword, "save provides an object");
			ok(changepassword.id, "save provides and object with an id");
			equals(changepassword.name,"dry cleaning", "save provides an objec with a name")
			changepassword.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Changepassword({name: "cook dinner", description: "chicken"}).save(function(changepassword) {
			equals(changepassword.description,"chicken", "save creates with description");
			changepassword.attr({description: "steak"}).save(function(changepassword){
				equals(changepassword.description,"steak", "save udpates with description");
				changepassword.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Changepassword({name: "mow grass", description: "use riding mower"}).destroy(function(changepassword) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});