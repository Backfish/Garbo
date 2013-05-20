steal('can', 'jquery', 'can/control/route', function (can, $) {

	    /**
	    * @class Gb.Routing
	    */
	    can.Control('Gb.Routing',
	    /** @Static */
	        {
	        defaults: {
	            route: ':type',
	            defaultRoute: {
	                type: ''
	            },
	            section: '',
	            startSection: null,
	            casinoSection: null,
	            sportsbookSection: null
	        }
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            //can.route(this.options.route, this.options.defaultRoute);
	            can.route(':type');
	            can.route(':type/:action');
	            can.route('casino/fun/:id');
	            this.options.startSection = new Core.Page('#page-start', { 'data': null });
	        },
	        'route': function () {
	            if (this.options.section != '') {
	                this.options.section = '';
	                if (this.options.startSection == null) {
	                    this.options.startSection = new Core.Page('#page-start', { 'data': null });
	                } else {
	                    this.options.startSection.update({ data: null });
	                    try {
	                        _gaq.push(['_trackPageview', '/home']);
	                    } catch (err) {
	                    }
	                }
	            }
	        },
	        getSection: function () {
	            return this.options.section;
	        },
	        "login route": function (data) {
	            new Core.Modal('', { href: '/user/login.html', headerText: "", width: 500 });
	        },
	        "logout route": function (data) {
	            new Gb.User.Logout();
	        },
	        "register route": function (data) {
	            new Core.Modal('', { href: '/account/register/', headerText: "Register", width: 675 });
	        },
	        "confirmation/ok route": function (data) {
	            new Core.Modal('', { href: '/confirmation/ok/', headerText: "Confirmation", width: 500 });
	        },
	        "welcome route": function (data) {
	            new Core.Modal('', { href: '/account/Welcome/', headerText: "Welcome", width: 675 });
	        },
	        "confirmation/error route": function (data) {
	            new Core.Modal('', { href: '/confirmation/error/', headerText: "Confirmation", width: 500 });
	        },
	        "forgottenpassword route": function (data) {
	            new Core.Modal('', { href: '/forgottenpassword/sendResetMessage/', headerText: "Forgotten Password", width: 500 });
	        },
	        "forgottenpassword/newpassword route": function (data) {
	            new Core.Modal('', { href: '/forgottenpassword/newpassword/', headerText: "Choose new password", width: 500 });
	        },
	        "forgottenpassword/error route": function (data) {
	            new Core.Modal('', { href: '/forgottenpassword/error/', headerText: "Error", width: 500 });
	        },
	        "myaccount route": function (data) {
	            new Core.Modal('', { href: '/account/myaccount/', headerText: "My Account", width: 675 });
	        },
	        "withdrawal route": function (data) {
	            new Core.Modal('', { href: '/withdrawalmethod/', headerText: "Withdrawal", width: 675 });
	        },
	        "deposit route": function (data) {
	            new Core.Modal('', { href: '/depositmethod/', headerText: "Deposit", width: 675 });
	        },
	        "information/:action route": function (data) {
	            new Core.Modal('', { href: '/information/' + data.action, headerText: "Information", width: 675 });
	        },
	        "sportsbook/rules route": function (data) {
	            new Core.Modal('', { href: '/sportsbook/rules', headerText: "Information", width: 675 });
	        },
	        "sportsbook route": function (data) {
	            var _this = this;
	            if (this.options.section != 'sportsbook') {
	                $('#nav-section').find('.active').removeClass('active');
	                $('#nav-section').find('.sportsbook-link').parent().addClass('active');
	                this.options.section = 'sportsbook';
	                if (this.options.sportsbookSection == null) {
	                    $.ajax({
	                        type: "GET",
	                        url: '/sportsbook/',
	                        success: function (data) {
	                            _this.options.sportsbookSection = new Core.Page('#page-sportsbook', { 'data': data });

	                        },
	                        error: function () {
	                        },
	                        complete: function () {
	                        }
	                    });
	                } else {
	                    _this.options.sportsbookSection.update({ data: null });
	                }
	            }
	            try {
	                _gaq.push(['_trackPageview', '/sportsbook']);
	            } catch (err) {
	            }
	        },
	        "sportsbook/tutorial route": function (data) {
	            new Core.Modal('', { href: '/sportsbook/tutorial', headerText: "Tutorial", width: 675 });    
	        },
	        "casino route": function (data) {
	            var _this = this;
	            if (this.options.section != 'casino') {
	                $('#nav-section').find('.active').removeClass('active');
	                $('#nav-section').find('.casino-link').parent().addClass('active');
	                this.options.section = 'casino';
	                if (this.options.casinoSection == null) {
	                    $.ajax({
	                        type: "GET",
	                        url: '/casino/',
	                        success: function (data) {
	                            _this.options.casinoSection = new Core.Page('#page-casino', { 'data': data });

	                        },
	                        error: function () {
	                        },
	                        complete: function () {
	                        }
	                    });
	                } else {
	                    _this.options.casinoSection.update({ data: null });
	                }
	            }
	            try {
	                _gaq.push(['_trackPageview', '/casino']);
	            } catch (err) {
	            }
	        },
	        "casino/category/:id route": function(data) {
                    
	        },
	        "casino/:id route": function (data) {
	            var isReal = $(document.body).hasClass('logged-in') ? true : false;
	            new Gb.Game('', { GameId: data.id, IsReal: isReal });
	        },
	        "casino/fun/:id route": function (data) {
	            new Gb.Game('', { GameId: data.id, IsReal: false });
	        },
	        "choose-country route": function (data) {
	            new Core.Modal('', { href: '/chooseCountry/chooseCountry', width: 350 });
	        }
	    });

	});