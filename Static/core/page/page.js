steal('can', 'jquery', function (can, $) {

	    /**
	    * @class Core.Page
	    */
	    can.Control("Core.Page",
	        /* @static */
	        {
	            defaults: {
	                active: false,
	                activeItem: false,
	                data: null,
	                headerText: null,
	                timer: null,
	                loader: null
	            }
	        },
	        {
	            setup: function(el, options) {
	                options = $.extend(this.constructor.defaults, options || {});
	                var newEl = el;
	                this.oldElement = $("#page");
	                if (el == '') {
	                    newEl = $('<div class="page" data-destroy="true" style="display:none;"></div>');
	                    this.oldElement.prepend(newEl);
	                }
	                can.Control.prototype.setup.call(this, newEl, options);
	            },
	            init: function() {
	                if (this.element.data('background') != null && this.element.data('background') != '') {
	                    this.element.css('background-image', 'url(' + this.element.data('background') + ')');
	                    this.element.css('min-height', $(window).height() + 'px');
	                }
	                this.show();
	            },
	            update: function(options) {
	                can.extend(this.options, options);
	                this.on();
	                this.show();
	            },
	            setActive: function() {
	            },
	            setInactive: function() {
	            },
	            bindListeners: function() {
	                $(document.documentElement).trigger('page.loaded');
	                new Core.Page.Listener(this.element, { obj: this });
	            },
	            show: function(callback) {
	                $('body,html').animate({ scrollTop: 0 }, 500);

	                if (typeof callback == 'function') {
	                    callback.call();
	                }
	                if (this.element.css('display') != 'block') {
	                    this.options.loader = new Core.Loader('body', { delay: 500, className: 'spinningSection' });
	                }

	                $(document.documentElement).trigger('page.animationstart');
	                this.setActive();
	                this.bindListeners();
	                var _this = this;
	                this.timer = setTimeout(function() {
	                    if (_this.element.css('display') == 'none') {
	                        TweenLite.from(_this.element, 2, {
	                            onStart: function() { _this.element.css({ display: "block", opacity: 1 }) },
	                            css: { height: 0, top: $(window).height() + 'px' },
	                            ease: Strong.easeOut,
	                            overwrite: "auto",
	                            onComplete: function () {
	                                if (_this.options.data != null) {
	                                    _this.element.html(_this.options.data);
	                                }
	                                $(document.documentElement).trigger('page.animationfinished');
	                            }
	                        });
	                    }
	                }, 1500);
	            },
	            "{document.documentElement} page.animationfinished": function() {
	                try {
	                    if (this.options.loader != null) {
	                        this.options.loader.remove();
	                        this.options.loader = null;
	                    }
	                } catch(err) {
	                }

	            },
	            hide: function(sDirection, callback) {
	                this.setInactive();
	                clearTimeout(this.timer);
	                var _this = this;
	                this.element.css({position:'absolute',zIndex:0,width:'100%'}).animate({ opacity: 0.6 }, 2800, function() {
	                    _this.element.css({position:'relative',zIndex:1,width:'auto'}).hide();
	                    _this.options.activeItem = false;
	                    if (_this.element.data('destroy')) {
	                        _this.element.remove();
	                    } else {
	                        //_this.destroy();
	                    }
	                });
	            }
	        });

	    /**
	    * Creates.
	    * 
	    * @tag controllers, home
	    */
	    can.Control("Core.Page.Listener",
	        /* @static */
	        {
	            defaults: {
	                
	            }
	        },
	        {
	            init: function() {

	            },
	            "{document.documentElement} page.animationstart": function() {
	                this.hide();
	            },
	            update: function() {

	            },
	            setInactive: function() {
	                this.options.obj.setInactive();
	            },
	            setActive: function() {
	                this.options.obj.setActive();
	            },
	            hide: function() {
	                this.options.obj.hide();
	                this.destroy();
	            },
	            destroy: function() {
	                this.options.obj.setInactive();
	                can.Control.prototype.destroy.call(this);
	            }
	        });

	});