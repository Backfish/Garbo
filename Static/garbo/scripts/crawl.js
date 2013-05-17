// load('garbo/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("garbo/garbo.html","garbo/out")
});
