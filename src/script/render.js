export function otherrender(theArray) {
    let newphotostring = '';
    theArray.forEach(element => {
        newphotostring += `<div class='photoFrame'><div class='photoHolder' style='background:url(${element.url}); background-size: cover; background-position: center'></div><h4>${element.name}</h4><p>${element.size} mb</p></div>`
    });
    console.log(newphotostring);
    $('.photoGrid').append(newphotostring);
    sizeCounter()
}