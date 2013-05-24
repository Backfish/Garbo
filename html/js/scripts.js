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

    var boxHeight = jQuery('.page').height(), boxWidth = boxHeight * (screen.width / screen.height);

    jQuery('<div />', {
        id: 'game-0',
        'class': 'game',
        css: {
            'width': boxWidth * 0.7,
            'height': boxHeight * 0.7,
            'background-color': get_random_color()
        }
    }).appendTo('.games');

    jQuery('<div />', {
        id: 'game-1',
        'class': 'game',
        css: {
            'width': boxWidth * 0.3,
            'height': boxHeight * 0.3,
            'background-color': get_random_color()
        }
    }).appendTo('.games');

    jQuery('<div />', {
        id: 'game-2',
        'class': 'game',
        css: {
            'width': boxWidth * 0.2,
            'height': boxHeight * 0.3,
            'background-color': get_random_color()
        }
    }).appendTo('.games');
    jQuery('<div />', {
        id: 'game-2',
        'class': 'game',
        css: {
            'width': boxWidth * 0.2,
            'height': boxHeight * 0.3,
            'background-color': get_random_color()
        }
    }).appendTo('.games');

    for (var i = 3; i < 40; i++) {
        jQuery('<div />', {
            id: 'game-' + i,
            'class': 'game',
            css: {
                'width': parseInt(boxWidth * 0.3),
                'height': parseInt(boxHeight * 0.3),
                'background-color': get_random_color()
            }
        }).appendTo('.games');
    }

    jQuery('.games').isotope({
        itemSelector: '.game',
        layoutMode: 'straightDown'
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