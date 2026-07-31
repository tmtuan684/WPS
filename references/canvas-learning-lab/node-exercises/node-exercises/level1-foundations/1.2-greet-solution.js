// Exercise 1.2 — Personalized Greeter with a Twist (Solution)
//
// Run:
//   node 1.2-greet-solution.js Tuan evening

const name = process.argv[2] || 'stranger';
const timeOfDay = process.argv[3];

const greetings = {
  morning: 'Good morning',
  afternoon: 'Good afternoon',
  evening: 'Good evening'
};

const greeting = greetings[timeOfDay] || 'Hello';
console.log(`${greeting}, ${name}!`);
