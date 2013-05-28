/* 
 * Written by José Carlos Chávez.
 * Reference: http://www.useragentman.com/IETransformsTranslator/index.html
 */

jQuery(document).ready(function() {
    jQuery.fn.transformMatrix = function(matrix, value) {
        switch (typeof matrix) {
            case 'undefined':
                return jQuery.fn.transformMatrix.getCurrentTransformMatrix(this);
                break;
            case 'object':
                return jQuery(this).css({
                    'transform': 'matrix(' + matrix.join(',') + ')',
                    '-webkit-transform': 'matrix(' + matrix.join(',') + ')',
                    '-moz-transform': 'matrix(' + matrix.join(',') + ')'
                }).data('transform-matrix', matrix);
                break;
            case 'number':
                if (typeof value === 'undefined') {
                    return jQuery.fn.transformMatrix.getCurrentTransformMatrix(this)[matrix];
                } else {
                    var m = jQuery.fn.transformMatrix.getCurrentTransformMatrix(this);
                    m[matrix] = value;
                    return jQuery(this).data('transform-matrix', m);
                }

                break;
        }
    };

    jQuery.fn.transformMatrix.getCurrentTransformMatrix = function(e) {
        var matrix;

        if (jQuery(e).data('transform-matrix')) {
            matrix = jQuery(e).data('transform-matrix');
        } else {
            var result = jQuery(e).css('transform').match(/\(([0-9\-\,\.\s])+\)/gi);
            
            if (result) {
                matrix = result[0].replace(/\s|\(|\)|px/gi, '').split(',');
            } else {
                matrix = [1, 0, 0, 1, 0, 0];
            }
        }

        jQuery(e).data('transform-matrix', matrix);

        return matrix;
    };
});