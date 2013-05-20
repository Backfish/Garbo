steal('jquery', 'can', 'can/construct/super', 'steal/less', 'can/observe')
	.then('./game.less', './views/game.ejs', function ($) {

	    /**
	    * @class Gb.Games
	    */
	    can.Control('Gb.Game',
	    /** @Static */
	        {
	        defaults: {
	            IsReal: $(document.body).hasClass('logged-in') ? true : false,
	            Width: 800,
	            Height: 600,
	            loaded: false,
	            backdrop: null,
	            USD: false
	        }
	    },
	    /** @Prototype */
	        {
	        setup: function (el, options) {
	            try {
	                $('#game-holder').remove(); //Should probably be done smoother.
	            } catch (err) {
	            }
	            options = $.extend(this.constructor.defaults, options || {});
	            var newEl = el;
	            this.oldElement = $(document.body);
	            newEl = $('<div id="game-holder"></div>');
	            this.oldElement.prepend(newEl);
	            this._super(newEl, options);
	        },
	        init: function () {
	            this.options.USD = $('.balance').eq(0).html().indexOf('US') > -1 ? true : false;
	            this.startGame();
	        },
	        "{can.route} change": function (ev, attr, how, newVal, oldVal) {
	            //Killing off the active modal when route changes.
	            try {
	                this.closeGame();
	            } catch (err) {
	            }
	        },
	        "{document.documentElement} user:login": function () {
	            this.options.IsReal = true;
	            this.startGame();
	        },
	        "{document.documentElement} user:logout": function () {
	            this.options.IsReal = false;
	            this.closeGame();
	        },
	        "{window} resize": function () {
	            var size = this.getSize();
	            this.element.find('.modal').css({ height: size.Height + 'px', width: (size.Width + 200) + 'px' });
	            this.element.find('#ifrGame').css({ height: size.Height + 'px', width: size.Width + 'px' });
	        },
	        ".btn-play-for-real click": function (el, ev) {
	            ev.preventDefault();
	            this.options.IsReal = true;
	            this.startGame();
	        },
	        startGame: function () {
	            var _this = this;
	            var removeClass = !this.options.IsReal ? 'play-for-real' : "play-for-fun";
	            var addClass = this.options.IsReal ? 'play-for-real' : "play-for-fun";
	            this.element.removeClass(removeClass);
	            this.element.addClass(addClass);

	            if (this.options.backdrop == null) {
	                this.options.backdrop = $('<div class="game-backdrop" />').css({ visibility: 'hidden' }).appendTo(_this.element);
	                TweenLite.to(this.options.backdrop, 0.3, { css: { autoAlpha: 0.8 }, ease: Strong.easeIn });
	            }
	            //if (this.options.IsReal && !this.options.USD) {
	            //    new Core.Notification('', { state: 'warning', title: 'Ya que nuestro casino funciona en dólares, tu dinero se cambiará a dólares a un tipo de cambio fijo. Cuando salgas del casino tu saldo se cambiará a tu moneda local con la misma tasa fija. Tu saldo no se verá afectado. Si tuvieras preguntas al respecto, no dudes en contactarnos.' });
	            //}
	            $.ajax({
	                type: "POST",
	                url: 'api/api/CasinoGameOpener/GetCasinoGameData',
	                contentType: "application/json; charset=utf-8",
	                data: JSON.stringify({ GameId: parseInt(_this.options.GameId), IsReal: _this.options.IsReal }),
	                dataType: "json",
	                statusCode: {
	                    200: function (data) {
	                        _this.options.Width = data.Width;
	                        _this.options.Height = data.Height;
	                        var size = _this.getSize();
	                        _this.options.loaded = true;
	                        try {
	                            _this.element.find('.modal').remove();
	                        } catch(err) {
	                        }
	                        _this.element.append(can.view('//gb/game/views/game.ejs', { game: data, size: size }));
	                        var $modal = _this.element.find('.modal');
	                        _this.element.find('.modal').css({ height: size.Height + 'px', width: (size.Width + 200) + 'px' });
	                        _this.element.find('#ifrGame').css({ height: size.Height + 'px', width: size.Width + 'px' });
	                        TweenLite.to($modal, 1, { css: { top: '0px' }, ease: Strong.easeIn });
	                        try {
	                            var mode = _this.options.IsReal ? 'real' : 'fun';
	                            _gaq.push(['_trackPageview', '/game/' + mode + '/' + data.Name]);
	                        } catch (err) {
	                        }
	                    }
	                },
	                error: function () { },
	                complete: function () {
	                }
	            });
	        },
	        getSize: function (w, h) {
	            var gameHeight = $(window).height() - 60;
	            var ratio = this.options.Width / this.options.Height;
	            var size = { Width: parseInt(gameHeight * ratio), Height: gameHeight };
	            return size;
	        },
	        '.close click': function (el, ev) {
	            ev.preventDefault();
	            if (Routing.getSection != null) {
	                location.hash = '#!' + Routing.getSection();
	            } else {
	                location.hash = '#!';
	            }
	        },
	        closeGame: function () {
	            var _this = this;
	            if (this.options.loaded || location.hash == '#!logout') {
	                TweenLite.to(this.options.backdrop, 0.3, { css: { autoAlpha: 0 }, ease: Strong.easeIn });
	                TweenLite.to(this.element.find('.modal'), 0.5, { css: { top: '-=1000px' }, ease: Strong.easeIn, overwrite: 'none', onComplete: function () {
	                    try {
	                        _this.element.remove();
	                    } catch (err) {
	                    }
	                }
	                });
	                $(document.documentElement).trigger('game.closed', {});
	            }
	        }
	    });

	});