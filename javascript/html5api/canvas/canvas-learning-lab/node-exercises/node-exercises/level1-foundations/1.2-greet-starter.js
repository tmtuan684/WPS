// Exercise 1.2 — Personalized Greeter with a Twist
//
// process.argv is an array of command-line arguments.
//   process.argv[0] -> path to node
//   process.argv[1] -> path to this file
//   process.argv[2] -> your first argument
//   process.argv[3] -> your second argument
//
// Run this file like:
//   node 1.2-greet-starter.js Tuan evening
//
// TODO 1: read the name from process.argv[2] (default to 'stranger' if missing)

// TODO 2: read the time-of-day from process.argv[3]
//   ('morning' | 'afternoon' | 'evening' — anything else should fall back to a
//   generic greeting)

// TODO 3: build a `greetings` lookup object mapping each time-of-day to a greeting word
//   e.g. { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening' }

// TODO 4: pick the right greeting word from the lookup (fall back to 'Hello' if the
//   time-of-day argument didn't match anything), and log:
//   `${greeting}, ${name}!`
