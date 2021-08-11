
$(function() {
    'use strict';
    const SCROLL_TIME = 2500;
    const SCROLL_EASING = 'easeOutQuint';

    $('.arrow').click(function() {
        let section = $(this).closest('.section');
        let sectionHeight = section.outerHeight();
        let offsetTop = section.offset().top;
        if($(this).is('.arrow-up')){
            animateScroll(offsetTop - sectionHeight);
        } else {
            animateScroll(offsetTop + sectionHeight);
        } 
    });

    $('.nav-dots .dot').click(function() {
        let id = $(this).attr('href');
        colorNavDot(id);
        let offsetTop = $(id).offset().top;
        animateScroll(offsetTop);
    });

    $(window).scroll(() => {
        let sectionBoundaries = getSectionBoundaries();
        let windowCenter = window.scrollY + document.documentElement.clientHeight / 2;
        for(let key of Object.keys(sectionBoundaries)){
            if(windowCenter >= sectionBoundaries[key].top 
                && windowCenter < sectionBoundaries[key].bottom){ 
                colorNavDot(key)
            }
        }
    });

    function getSectionBoundaries(){
        let obj = {};
        $('.section').each(function(_, elem) {
            let id = '#'+$(elem).attr('id');
            let top = $(elem).offset().top;
            let bottom = $(elem).offset().top + $(elem).outerHeight();
            obj[id] = {
                top: top,
                bottom: bottom
            }
        });
        return obj;
    }

    function animateScroll(offset){
        $('html').finish().animate({
            scrollTop: offset,
        }, SCROLL_TIME, SCROLL_EASING);
    }

    function colorNavDot(href){
        $('.dot').removeClass('picked');
        $('.dot').filter(`[href*="${ href }"]`).addClass('picked');
    }

    window.onbeforeunload = function () {
        this.scrollTo(0,0);
    };
});
