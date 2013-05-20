steal('funcunit').then(function(){

module("Gb.User.Register", { 
	setup: function(){
		S.open("//gb/user/register/register.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Gb.User.Register Demo","demo text");
});


});