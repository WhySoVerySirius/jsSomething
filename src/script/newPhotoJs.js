import { getPhotos } from './module/photoFetch.js';
import { convert } from './module/convert.js';


function photoRender(array) {
    $('#photoGrids').html('');
    array.forEach(element => {
        let $photoFrame = document.createElement('div'),
            photoHolder = document.createElement('div'),
            photoTitle = document.createElement('h4'),
            photoSize = document.createElement('p');
        $photoFrame.className = 'photoFrame';
        photoHolder.className = 'photoHolder';
        photoHolder.style.backgroundImage = `url(${element.url})`;
        photoTitle.innerHTML = element.title;
        photoSize.innerHTML = convert(element.size) + ' mb';
        $photoFrame.append(photoHolder, photoTitle, photoSize);
        $('#photoGrids').append($photoFrame)
    });
    progressBarValue(array)
}

async function photoActions(action) {

    switch (action) {
        case 'upload':
            break;
        case 'delete':
            break;
        case 'share':
            break;
        default:
            let photoArray = await getPhotos(20);
            photoRender(photoArray);
            break;
    }

}

function progressBarValue(array) {
    let value = 0;
    array.forEach(element => {
        value += convert(element.size)
    });
    $('#progressbar').val(value);
    $('#progressText').html(value.toFixed(2) + 'MB / 100 MB');

}


$(function() {
    photoActions()
})