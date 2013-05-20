steal(
    'can',
    'jquery',
    'steal/less',
    'less/bootstrap.less',
    'core/page',
    'core/modal',
    './user/user.js',
    './usermenu/usermenu.js',
    './start/start.js',
    './routing/routing.js',
    'resources/greensock/jquery.gsap.min.js',
    'resources/bootstrap/bootstrap-dropdown.js',
    function (can, $) {
        jQuery.support.cors = true;
        $.ajaxSetup({
            statusCode: {
                401: function () {
                    //State.updateLoggedin(false);
                }
            }
        });
            
        new Gb.Usermenu($('#navbar-user'));
        new Gb.Start('body');
            
        Routing = new Gb.Routing('body');

    });