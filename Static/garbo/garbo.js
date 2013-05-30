steal(
    'can',
    'jquery',
    'steal/less',
    'less/bootstrap.less',
    'core/page',
    'core/modal',
    'core/slidepage',
    './user/user.js',
    './usermenu/usermenu.js',
    './start/start.js',
    './routing/routing.js',
    'resources/greensock/jquery.gsap.js',
    'resources/bootstrap/bootstrap-dropdown.js',
    'can/util/fixture',
    function (can, $) {
        /*jQuery.support.cors = true;
        $.ajaxSetup({
            statusCode: {
                401: function () {
                    //State.updateLoggedin(false);
                }
            }
        });*/

        State = new can.Observe({
            Loggedin: false
        });
            
        new Gb.Usermenu($('#navbar-user'));
        new Gb.Start('body');
            
        Routing = new Gb.Routing('body');

        $.fn.serializeObject = function (objectWrapper) {
            var o = {};
            var obj = undefined;
            if (objectWrapper) {
                obj = eval('({' + objectWrapper + ':{}})');
                o = obj[objectWrapper];
            }
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });

            if (objectWrapper)
                return obj;
            else
                return o;

        };

    });


