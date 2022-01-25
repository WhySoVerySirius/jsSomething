$(document).ready(function() {
    let photostring = '';
    photos.forEach(element => {
        photostring += `<div class='photoFrame'><div class='photoHolder' style='background:url(${element.url}); background-size: cover; background-position: center'></div><h4>${element.name}</h4><p>${element.size}</p></div>`
    });
    $('.photoGrid').html(photostring);
})