steal('can', 'jquery', 'can/construct/super', 'can/construct/proxy',function (can, $) {

	    /**
	    * @class Core.Popover
	    * Uses less-file from twitter bootstrap (sourced in via tt/less/bootstrap.less)
	    */
	    can.Control('Core.Popover',
	    /** @Static */
	    {

	    defaults: {
	        triggerObj: '',
	        showEvent: 'focus',
	        hideEvent: 'blur',
	        stack: []
	    }
	},
	/** @Prototype */
	    {
	    init: function () {

	    },
	    '{triggerObj} {showEvent}': function (el, ev) {
	        this.show(el);

	    },
	    '{triggerObj} {hideEvent}': function (el, ev) {
	        this.hide(el);
	    },
	    show: function (el) {
	        this.hide(el);
	        if (el.data('content') != null) {
	            var _this = this;
	            var pos = $.extend({}, (el.offset()), { width: el[0].offsetWidth, height: el[0].offsetHeight });
	            var title = '';
	            if (el.data('title') != null && el.data('title') != '') {
	                title = '<h3 class="popover-title">' + el.data('title') + '</h3>'
	            }

	            var error = (el.data('error') != null && el.data('error') != '') ? '<p style="color:red;">' + el.data('error') + '</p>' : '';
	            $popoverEl = $('<div id="popover-' + el.prop('id') + '" class="popover ' + el.data('placement') + '">' +
	                                   '<div class="arrow"></div>' +
	                                   '<div class="popover-inner">' +
	                                        title +
	                                       '<div class="popover-content">' +
	                                           '<p>' + el.data('content') + '</p>' + error +
	                                       '</div>' +
	                                   '</div>' +
	                               '</div>');

	            $(document.body).append($popoverEl); //Add the element to the body
	            $popoverEl.show(); //Show the created element. Should have opacity 0 however. And later be animated.

	            var actualWidth = $popoverEl[0].offsetWidth; //We need to have it shown to be able to calculate width and height
	            var actualHeight = $popoverEl[0].offsetHeight;

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
	            //Checks if the popover will be cut (shown outside of viewport)
	            //TODO. Add checks if popover is not shown at bottom or right.
	            //Need to handle a move of arrow.
	            tp.top = tp.top < 0 ? 0 : tp.top;
	            tp.left = tp.left < 0 ? 0 : tp.left;

	            $popoverEl.css(tp); //Add correct position
	            if ($.inArray(el.prop('id'), _this.options.stack) == -1) {
	                this.options.stack.unshift(el.prop('id'));
	            }
	        }
	    },
	    hide: function (el) {
	        try {
	            $('#popover-' + el.prop('id')).remove();
	            this.options.stack.splice(el.prop('id'), 1);
	        }
	        catch (err) { }
	    },
	    destroy: function () {
	        //Remove all popovers connected to this element.
	        var _this = this;
	        $.each(
	            _this.options.stack,
	            function (intIndex, objValue) {
	                try {
	                    $('#popover-' + objValue).remove();
	                    _this.options.stack.splice(objValue, 1);
	                }
	                catch (err) { }
	            }
	        );
	        this._super();
	    }
	});

});