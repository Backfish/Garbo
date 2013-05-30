var menu = {
    'menu': {
        label: 'Menu',
        icon: 'all-games.png',
        href: '#',
        css: {
            backgroundColor: '#b14e8f'
        },
        on: {
            click: function() {
                if (jQuery('#sidebar').hasClass('expanded')) {
                    jQuery('#sidebar').removeClass('expanded').animate({
                        right: '-29.6%'
                    });
                } else {
                    jQuery('#sidebar').addClass('expanded').animate({
                        right: '0'
                    });
                }

                return false;
            }
        }
    },
    'login': {
        label: 'Login',
        icon: 'login.png',
        href: '#',
        css: {
            backgroundColor: '#24b2bf'
        }
    },
    'new-account': {
        label: 'New accoun',
        icon: 'new-account.png',
        href: '#',
        css: {
            backgroundColor: '#d48c27'
        }
    },
    'all-games': {
        label: 'All games',
        icon: 'all-games.png',
        href: '#',
        css: {
            backgroundColor: '#b14e8f'
        }
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
    for (var x in menu) {
        menu[x] = jQuery.extend({
            id: 'menu-item-' + x,
            html: '<img alt="" src="images/icons/' + menu[x].icon + '" /><span>' + menu[x].label + '</span>',
            css: {},
            on: {}
        }, menu[x]);

        jQuery('<a />', menu[x]).attr('data-role', 'button').appendTo('#sidebar-menu');
    }

    var gamesCount = 33, games = jQuery('.games'), e;

    for (var i = 0; i <= gamesCount; i++) {
        e = jQuery('<div />', {
            id: 'game-' + i,
            'class': 'game',
            css: {
                'background-color': (i === 0 ? 'transparent' : (i % 2 === 0 ? '#fff' : get_random_color()))
            }
        }).appendTo(games);

        e.css('width', e.width());
    }

    jQuery('.games').css({
        marginLeft: -games.height() * games.transformMatrix(2)
    }).isotope({
        itemSelector: '.game',
        layoutMode: 'masonryHorizontal',
        masonryHorizontal: {
            rowHeight: e.height()
        }
    }).parent().css('width', 'auto');

    var swipe = {
        width: 0,
        start: 0,
        element: null,
        init: function(e) {
            this.element = e.get(0);
            this.width = e.width();
            e.swipe({
                triggerOnTouchEnd: true,
                swipeStatus: swipe.status,
                allowPageScroll: 'horizontal',
                threshold: 0,
                fingers: 'all'
            });

            e.bind('mousewheel', swipe.scroll);
        },
        status: function(event, phase, direction, distance, fingers) {
            if (phase === "start") {
                swipe.start = jQuery(swipe.element).transformMatrix(4);
            } else if (phase === "move" && (direction === "left" || direction === "right")) {
                var duration = 0;
                if (direction === "left") {
                    swipe.move(distance, duration);
                } else if (direction === "right") {
                    swipe.move(-distance, duration);
                }
            } else if (phase === "cancel") {
                swipe.move(5, 0.5);
                console.log('cancel');
            } else if (phase === "end") {
                console.log('end');
            }
        },
        move: function(distance, duration) {
            distance = swipe.start - distance;

            if (distance > 0 || distance < -swipe.width)
                return;

            jQuery(swipe.element)
                    .transformMatrix(4, distance)
                    .css('transition', (duration / 1000).toFixed(1) + 's');
        },
        scroll: function(event, delta, deltaX, deltaY) {
            var distance = jQuery(swipe.element).transformMatrix(4) + deltaY;
            
            if (distance > 0 || distance < -swipe.width)
                return;

            jQuery(swipe.element)
                    .transformMatrix(4, distance);
        }
    };

    swipe.init(jQuery('.games-container'));
});