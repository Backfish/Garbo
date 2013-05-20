steal('funcunit').then(function(){

module("Core.Page", { 
	setup: function(){
		S.open("//core/page/page.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Core.Page Demo","demo text");
});


});