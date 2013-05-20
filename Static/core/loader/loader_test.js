steal('funcunit').then(function(){

module("Core.Loader", { 
	setup: function(){
		S.open("//core/loader/loader.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Core.Loader Demo","demo text");
});


});