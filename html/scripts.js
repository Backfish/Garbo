var menu = {
    'my-account': {
        label: 'My account',
        icon: 'my-account.png',
        href: '#'
    }
};

function get_random_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

jQuery(document).ready(function() {
    for (x in menu) {
        jQuery('<a>', {
            id: 'menu-' + x,
            href: menu[x].href,
            html: '<img alt="" src="images/' + menu[x].icon + '" /><span>' + menu[x].label + '</span>'
        }).appendTo('#sidebar');
    }

    for (var i = 0; i < 20; i++) {
        jQuery('<div />', {
            'class': 'box',
            css: {
                'width': '80px',
                'height': '80px',
                'background-color': get_random_color()
            }
        }).appendTo('#menu');
    }

    jQuery('#menu').isotope({
        itemSelector: '.box',
        layoutMode: 'fitRows'
    });

    var swipe = {
        element: null,
        init: function(e) {
            this.element = e.get(0);
            e.swipe({
                triggerOnTouchEnd: true,
                swipeStatus: swipe.status,
                allowPageScroll: "vertical"
            });
        },
        status: function(event, phase, direction, distance, fingers) {
            if (phase === "move" && (direction === "left" || direction === "right")) {
                var duration = 0;
                if (direction === "left") {
                    swipe.move(distance, duration);
                } else if (direction === "right") {
                    swipe.move(-distance, duration);
                }
            } else if (phase === "cancel") {
                swipe.move(0, 0.5);
            } else if (phase === "end") {

            }
        },
        move: function(distance, duration) {
            var translate = (distance < 0 ? '' : '-') + Math.abs(distance).toString();

            jQuery(swipe.element).css({
                'transition-duration': (duration / 1000).toFixed(1) + 's',
                'transform': 'skewX(-10deg) translateX(' + translate + 'px)'
            });
        }
    };

    swipe.init(jQuery("#menu-container"));

    //Init touch swipe


    /**
     * Catch each phase of the swipe.
     * move : we drag the div.
     * cancel : we animate back to where we were
     * end : we animate to the next image
     */


});


