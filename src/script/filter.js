$(function() {
    $('.name, .size, .modified').on('click', function(e) {
        let name = $('.name');
        let size = $('.size');
        let mod = $('.modified')
        if (name.is(e.target)) {
            name.addClass('active');
            size.removeClass('active');
            mod.removeClass('active');
            console.log('name active');
            nameArray = [...photos]
            nameArray.sort((a, b) => (a.name > b.name) ? 1 : -1)


        } else if (size.is(e.target)) {
            name.removeClass('active');
            size.addClass('active');
            mod.removeClass('active');
            console.log('size active')
        } else {
            name.removeClass('active');
            size.removeClass('active');
            mod.addClass('active');
            console.log('mod active')
        }
    })
})