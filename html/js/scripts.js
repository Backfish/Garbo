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

document.addEventListener('DOMContentLoaded', function() {
    new iScroll('category-1');
}, false);

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

    var gamesCount = 32, games = jQuery('.games'), e;

    for (var i = 0; i <= gamesCount; i++) {
        e = jQuery('<div />', {
            id: 'game-' + i,
            'class': 'game',
            css: {
                'background-color': (i === 0 ? 'transparent' : (i % 2 === 0 ? '#fff' : get_random_color()))
            }
        }).appendTo(games);
    }

    games.isotope({
        itemSelector: '.game',
        layoutMode: 'masonryHorizontal',
        masonryHorizontal: {
            rowHeight: e.height()
        },
        onLayout: function($elems, instance) {
            console.log(this.height());
        }
    }).parent().width(games.width());
});