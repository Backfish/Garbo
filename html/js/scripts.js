var menu = {
    'menu': {
        label: 'Menu',
        icon: 'all-games.png',
        href: '#',
        css: {
            backgroundColor: '#b14e8f'
        },
        on:{
            click: function(){
                
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
        label: 'New account',
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

    for (x in menu) {
        menu[x] = jQuery.extend({
            id: 'menu-item-' + x,
            html: '<img alt="" src="images/icons/' + menu[x].icon + '" /><span>' + menu[x].label + '</span>',
            css: {},
            on: {}
        }, menu[x]);
        jQuery('<a>', menu[x]).appendTo('#sidebar');
    }

    var boxHeight = jQuery('.page').height() * 0.1, boxWidth = boxHeight * (screen.width / screen.height);

    jQuery('<div />', {
        id: 'game-0',
        'class': 'game',
        css: {
            'width': boxWidth * 7,
            'height': boxHeight * 7,
            'background-color': get_random_color()
        }
    }).appendTo('.games');

    jQuery('<div />', {
        id: 'game-1',
        'class': 'game',
        css: {
            'width': boxWidth * 3,
            'height': boxHeight * 3,
            'background-color': get_random_color()
        }
    }).appendTo('.games');

    jQuery('<div />', {
        id: 'game-2',
        'class': 'game',
        css: {
            'width': boxWidth * 2,
            'height': boxHeight * 3,
            'background-color': get_random_color()
        }
    }).appendTo('.games');
    jQuery('<div />', {
        id: 'game-3',
        'class': 'game',
        css: {
            'width': boxWidth * 2,
            'height': boxHeight * 3,
            'background-color': get_random_color()
        }
    }).appendTo('.games');

    for (var i = 0; i < 30; i++) {
        jQuery('<div />', {
            id: 'game-' + i,
            'class': 'game',
            css: {
                'width': boxWidth * 3,
                'height': boxHeight * ((i % 4 === 3) ? 3 : 2.3),
                'background-color': get_random_color()
            }
        }).appendTo('.games');
    }

    /*jQuery('.games').masonry({
     itemSelector: '.game',
     columnWidth: boxWidth,
     rowHeight: boxHeight * 10,
     animationOptions: {
     duration: 400
     }
     });*/

    args = {
        itemSelector: '.game',
        layoutMode: 'cellsByColumn'
    };

    args[args.layoutMode] = {
        columnWidth: boxWidth,
        rowHeight: boxHeight
    };

    jQuery('.games').isotope(args);

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