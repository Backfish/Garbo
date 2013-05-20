steal('jquery', 'can', 'steal/less')
	.then('./transactions.less', './views/playerTransactions.ejs', 'resources/bootstrap/bootstrap-datepicker.js', function ($) {

	    /**
	    * @class User.Transactions
	    */
	    can.Control('User.Transactions',
	    /** @Static */
	        {
	        defaults: {}
	    },
	    /** @Prototype */
	        {
	        init: function () {
	            var _this = this;
	            this.getDate();
	            var nowTemp = new Date();
	            var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
	            var checkin = $('.datepicker-to').datepicker({
	                onRender: function (date) {
	                    return date.valueOf() > now.valueOf() ? 'disabled' : '';
	                }
	            }).on('changeDate', function (ev) {
	                if (ev.date.valueOf() < checkout.date.valueOf()) {
	                    var newDate = new Date(ev.date);
	                    newDate.setDate(newDate.getDate() + 1);
	                    checkout.setValue(newDate);
	                }
	                checkin.hide();
	                $('.datepicker-from')[0].focus();
	            }).data('datepicker');
	            var checkout = $('.datepicker-from').datepicker({
	                onRender: function (date) {
	                    return date.valueOf() >= checkin.date.valueOf() ? 'disabled' : '';
	                }
	            }).on('changeDate', function (ev) {
	                checkout.hide();
	            }).data('datepicker');

	            this.getTransactions();
	        },
	        '#frmSearchTransactions submit': function (el, ev) {
	            ev.preventDefault();
	            this.getTransactions();
	        },
	        getTransactions: function () {
	            try {
	                var fromdate = this.element.find('.datepicker-from').eq(0).val().split('/');
	                var todate = this.element.find('.datepicker-to').eq(0).val().split('/');
	            } catch(err) {
	            }
	            var _this = this;
	            $.ajax({
	                type: "GET",
	                url: 'api/api/Transaction/GetPlayerTransactions',
	                contentType: "application/json; charset=utf-8",
	                data: { fromDate: fromdate[2].toString() + fromdate[1].toString() + fromdate[0].toString(), toDate: todate[2].toString() + todate[1].toString() + todate[0].toString() },
	                dataType: "json",
	                statusCode: {
	                    200: function (data) {
	                        if (data.length > 0) { 
	                            _this.element.find('tbody').html(can.view('//gb/user/transactions/views/playerTransactions.ejs', data));
	                            _this.element.find('.table-transaction-result').show();
	                            _this.element.find('.no-transactions').hide();
	                        }else {
	                            _this.element.find('.table-transaction-result').hide();
	                            _this.element.find('.no-transactions').show();
                            }
	                    }
	                },
	                error: function () {
	                },
	                complete: function () {
	                }
	            });
	        },
	        addZeros: function(whichdate) {
	            if (whichdate < 10) {
	                return '0' + whichdate.toString();
	            }
	            return whichdate.toString();
	        },
	        getDate: function () {
	            var today = new Date();
	            var t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	            var f = new Date(today.getFullYear(), today.getMonth(), today.getDate());
	            f.setDate(t.getDate() - 30); //Rollin' 30 days.
	            this.element.find('.datepicker-from').eq(0).val(this.formatDateString(f));
	            this.element.find('.datepicker-to').eq(0).val(this.formatDateString(t));
	        },
	        formatDateString: function (d) {
	            return (this.addZeros(d.getDate()) + '/' + (this.addZeros(d.getMonth() + 1)) + '/' + d.getFullYear());
	        }
	    });
	});