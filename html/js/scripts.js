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

    var boxHeight = jQuery('.page').height() * .75;

    for (var i = 0; i < 40; i++) {
        jQuery('<div />', {
            id: 'game-' + i,
            'class': 'game',
            css: {
                'width': boxHeight * (4 / 3),
                'height': boxHeight,
                'background-color': get_random_color()
            }
        }).appendTo('.games');

        if (i === 0)
            boxHeight = boxHeight / 3;
    }

    jQuery('.games').isotope({
        itemSelector: '.game',
        layoutMode: 'fitColumns'
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

            if (translate > 0)
                return;

            jQuery(swipe.element).css({
                'transition-duration': (duration / 1000).toFixed(1) + 's',
                'transform': 'skewX(-10deg) translateX(' + translate + 'px)'
            });
        }
    };

    swipe.init(jQuery(".games-container"));
});