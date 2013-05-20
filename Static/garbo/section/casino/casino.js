steal('jquery', 'can', 'steal/less','resources/jshashtable-2.1_src.js')
	.then('resources/jquery.numberformatter-1.2.3.js', './casino.less', './views/games-list-item.ejs','./views/games-list-recommended.ejs','resources/lazy-loader/jquery.lazyload.js', function ($) {

	    /**
	    * @class Gb.Casino
	    */
	    can.Control('Gb.Casino',
	    /** @Static */
	        {
	        defaults: {
	            items: 0
	        }
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            //Get all games.
	            var _this = this;
	            this.setMarginLeft();
	            $.getJSON('api/api/casinogamegroup/GetRecomended', function (data) {
	                _this.element.find('.recommended-games').append(can.view('//gb/section/casino/views/games-list-recommended.ejs', data));
	            });
	            
	            $.getJSON('api/api/casinogamegroup/GetPopular', function (data) {
	                _this.element.find('.popular-games').append(can.view('//gb/section/casino/views/games-list-recommended.ejs', data));
	            });
	            
	            $.getJSON('api/api/casinogamegroup/GetJackpots', function (data) {
	                _this.element.find('.new-games').append(can.view('//gb/section/casino/views/games-list-recommended.ejs', data));
	            });


	            $.getJSON('api/api/casinogame/GetAllGames', function (data) {
	                _this.element.find('.sortable-list').html(can.view('//gb/section/casino/views/games-list-item.ejs', data));
	                _this.makeIsotope();
	                var $images = _this.element.find('.sortable-list .item-img');
	                $images.lazyload({ threshold: 300, failure_limit: Math.max($images.length - 1, 0) });
	            });

	        },
	        "{document.documentElement} page.animationfinished": function () {
	            this.resize();
	        },
	        "{window} resize": function () {
	            this.resize();
	        },
	        resize: function () {
	            this.setMarginLeft();
	        },
	        setMarginLeft: function () {
	            var marginLeft = $(window).width() % 250;
	            if (marginLeft != 0) {
	                this.element.css({ marginLeft: ((marginLeft / 2) - 5) + 'px' });
	            }
	            this.element.css('width', ($(window).width() - marginLeft + 5) + 'px');
	        },
	        showGame: function (obj, index) {
	            var _this = this;
	            setTimeout(function () {
	                var $obj = $(obj);
	                $obj.animateCSS('fadeInUp');
	            }, 250 * index);
	        },
	        makeIsotope: function () {
	            var _this = this;

	            this.element.find('.sortable-list').isotope({
	                getSortData : {
	                    sortOrder: function ($elem) {
	                    return parseInt($elem.data('sortorder'), 10 );
	                    }
	                },
	                item: 'li',
	                itemPositionDataEnabled: true,
	                onLayout: function () {
	                    $(window).trigger("scroll");
	                },
	                sortBy: 'sortOrder'
	            });
	        },
	        ".cat click": function (el, ev) {
	            ev.preventDefault();
	            this.element.find('.recommended-list').hide();
	            this.element.find('.sortable-list').show();
	            el.closest('.games-sort-holder').find('.active').removeClass('active');
	            el.parent().addClass('active');
	            this.element.find('.sortable-list').isotope({ sortBy: 'sortOrder', filter: el.data('cat') });
	            var _this = this;
	            setTimeout(function () {
	                var $images = _this.element.find(el.data('cat') + ' .item-img')
	                $images.lazyload({ threshold: 300, failure_limit: Math.max($images.length - 1, 0) });
	            }, 1000);
	        },
	        ".cat-start click": function (el, ev) {
	            ev.preventDefault();
	            el.closest('.games-sort-holder').find('.active').removeClass('active');
	            el.parent().addClass('active');
	            this.element.find('.sortable-list').hide();
	            this.element.find('.recommended-list').show();
	        },
	        ".games-list-item mouseenter": function (el, ev) {
	            el.find('.game-item-hover').show();
	        },
	        ".games-list-item mouseleave": function (el, ev) {
	            el.find('.game-item-hover').hide();
	        },
	        ".game-link click": function (el, ev) {
	            ev.preventDefault();
	            location.hash = "#!casino/" + el.data('id');
	            //can.route.attr({ type: 'casino', action: el.data('id') });
	        },
	        ".game-link-fun click": function (el, ev) {
	            ev.preventDefault();
	            location.hash = "#!casino/fun/" + el.data('id');
	            //can.route.attr({ type: 'casino', action: 'fun', id: el.data('id') });
	        }

	    });

	});

/*,
".item-list li mouseenter": function (el, ev) {
    $itemAction = $('<div class="item-action"><i class="icon-play-circle icon-white"></i> Play</div>');
    el.append($itemAction);
    $itemAction.stop().animate({ top: '43px' }, 200, 'easeOutQuart');
    el.find('.item-info').stop().animate({ height: '62px' }, 500, 'easeOutQuart');
},
".item-list li mouseleave": function (el, ev) {
    el.find('.item-action').stop().animate({ top: '-40px' }, 200, 'easeOutQuart', function () {
        $(this).remove();
    });
    el.find('.item-info').stop().animate({ height: '30px' }, 200, 'easeOutQuart');
},
".item-list li click": function (el, ev) {
    location.hash = '#!casino/' + el.data('id');
}*/