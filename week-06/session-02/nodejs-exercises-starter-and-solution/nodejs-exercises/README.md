# Node.js & npm Exercises — Starter & Solution Files

> This exercise set was drafted with the help of Claude.ai and has been reviewed and verified by the instructor.

## Structure

```
starter/    -- files with TODO comments for students to complete
solution/   -- fully working reference implementations
```

Each folder is organized by level:
- `level1/` — REPL, process.argv, simple scripts
- `level2/` — modules (require/export, ES6 import/export, directory imports), fs basics
- `level3/` — async programming (callbacks, Promises, async/await) and npm

## Running the exercises

Most files run directly with:
```bash
node <filename>.js
```

**Level 3, Exercise 3.5 (word counter)** requires installing a dependency first:
```bash
cd level3
npm install chalk@4
node wordCount.js sample-notes.txt   # solution only — starter has no sample file
```

**Level 3, Exercise 3.6 (notes app)** creates a `notes.json` file in the same
folder the first time you run `add` — this is expected behavior, not a bug.

## Notes for instructors

- `small.txt`, `medium.txt`, and `large.txt` in `level3/` are pre-generated
  sample files of increasing size, used for Exercises 3.1–3.4. Regenerate them
  with different sizes if you want students to see more dramatic timing
  differences in Exercise 3.4.
- The solution files include the same "prediction" comments referenced in the
  exercise sheet, for reference. Students should write their own before
  peeking at the solution.
