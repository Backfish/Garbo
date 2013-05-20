steal('can', 'jquery', 'steal/less','./notification.less', function (can, $) {

	    /**
	    * @class Core.Notification
	    */
	    can.Control('Core.Notification',
	        /** @Static */
	        {
	            defaults: {
	                
	            }
	        },
	        /** @Prototype */
	        {
	            setup: function(el, options) {
	                options = $.extend(this.constructor.defaults, options || { });
	                this.oldElement = $('body');
	                var newEl = $('<div class="tn-box tn-box-color ' + options.state + '"><p>' + options.title + '</p><div class="tn-progress"></div></div>');
	                this.oldElement.append(newEl);
	                can.Control.prototype.setup.call(this, newEl, options);
	            },
	            init: function() {
	                this.element.addClass('tn-box-active');
	                if (!$('html').hasClass('cssanimations')) {
	                    this.element.css('opacity', 1);
	                }
	                var _this = this;
	                setTimeout(function() {
	                    _this.element.remove();
	                }, 5000);
	            }
	        });

	});