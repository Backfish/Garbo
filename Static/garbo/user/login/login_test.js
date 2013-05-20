steal('funcunit').then(function(){

module("Gb.User.GetUserData", { 
	setup: function(){
		S.open("//gb/user/Login/Login.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Gb.User.GetUserData Demo","demo text");
});


});