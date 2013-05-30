steal('can', 'jquery', 'steal/less', './start.less', function (can,$) {

	    /**
	    * @class Gb.Routing
	    */
	    can.Control('Gb.Start',
	    /** @Static */
	        {
	        defaults: {

	        }
	    },
	    /** @Prototype */
	    {
	        init: function () {
	            this.startAnimation();
	        },
	        '{window} resize':function() {
	            
	        },
	        startAnimation: function () {
	            var tl = new TimelineMax();
	            
	            tl.from($('#page'), 1, { css: { autoAlpha: 0} }, 0.2);
	            tl.to($('#navbar-user'), 1, { css: { top: '0px' }}, 1.2);

	            tl.play();
	        }
	    });

	});