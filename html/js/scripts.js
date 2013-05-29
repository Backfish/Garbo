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
                        right: 0
                    });
                } else {
                    jQuery('#sidebar').addClass('expanded').animate({
                        right: '30%'
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

    var boxHeight = jQuery('.page').height() * 0.25, boxWidth = boxHeight * (jQuery('#wrapper').width() / jQuery('#wrapper').height());

    var gamesCount = 30;

    for (var i = 0; i <= gamesCount; i++) {
        jQuery('<div />', {
            id: 'game-' + i,
            'class': 'game',
            css: {
                'width': boxWidth * (i === 0 ? 3 : 1),
                'height': boxHeight * (i === 0 ? 3 : 1),
                'background-color': (i === 0 ? 'transparent' : get_random_color())
            }
        }).appendTo('.games');
    }

    jQuery('.games')
        .css({
            width: parseInt(boxWidth * gamesCount / 4),
            height: boxHeight * 4,
            marginLeft: -4 * boxHeight * jQuery('.games').transformMatrix(2)
        })
        .isotope({
            itemSelector: '.game',
            layoutMode: 'masonryHorizontal',
            masonryHorizontal: {
                rowHeight: boxHeight
            }
        });

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
                allowPageScroll: 'vertical',
                threshold: 0,
                fingers: 'all'
            });
        },
        status: function(event, phase, direction, distance, fingers) {
            if(phase === "start"){
                swipe.start = jQuery(swipe.element).transformMatrix(4);
            } else if (phase === "move" && (direction === "left" || direction === "right")) {
                var duration = 0;
                if (direction === "left") {
                    swipe.move(distance, duration);
                } else if (direction === "right") {
                    swipe.move(-distance, duration);
                }
            } else if (phase === "cancel") {
                swipe.move(0, 0.5);
                console.log('cancel');
            } else if (phase === "end") {
                console.log('end');
            }
        },
        move: function(distance, duration) {
            
  //          var matrix = jQuery(swipe.element).transformMatrix();
            
            if (swipe.start - distance > 0 || Math.abs(distance) > swipe.width)
                return;
 
            
//            matrix[4] = swipe.start - distance;
            
            jQuery(swipe.element)
                    .transformMatrix(4, swipe.start - distance)
                    .css('transition-duration', (duration / 1000).toFixed(1) + 's');
        }
    };

    swipe.init(jQuery('.games-container'));
});