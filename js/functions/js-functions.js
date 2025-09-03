/**
 * Prints the maximum of two values.
 */
function printMaxValue(a, b) {
    const max = a > b ? a : b;
    console.log('Max value:', max);
}

/**
 * Returns the maximum of two values.
 */
function max(a, b) {
    return a > b ? a : b;
}

/**
 * Write a function that receives an amount of seconds as a parameter and returns corresponding time in the format hour: minute: second
 */
function hr_min_sec(seconds) {
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;
    return `${hours}:${minutes}:${seconds}`;
}

/**
 * Function to compute BMI, w
 */
function computeBMI(weight, height) {
    return weight / (height * height);
}
/**
 * Explain BMI
 */
function explainBMI(bmi) {
    bmi = parseFloat(bmi);
    if (bmi < 18.5) {
        return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        return "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
        return "Overweight";
    } else {
        return "Obesity";
    }
}

/**
 * Compute Fibonacci
 */
function fibonacci(n) {
    if (n <= 0) return 0;
    if (n === 1) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

