steal('jquery', 'can', 'can/util', 'steal/less')
	.then('resources/jquery.resize.js','can/control/route','./sportsbook.less', function ($) {

	    /**
	    * @class Gb.Sportsbook
	    */
	    can.Control('Gb.Sportsbook',
	        /** @Static */
	        {
	            defaults: {
	                IsReal: $(document.body).hasClass('logged-in') ? true : false,
	                Mode: '',
	                SportsbookContent: ''
	            }
	        },
	        /** @Prototype */
	        {
	            init: function() {
	                this.options.IsReal = $(document.body).hasClass('logged-in') ? true : false;
	                this.startSportsbook();
	            },
	            "{document.documentElement} user:login": function() {
	                this.options.IsReal = true;
	                this.startSportsbook();
	            },
	            "{document.documentElement} user:logout": function() {
	                this.options.IsReal = false;
	                this.startSportsbook();
	            },
	            '.sb-live click': function(el, ev) {
	                ev.preventDefault();
	                this.options.Mode = '&mode=live';
	                el.closest('ul').find('.active').removeClass('active');
	                el.closest('li').addClass('active');
	                this.startSportsbook();
	            },
	            '.sb click': function(el, ev) {
	                ev.preventDefault();
	                this.options.Mode = '';
	                el.closest('ul').find('.active').removeClass('active');
	                el.closest('li').addClass('active');
	                this.startSportsbook();
	            },
	            startSportsbookOld: function () {
	                var _this = this;
	                $.ajax({
	                    type: "POST",
	                    url: 'api/api/SportsbookUrl/GetSportsBookUrl?isReal=' + _this.options.IsReal,
	                    contentType: "application/json; charset=utf-8",
	                    dataType: "json",
	                    statusCode: {
	                        200: function (data) {
	                            $('#ifrSportsbook').attr('src', data.Url + _this.options.Mode).css('visibility', 'visible');
	                            setTimeout(function () {
	                                $('#ifrSportsbook').css({ height: '2600px' });
	                            }, 10000);
	                        }
	                    },
	                    error: function () { },
	                    complete: function () {
	                    }
	                });
	            },
	            startSportsbook: function () {
	                var _this = this;
	               
	                $('#ifrSportsbook').attr('src', 'sportsbook/sportsbook/?isReal=' + _this.options.IsReal + _this.options.Mode).css('visibility', 'visible');
	                    $('#ifrSportsbook').load(function () {
	                        var iframeContent = $('#ifrSportsbook').contents().find('body');
	                        _this.attachResizeHandler(iframeContent);
	                        iframeContent.resize();
	                    });
	               
	            },
	            attachResizeHandler: function(el) {
	                var _this = this;
	                el.off('resize');
	                el.on('resize', function () {
	                    el.off('resize');
	                    $('#ifrSportsbook').css({ 'height': el.outerHeight(true) });
	                    _this.attachResizeHandler(el);
	                });
	            }
	        });

	});