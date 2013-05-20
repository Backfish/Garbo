steal('funcunit').then(function(){

    module("Core.Notification", { 
	setup: function(){
	    S.open("//core/Notification/Notification.html");
	}
});

test("Text Test", function(){
    equals(S("h1").text(), "Core.Notification Demo", "demo text");
});


});