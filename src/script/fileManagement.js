// import { otherrender } from './render';
function otherrender(theArray) {
    let newphotostring = '';
    theArray.forEach(element => {
        newphotostring += `<div class='photoFrame'><div class='photoHolder' style='background:url(${element.url}); background-size: cover; background-position: center'></div><h4>${element.name}</h4><p>${element.size} mb</p></div>`
    });
    $('.photoGrid').append(newphotostring);
    sizeCounter()
}

function sizeCounter() {

}


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

    })
})

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