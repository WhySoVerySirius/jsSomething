export function convert(value) {
    const ratio = 1024;
    let newvalue = (value / (ratio * ratio)).toFixed(2);
    return parseFloat(newvalue);
}