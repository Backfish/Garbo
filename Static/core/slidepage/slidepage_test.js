steal('funcunit').then(function(){

module("Core.Slidepage", { 
	setup: function(){
		S.open("//core/slidepage/slidepage.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Core.Slidepage Demo","demo text");
});


});