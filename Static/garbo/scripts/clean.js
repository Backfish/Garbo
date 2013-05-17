//steal/js garbo/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('garbo/garbo.html',{indent_size: 1, indent_char: '\t'});
});
