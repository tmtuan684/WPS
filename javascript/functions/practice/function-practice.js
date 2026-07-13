/**
 * Compare 2 numbers and print the max of the two
 */
function printMax(a, b) {
    const max = a > b ? a : b;
    console.log("Max is : " + max);

}

function max(a, b) {
    return a > b ? a : b;
}

function hr_min_sec(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${hours}:${minutes}:${seconds}`;
}
