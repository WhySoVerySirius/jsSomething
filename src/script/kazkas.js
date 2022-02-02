import { convert, arrayValue } from './module/convert.js';
let photos1 = [{
    "name": "Sad Clown",
    "url": "../img/row3group3.png",
    "size": 3,
    'date': '2021-11-02 12:20',
    'id': 0

}, {
    "name": "Waiting For The Train",
    "url": "../img/row3group5.png",
    "size": 1.5,
    'date': '2021-11-02 12:20',
    'id': 1
}, {
    "name": "Little Friends",
    "url": "../img/row3group6.png",
    "size": 4.5,
    'date': '2021-11-04 12:20',
    'id': 2
}, {
    "name": "What A Wonderful",
    "url": "../img/row3group7.png",
    "size": 2,
    'date': '2021-10-02 12:20',
    'id': 3
}, {
    "name": "Gymnast",
    "url": "../img/row3group8.png",
    "size": 2,
    'date': '2021-09-02 12:20',
    'id': 4
}, {
    "name": "Blue Dandelion Drops",
    "url": "../img/row2group3.png",
    "size": 3,
    'date': '2021-11-20 12:20',
    'id': 5

}, {
    "name": "Poppy For Mom",
    "url": "../img/row2group5.png",
    "size": 1.5,
    'date': '2021-07-14 12:20',
    'id': 6
}, {
    "name": "Drop some Droplets",
    "url": "../img/row2group6.png",
    "size": 1.5,
    'date': '2021-03-24 12:20',
    'id': 7
}, {
    "name": "Daisy",
    "url": "../img/row2group7.png",
    "size": 4.5,
    'date': '2020-11-02 12:20',
    'id': 8
}, {
    "name": "Sunshine",
    "url": "../img/row2group8.png",
    "size": 2,
    'date': '2019-05-02 12:20',
    'id': 9
}, {
    "name": "Britva",
    "url": "../img/row1group3.png",
    "size": 3,
    'date': '2021-07-11 12:20',
    'id': 10

}, {
    "name": "Chad Glasses",
    "url": "../img/row1group5.png",
    "size": 1.5,
    'date': '2021-01-02 12:20',
    'id': 11
}, {
    "name": "Timelapse",
    "url": "../img/row1group6.png",
    "size": 4.5,
    'date': '2021-06-15 12:20',
    'id': 12
}, {
    "name": "Reason To Live",
    "url": "../img/row1group7.png",
    "size": 2,
    'date': '2021-12-31 12:20',
    'id': 13
}, {
    "name": "W/E",
    "url": "../img/row1group8.png",
    "size": 1.2,
    'date': '2021-10-04 12:20',
    'id': 14
}];

let wholesize = 0;
let photos = [...photos1];
let removeArray = []

function render(theArray) {
    document.getElementById('photoGrids').innerHTML = ''
    theArray.forEach(element => {
        const frame = document.getElementById('photoGrids').appendChild(document.createElement('div'));
        if (removeArray.includes(element.id)) {
            frame.className = ('photoFrame selected')
        } else {
            frame.className = ('photoFrame')
        }
        frame.innerHTML = `<div class='photoHolder' style='background:url(${element.url}); background-size: cover; background-position: center'></div><h4>${element.name}</h4><p>${element.size} mb</p>`;
        frame.addEventListener('click', function(e) {
            this.classList.toggle('selected');
            if (removeArray.includes(element.id)) {
                let removeIndex = removeArray.indexOf(element.id);
                removeArray.splice(removeIndex, 1)
            } else {
                removeArray.push(element.id)
            }
        })
    })

    wholesize = arrayValue(photos);
    $('#progressbar').val(wholesize);
    $('#progressText').html(wholesize.toFixed(2) + 'MB / 100 MB');

};
console.log(photos)










$(function() {
    photos.sort((a, b) => (a.name > b.name) ? 1 : -1);
    render(photos);
    let name = $('.name');
    let size = $('.size');
    let mod = $('.modified');
    $('.name, .size, .modified').on('click', function(e) {
        if (name.is(e.target)) {
            name.addClass('active');
            size.removeClass('active');
            mod.removeClass('active');
            photos.sort((a, b) => a.name > b.name ? 1 : -1);
            render(photos);
        } else if (size.is(e.target)) {
            name.removeClass('active');
            size.addClass('active');
            mod.removeClass('active');
            photos.sort((a, b) => (a.size > b.size) ? 1 : -1);
            render(photos);
        } else {
            name.removeClass('active');
            size.removeClass('active');
            mod.addClass('active');
            photos.sort((a, b) => (a.date > b.date) ? 1 : -1);
            render(photos);
        }
    });




    $('#photoUpload').on('change', function() {
        let arrayLength = photos.length;
        for (let i = 0; i < this.files.length; i++) {
            arrayLength++;
            const element = this.files[i];
            photos.push({
                name: element.name,
                size: convert(element.size),
                url: URL.createObjectURL(element),
                id: arrayLength,
                date: element.lastModified
            })
        }
        render(photos);

    });



    $('.photoDelete').on('click', function() {
        removeArray.forEach(element => {
            for (let index = 0; index < photos.length; index++) {
                if (photos[index]['id'] == element) {
                    photos.splice(index, 1);
                }
            }
        });
        removeArray = [];
        let i = 0
        photos.forEach(element => {
            element.id = i;
            i++;
        });
        console.log(photos)
        console.log(removeArray)
        render(photos)

    });


    $('#searchBar').on('input', function() {
        let content = this.value.toLowerCase();
        let searchArray = [];
        for (let index = 0; index < photos.length; index++) {
            let check = photos[index].name.toLowerCase();
            if (check.includes(content)) {
                searchArray.push(photos[index])
            }
        }
        console.log(searchArray)
        render(searchArray)
    });



})