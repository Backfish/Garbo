steal('funcunit').then(function(){

module("Gb.User.CloseSessions", { 
	setup: function(){
		S.open("//gb/user/logout/logout.html");
	}
});

test("Text Test", function(){
	equals(S("h1").text(), "Gb.User.CloseSessions Demo","demo text");
});


});