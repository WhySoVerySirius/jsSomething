export function convert(value) {
    const ratio = 1024;
    let newvalue = (value / (ratio * ratio)).toFixed(2);
    return parseFloat(newvalue);
}

export function arrayValue(array) {
    let value = 0;
    array.forEach(element => {
        value += element.size;
    });
    return value;
}