//steal/js garbo/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('garbo/scripts/build.html',{to: 'garbo'});
});
