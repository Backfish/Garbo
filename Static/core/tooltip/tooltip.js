steal('can', 'jquery', 'can/construct/super',function (can,$) {

	    /**
	    * @class Core.Tooltip
	    * Uses less-file from twitter bootstrap (sourced in via tt/less/bootstrap.less)
	    */
	    can.Control('Core.Tooltip',
	    /** @Static */
	    {
	    defaults: {
	        tooltipEl: null,
	        triggerObj: '',
	        showEvent: 'mouseenter',
	        hideEvent: 'mouseleave'
	    }
	},
	/** @Prototype */
	    {
	    init: function () {

	    },
	    '{triggerObj} {showEvent}': function (el, ev) {
	        var _this = this;
	        var pos = $.extend({}, (el.offset()), { width: el[0].offsetWidth, height: el[0].offsetHeight });

	        $tooltipEl = $('<div class="tooltip ' + el.data('placement') + '">' +
	                               '<div class="tooltip-arrow"></div>' +
	                               '<div class="tooltip-inner">' + el.data('title') + '</div>' +
	                           '</div>');

	        $(document.body).append($tooltipEl); //Add the element to the body
	        $tooltipEl.show(); //Show the created element. Should have opacity 0 however. And later be animated.

	        var actualWidth = $tooltipEl[0].offsetWidth; //We need to have it shown to be able to calculate width and height
	        var actualHeight = $tooltipEl[0].offsetHeight;

	        var tp = { top: 0, left: 0 };
	        switch (el.data('placement')) {
	            //Position depending on placement               
	            case 'bottom':
	                tp = { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 };
	                break;
	            case 'top':
	                tp = { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 };
	                break;
	            case 'left':
	                tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth };
	                break;
	            case 'right':
	                tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width };
	                break;
	        }
	        //Checks if the tooltip will be cut (shown outside of viewport)
	        //TODO. Add checks if popover is not shown at bottom or right.
	        //Need to handle a move of arrow.
	        tp.top = tp.top < 0 ? 0 : tp.top;
	        tp.left = tp.left < 0 ? 0 : tp.left;

	        $tooltipEl.css(tp).animate({ opacity: 1 }); //Add correct position
	        this.options.tooltipEl = $tooltipEl;
	    },
	    '{triggerObj} {hideEvent}': function (el, ev) {
	        try { this.options.tooltipEl.remove(); }
	        catch (err) { }
	    },
	    destroy: function () {
	        try { this.options.tooltipEl.remove(); }
	        catch (err) { }
	        this._super();
	    }
	});

});