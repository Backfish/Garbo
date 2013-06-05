steal( "./personaldetail.js", 
	   "funcunit/qunit", 
	   "gb/models/fixtures", 
	   function( Personaldetail ){
	   	
	module("gb/models/personaldetail");
	
	test("findAll", function(){
		expect(4);
		stop();
		Personaldetail.findAll({}, function(personaldetails){
			ok(personaldetails, "findAll provides an object")
	        ok(personaldetails.length, "findAll provides something array-like")
	        ok(personaldetails[0].name, "findAll provides an object with a name")
	        ok(personaldetails[0].description, "findAll provides an object with a description")
			start();
		});
	});
	
	test("create", function(){
		expect(3)
		stop();
		new Personaldetail({name: "dry cleaning", description: "take to street corner"}).save(function(personaldetail) {
			ok(personaldetail, "save provides an object");
			ok(personaldetail.id, "save provides and object with an id");
			equals(personaldetail.name,"dry cleaning", "save provides an objec with a name")
			personaldetail.destroy()
			start();
		});
	});

	test("update" , function(){
		expect(2);
		stop();
		new Personaldetail({name: "cook dinner", description: "chicken"}).save(function(personaldetail) {
			equals(personaldetail.description,"chicken", "save creates with description");
			personaldetail.attr({description: "steak"}).save(function(personaldetail){
				equals(personaldetail.description,"steak", "save udpates with description");
				personaldetail.destroy();
				start();
			});
        });
	});

	test("destroy", function(){
		expect(1);
		stop();
		new Personaldetail({name: "mow grass", description: "use riding mower"}).destroy(function(personaldetail) {
			ok( true ,"Destroy called" )
			start();
		});
	});
});