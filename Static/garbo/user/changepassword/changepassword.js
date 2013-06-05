steal('can', 'jquery', 'garbo/models/changepassword.js', 'steal/less', 'core/popover/popover.js', function (can, $, Changepassword) {

    /**
    * @class User.Register
    */
    can.Control('User.Register',
    /** @Static */
        {
            defaults: {}
        },
    /** @Prototype */
        {
            init: function () {
                new Core.Popover(this.element, { triggerObj: 'input[type=password]' });
            },
            'submit': function (el, ev) {
                ev.preventDefault();
                var _this = this;
                new Changepassword(el.serializeObject()).save(function (cp) {
                    alert('You have now changed your password.')
                });
            }

        });

});