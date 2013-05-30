steal('can', 'jquery','core/loader', 'steal/less','./slidepage.less', function (can, $) {

	    /**
	    * @class Core.Slidepage
	    */
	    can.Control('Core.Slidepage',
	    /** @Static */
	        {
	        defaults: {
	            height: 0,
	            width: 840,
	            fixed: false,
	            href: null,
	            headerText: '',
	            sticky: true,
	            loaded: false
	        }
	    },
	    /** @Prototype */
	        {
	        setup: function (el, options) {
	            options = $.extend(this.constructor.defaults, options || {});
	            this.oldElement = $(document.body);
	            var _header = '<div class="modal-header"><a href="#" class="close">×</a><h3>...</h3></div>';
	            //var newEl = $('<div class="modal"><div class="modal-content" style="display:none;">' + _header + '<div class="modal-body"></div></div></div>').css({ top: -$(window).scrollTop() - 700 + 'px' });
	            var newEl = $('<div class="slide-backdrop"><a href="#" class="close">×</a><div class="modal"><div class="modal-content"><div class="modal-body"></div></div></div></div>');
	            this.oldElement.append(newEl);
	            can.Control.prototype.setup.call(this, newEl, options);
	        },
	        init: function () {
	            $('body').addClass('modal-open');
	            $(document.documentElement).trigger('modal.open');
	            var rightMargin = $('#navbar-user').width();
	            var _this = this;
	            this.modal = this.element.find('.modal');
	            $.get(_this.options.href, function (data) {
	                _this.element.find('.modal-body').append(data);
	                TweenLite.to(_this.element, 1.5, { css: { right: rightMargin + 'px', left: 0 }, ease: Strong.easeOut, delay: 0.3 });
	                TweenLite.to(_this.modal, 1.5, { css: { left: '50%' }, ease: Strong.easeOut, delay: 0.5 });
	                _this.options.loaded = true;
	            });
	            
	            /*var _this = this;
	            this.content = this.element.find('.modal-content');
	            if (!this.options.sticky) {
	                this.backdrop.on('click', function () { _this.element.find('.close').trigger('click'); });
	            }
	            TweenLite.to(this.backdrop, 1, { css: { autoAlpha: 0.8 }, ease: Strong.easeOut });
	            this.body = this.element.find('.modal-body');
	            this.animation();*/

	        },
	        "{can.route} change": function (ev, attr, how, newVal, oldVal) {
	            //Killing off the active modal when route changes.
	            if (this.options.loaded)
	                this.close();
	        },
	        "{document.documentElement} deposit.withdrawal.finished": function () {
	            this.element.find('.close').trigger('click');
	        },
	        animation: function () {
	            var _this = this;
	            this.element.css({ top:'-25%', opacity: 0, display: 'block', 'height': '300px', width: this.options.width + 'px', left: '50%', marginLeft: -this.options.width / 2 + 'px' });
	            TweenLite.to(this.element, 1, {
	                css: { autoAlpha: 1, top: '20px' },
	                ease: Strong.easeOut,
	                onComplete: function () {
	                    _this.loadPage(150);
	                }
	            });
	        },
	        loadPage: function (loaderPos) {
	            var _this = this;
	            this.options.loaded = true;
	            if (this.options.href != null) {
	                //Load modal with ajax
	                var _loader = new Core.Loader(this.element, { delay: 50, desiredPositionType: 'fixed' });
	                $.ajax({
	                    type: "GET",
	                    url: _this.options.href,
	                    success: function (_data) {
	                        _this.body.append(_data);
	                        try {
	                            _this.element.find('.modal-header h3').html(_this.body.find('h1:first').html());
	                        } catch (err) {
	                        }
	                        var h = $(window).height() - 130;
	                        _this.body.css({ 'max-height': h + 'px', 'overflow': 'auto', 'overflow-x': 'hidden' });
	                        
	                        _this.content.fadeIn(800);
	                        TweenLite.to(_this.element, 0.5, { css: { height: _this.content.height() + 'px' }, ease: Strong.easeIn, onComplete: function () {
	                            _this.element.css({ height: '', overflow: '' });
	                            $(document.documentElement).trigger('modal.animation.finished');
	                        }
	                        });
	                    },
	                    error: function () {
	                    },
	                    complete: function () { _loader.remove(); }
	                });
	            }
	        },
	        close: function () {
	            var _this = this;
	            $('body').removeClass('modal-open');
	            TweenLite.to(this.modal, 1.5, { css: { left: '-100%' }, ease: Strong.easeOut });
	            TweenLite.to(this.element, 1.5, { css: { left: '-100%', right: '100%' }, ease: Strong.easeOut, onComplete: function () { _this.remove(); } });

	            $(document.documentElement).trigger('modal.close');
            },
	        remove: function () {
	            try {
	                this.element.remove();
	                this.destroy();
	            } catch (err) {
	            }
	        },
	        ".close click": function (el, ev) {
	            ev.preventDefault();
	            if (Routing.getSection != null && Routing.getSection!='null') {
	                location.hash = '#!' + Routing.getSection();
	            } else {
	                location.hash = '#!';
	            }

	        }
	    });

	});