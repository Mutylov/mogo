/*jshint esversion: 6 */

$(function() {
    const header = $('#header');
    const introHeight = $('#intro').innerHeight() - header.innerHeight();
    var scrollOffset = $(window).scrollTop();
    var sectionsIds = {};

    $('.section').each(function() {
        var el = $(this);
        var id = el.attr('id');
        var top = parseInt(el.offset().top);
        var height = parseInt(el.innerHeight());

        sectionsIds[id] = {
            top: top,
            height: height
        };
    });

    addClassFixed(scrollOffset);

    $(window).on('scroll', function() {
        scrollOffset = $(this).scrollTop();
        addClassFixed(scrollOffset);
        addClassActive();
    });

    $('[data-scroll]').on('click', function(event) {
        event.preventDefault();

        const id = $(this).data('scroll');
        const blockOffset = $(id).offset().top;

        $('.nav__link').removeClass('active');
        $(this).addClass('active');

        $('html, body').animate(
            {
                scrollTop: blockOffset - header.innerHeight()
            },
            500
        );

        header.removeClass('active');
    });

    $('#nav_toggle').on('click', function(event) {
        event.preventDefault();
        header.toggleClass('active');
    });

    $('[data-collapse]').on('click', function(event) {
        event.preventDefault();

        const el = $(this);
        const id = el.data('collapse');

        $(id)
            .slideToggle(500)
            .parent()
            .toggleClass('active');
    });

    $('[data-slider]').slick({
        infinite: true,
        fade: false,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    function addClassFixed(scrollOffset) {
        if (scrollOffset >= introHeight) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
    }

    function addClassActive() {
        var thisId = 'header';

        $.each(sectionsIds, function(k, v) {
            if (scrollOffset >= v.top && scrollOffset < v.height + v.top) {
                thisId = k;
            }
        });

        if (thisId !== undefined) {
            var currentId = $('[data-scroll="#' + thisId + '"]');

            if (currentId.length > 0) {
                $('.nav__link').removeClass('active');
                currentId.addClass('active');
            }
        }
    }
});
