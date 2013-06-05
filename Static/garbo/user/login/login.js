steal('can', 'jquery', 'garbo/models/login.js', 'can/construct/super','can/construct/proxy','core/form', function (can, $, Login) {
        /**
	    * @class User.Login
	    */
    can.Control('User.Login',
        /** @Static */
        {
            defaults: {
                active: false,
                url: '/login'
            }
        },
        /** @Prototype */
        {
            init: function() {
                this.element.show();
                this.options.active = true;
                this.element.find('[type=text]:first').focus();
                //this._super();
            },
            'form submit': function (el, ev) {
                ev.preventDefault();
                var _this = this;
                new Login(el.serializeObject()).save(function (login) {
                    _this.success(login);
                });
            },
            '{document} click': function(el, ev) {
                // hide only if we clicked outside the login-form
                if (this.options.active && !this.element.has(ev.target).length) {
                    this.hide();
                }
            },
            "{document.documentElement} user:login": function() {
                 this.loggedIn();
            },
            success: function (data) {
                State.attr('Loggedin', true);
                this.hide();
            },
            hide: function() {
                this.options.active = false;
                this.element.hide();
                this.destroy();
            },
            '{State} Loggedin': function() {
                $(document.body).removeClass('logged-out').addClass('logged-in');
            },
            ".link-forgotten-password click": function(el, ev) {
                ev.preventDefault();
                location.hash = '#!forgottenpassword';
            }
        });
});
