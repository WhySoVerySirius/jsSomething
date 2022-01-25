let photos = [{
    "name": "Sad Clown",
    "url": "../img/row3group3.png",
    "size": 3

}, {
    "name": "Waiting For The Train",
    "url": "../img/row3group5.png",
    "size": 1.5
}, {
    "name": "Little Friends",
    "url": "../img/row3group6.png",
    "size": 4.5
}, {
    "name": "What A Wonderful",
    "url": "../img/row3group7.png",
    "size": 2
}, {
    "name": "Gymnast",
    "url": "../img/row3group8.png",
    "size": 2
}, {
    "name": "Blue Dandelion Drops",
    "url": "../img/row2group3.png",
    "size": 3

}, {
    "name": "Poppy For Mom",
    "url": "../img/row2group5.png",
    "size": 1.5
}, {
    "name": "Drop some Droplets",
    "url": "../img/row2group6.png",
    "size": 1.5
}, {
    "name": "Daisy",
    "url": "../img/row2group7.png",
    "size": 4.5
}, {
    "name": "Sunshine",
    "url": "../img/row2group8.png",
    "size": 2
}, {
    "name": "Britva",
    "url": "../img/row1group3.png",
    "size": 3

}, {
    "name": "Chad Glasses",
    "url": "../img/row1group5.png",
    "size": 1.5
}, {
    "name": "Timelapse",
    "url": "../img/row1group6.png",
    "size": 4.5
}, {
    "name": "Reason To Live",
    "url": "../img/row1group7.png",
    "size": 2
}, {
    "name": "W/E",
    "url": "../img/row1group8.png",
    "size": "undefined"
}];
$(document).ready(function() {
    let photostring = '';
    photos.forEach(element => {
        photostring += `<div class='photoFrame'><div class='photoHolder' style='background:url(${element.url}); background-size: cover; background-position: center'></div><h4>${element.name}</h4><p>${element.size}</p></div>`
    });
    $('.photoGrid').html(photostring);
})