/**
 * Generate an array of random integers.
 */
function generateArray(length, min, max) {
    const a = [];
    for (let i = 0; i < length; i++) {
        a.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return a;
}

/**
 * Find the maximum value in an array.
 */
function max(a) {
    let max = a[0];
    for (let i = 1; i < a.length; i++) {
        if (a[i] > max) {
            max = a[i];
        }
    }
    return max;
}

/**
 * Return first index of maximum value in an array.
 */
function indexOfMax(a) {
    let max = a[0];
    let index = 0;
    for (let i = 1; i < a.length; i++) {
        if (a[i] > max) {
            max = a[i];
            index = i;
        }
    }
    return index;
}
