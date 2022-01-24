$(document).ready(function() {
    let currentWidth = $(window).width();
    $(window).resize(function() {
        currentWidth = $(window).width();
        console.log(currentWidth)
    });
    if (currentWidth <= 800) {
        $('.progressContainer').css('display', 'none');
        $('nav').css('display', 'none');


        $(".logo").on('click', function() {
            if ($('nav').css('display') == 'none') {
                $('nav').css('display', 'flex');
            } else {
                $('nav').toggle()

            }
            $('.progressContainer').toggle();
            if ($('.navContainer').height() < $(window).height()) {
                $('.navContainer').height('100vh')
            } else {
                $('.navContainer').height('100%')
            }
        });

        // $(window).scroll(function() {
        //     console.log($(document).scroll());
        // })
    } else {
        $('nav').css('display', 'flex');
        $('.progressContainer').css('display', 'flex');
    }
});