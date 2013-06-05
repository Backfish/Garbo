steal('can', 'jquery', 'garbo/models/withdrawal.js', './init.ejs', 'steal/less', function (can, $, Witdhrawal, withdrawalView) {

    /**
    * @class Gb.Deposit
    */
    can.Control('Gb.Withdrawal',
    /** @Static */
        {
            defaults: {}
        },
    /** @Prototype */
    {
        init: function () {
            var _this = this;
            Withdrawal.findAll({}, function (withdrawal) {
                _this.element.html(withdrawalView(withdrawal));
            });
        }
    });
});