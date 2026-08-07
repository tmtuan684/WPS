// Exercise 1.4 — Simple Calculator via Arguments
// Run with: node calc.js 5 3 +

const num1 = Number(process.argv[2]);
const num2 = Number(process.argv[3]);
const operator = process.argv[4];

function calculate(a, b, op) {
  switch (op) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      if (b === 0) {
        throw new Error("Division by zero is not allowed.");
      }
      return a / b;
    default:
      return null;
  }
}

if (Number.isNaN(num1) || Number.isNaN(num2)) {
  console.error("Please provide two valid numbers.");
} else if (!["+", "-", "*", "/"].includes(operator)) {
  console.error(`Error: unsupported operator "${operator}". Use one of + - * /`);
} else {
  try {
    const result = calculate(num1, num2, operator);
    console.log(`${num1} ${operator} ${num2} = ${result}`);
  } catch (err) {
    console.error(err.message);
  }
}
