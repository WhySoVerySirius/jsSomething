import { convert } from './module/convert.js';
let photos = [{
    "name": "Sad Clown",
    "url": "../img/row3group3.png",
    "size": 3,
    'date': '2021-11-02 12:20'

}, {
    "name": "Waiting For The Train",
    "url": "../img/row3group5.png",
    "size": 1.5,
    'date': '2021-11-02 12:20'
}, {
    "name": "Little Friends",
    "url": "../img/row3group6.png",
    "size": 4.5,
    'date': '2021-11-04 12:20'
}, {
    "name": "What A Wonderful",
    "url": "../img/row3group7.png",
    "size": 2,
    'date': '2021-10-02 12:20'
}, {
    "name": "Gymnast",
    "url": "../img/row3group8.png",
    "size": 2,
    'date': '2021-09-02 12:20'
}, {
    "name": "Blue Dandelion Drops",
    "url": "../img/row2group3.png",
    "size": 3,
    'date': '2021-11-20 12:20'

}, {
    "name": "Poppy For Mom",
    "url": "../img/row2group5.png",
    "size": 1.5,
    'date': '2021-07-14 12:20'
}, {
    "name": "Drop some Droplets",
    "url": "../img/row2group6.png",
    "size": 1.5,
    'date': '2021-03-24 12:20'
}, {
    "name": "Daisy",
    "url": "../img/row2group7.png",
    "size": 4.5,
    'date': '2020-11-02 12:20'
}, {
    "name": "Sunshine",
    "url": "../img/row2group8.png",
    "size": 2,
    'date': '2019-05-02 12:20'
}, {
    "name": "Britva",
    "url": "../img/row1group3.png",
    "size": 3,
    'date': '2021-07-11 12:20'

}, {
    "name": "Chad Glasses",
    "url": "../img/row1group5.png",
    "size": 1.5,
    'date': '2021-01-02 12:20'
}, {
    "name": "Timelapse",
    "url": "../img/row1group6.png",
    "size": 4.5,
    'date': '2021-06-15 12:20'
}, {
    "name": "Reason To Live",
    "url": "../img/row1group7.png",
    "size": 2,
    'date': '2021-12-31 12:20'
}, {
    "name": "W/E",
    "url": "../img/row1group8.png",
    "size": 1.2,
    'date': '2021-10-04 12:20'
}];

// pradinis ft renderis
function render(theArray) {
    let photostring = '';
    wholesize = 0;
    theArray.forEach(element => {
        photostring += `<div class='photoFrame'><div class='photoHolder' style='background:url(${element.url}); background-size: cover; background-position: center'></div><h4>${element.name}</h4><p>${element.size} mb</p></div>`;
        wholesize += element.size
    });
    $('.photoGrid').html(photostring);
    console.log(wholesize)
    console.log(typeof(wholesize))
    $('#progressbar').val(wholesize);
    $('#progressText').html(wholesize + 'MB / 100 MB');


}
// nauju foto renderis
function otherrender(theArray) {
    let newphotostring = '';
    theArray.forEach(element => {
        newphotostring += `<div class='photoFrame'><div class='photoHolder' style='background:url(${element.url}); background-size: cover; background-position: center'></div><h4>${element.name}</h4><p>${element.size} mb</p></div>`;
        wholesize += convert(element.size);
    });
    $('.photoGrid').append(newphotostring);
    console.log(wholesize)
}


let wholesize = 0;


$(function() {
    let nameArray = [...photos]
    nameArray.sort((a, b) => (a.name > b.name) ? 1 : -1);
    render(nameArray);
    let name = $('.name');
    let size = $('.size');
    let mod = $('.modified');
    $('.name, .size, .modified').on('click', function(e) {
        if (name.is(e.target)) {
            name.addClass('active');
            size.removeClass('active');
            mod.removeClass('active');
            render(nameArray);
        } else if (size.is(e.target)) {
            name.removeClass('active');
            size.addClass('active');
            mod.removeClass('active');
            let sizeArray = [...photos]
            sizeArray.sort((a, b) => (a.size > b.size) ? 1 : -1);
            render(sizeArray);
        } else {
            name.removeClass('active');
            size.removeClass('active');
            mod.addClass('active');
            let dateArray = [...photos]
            dateArray.sort((a, b) => (a.date > b.date) ? 1 : -1);
            render(dateArray);
        }
    })
})




$(function() {
    $('.photoUpload').on('change', function() {
        let content = [];
        for (let i = 0; i < this.files.length; i++) {
            const element = this.files[i];
            content.push({
                name: element.name,
                size: element.size,
                url: URL.createObjectURL(element),
            })
        }
        otherrender(content);
        $('#progressbar').val(wholesize);
        $('#progressText').html(wholesize + 'MB / 100 MB');
    })
    $('.photoDelete').on('click', function() {
        $('.photoFrame').remove('.selected')
    })
})

$(function() {
    $('.photoFrame').on('click', function() {
        $(this).toggleClass('selected')
    })
})