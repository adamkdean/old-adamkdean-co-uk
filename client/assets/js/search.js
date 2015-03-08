/* Author: Adam K Dean
 * Site:   adamkdean.co.uk
 * File:   search.js
 */

$(function() {

    var $search = $('.search');

    // handle the transitions and transformations etc
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

    // handle form submission
    $('.search input').keypress(function (e) {
        if (e.which === 13) {
            $('form#search-form').submit();
            e.preventDefault();
            return false;
        }
    });
});
