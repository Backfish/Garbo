steal('can', 'jquery', 'steal/less','resources/iscroll.js', 'resources/jquery.isotope.js', './casino.less', function (can,$) {

	    /**
	    * @class Gb.Casino
	    */
	    can.Control('Gb.Casino',
	    /** @Static */
	        {
	        defaults: {
	            
	        }
	    },
	    /** @Prototype */
	    {
	        init: function() {
	            //Get all games with json
	            //Connect to ejs with can-view
	            //Call makeIsotope
	            var _this = this;
	            for (var i = 0; i <= 32; i++) {
	                e = $('<div />', {
	                    id: 'game-' + i,
	                    'class': 'game',
	                    css: {
	                        'background-color': (i === 0 ? 'transparent' : (i % 2 === 0 ? '#fff' : _this.get_random_color()))
	                    }
	                }).appendTo(_this.element.find('.games'));
	            }
	            this.makeIsotope();
	            new iScroll(this.element.attr('id'));

	        },
	        get_random_color: function () { //Temporary function to be removed later.
	            var letters = '0123456789ABCDEF'.split('');
	            var color = '#';
	            for (var i = 0; i < 6; i++) {
	                color += letters[Math.round(Math.random() * 15)];
	            }
	            return color;
	        },
	        "{window} resize": function () {
	            
	        },
	        makeIsotope: function () {
	            var _this = this;
	            var games = this.element.find('.games');
	            this.element.find('.game').css({ width: (games.height() / 3) * 1.5 + 'px', height: (games.height() / 3) + 'px' });
	            games.isotope({
	                resizable: false,
	                itemSelector: '.game',
	                layoutMode: 'cellsByColumn',
	                cellsByColumn: {
	                    columnWidth: (games.height() / 3) * 1.5,
	                    rowHeight: games.height() / 3
	                },
	                onLayout: function ($elems, instance) {
	                    console.log(this.height());
	                }
	            }).parent().width(games.width());

	            $(window).smartresize(function () {
	                _this.element.find('.game').css({ width: (games.height() / 3) * 1.5 + 'px', height: (games.height() / 3) + 'px' });
	                games.isotope({
	                    cellsByColumn: {
	                        columnWidth: (games.height() / 3) * 1.5,
	                        rowHeight: games.height() / 3
	                    }
	                }).parent().width(games.width());
	            });
	        }

	    });

	});