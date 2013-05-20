steal('funcunit').then(function(){

module("Core.Modal", { 
	setup: function(){
		S.open("//core/modal/modal.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Core.Modal Demo","demo text");
});


});