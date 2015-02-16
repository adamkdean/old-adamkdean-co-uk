/* Author: Adam K Dean
 * Site:   adamkdean.co.uk
 * File:   search.js
 */

$(function() {
    var $search = $('.search');
    $('.search:not(.active) i').click(function() {
        $search.addClass('active');
        $('.search input').select();
        setTimeout(function() {
            $(document).click(function() {
                if ($search.hasClass('active')) {
                    $search.removeClass('active');
                    $search.addClass('shrunk');
                    $(document).off('click');
                    $('.search.active').off('click');
                    setTimeout(function() {
                        $search.removeClass('shrunk');
                    }, 500);
                }
            });

            $('.search.active').click(function(e) {
                 e.stopPropagation();
            });
        }, 50);
    });
});
