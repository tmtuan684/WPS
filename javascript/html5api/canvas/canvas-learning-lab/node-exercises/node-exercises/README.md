# Node.js Exercises

Companion starter/solution files for the `node-lab.html` learning lab, organized by
level. Unlike the canvas and Leaflet exercise sets, these are **not runnable in a
browser** — Node.js needs a terminal. Open each file in VS Code and run it with:

    node filename.js

## Setup

You need Node.js installed (`node --version` to check). No other setup is required
until Level 4, which uses npm packages.

## How to use

1. Read the matching section in `node-lab.html` first for the concept and context.
2. Open a `*-starter.js` file, fill in the `// TODO` comments.
3. Run it with `node filename.js` (check each file's header comment for the exact
   command and any required arguments).
4. Compare against the matching `*-solution.js` if you get stuck.

## Structure

### Level 1 — Foundations
- `1.1-repl-warmup.md` — a short guided REPL exploration, no file to write (just a
  terminal session) — confirms `window`/`document` don't exist in Node, `process` does.
- `1.2-greet-starter.js` / `1.2-greet-solution.js` — reading `process.argv`, with a
  small lookup-object pattern for handling one of several expected values.

### Level 2 — Modules & Files
- `2.1-math-utils.js` (provided) + `2.1-app-starter.js` / `2.1-app-solution.js` —
  basic `require()` / `module.exports`, contrasted with the `import`/`export` syntax
  you already know from frontend tooling.
- `utils/` — `math-utils.js` and `string-utils.js` (provided), plus
  `index-STARTER.js` / `index-SOLUTION.js` (rename whichever one you want to try to
  `index.js`) and `2.2-app.js` — demonstrates `require()`-ing an entire folder.
- `2.3-notes-starter.js` / `2.3-notes-solution.js` + `2.3-app.js` — a small module
  that persists data to a JSON file using the `fs` module (sync API).

### Level 3 — Async Node
- `sample-files/file1.txt`, `file2.txt`, `file3.txt` — plain text files the
  exercises below read from. Keep this folder alongside the level 3 scripts.
- `3.1-callback-hell-reference.js` — a working reference showing the nested-callback
  "pyramid of doom." Not an exercise — read it before 3.2/3.3.
- `3.2-promises-starter.js` / `3.2-promises-solution.js` — refactor the same file
  reads into a `.then()`/`.catch()` Promise chain.
- `3.3-async-await-starter.js` / `3.3-async-await-solution.js` — refactor again into
  `async`/`await` with `try`/`catch`/`finally`, timed with `console.time()`. Includes
  a commented-out bonus version using `Promise.all()` for concurrent reads.

### Level 4 — Capstone: Superhero Joke CLI
- `package.json` — declares the three dependencies (`give-me-a-joke`, `superheroes`,
  `chalk`). Run `npm install` inside this folder first.
- `superhero-joke-starter.js` / `superhero-joke-solution.js` — the CLI app combining
  `process.argv`, `fs.promises`, `async`/`await`, and npm packages. The solution
  includes all four extension-checklist items (`--save`, `--count N`, `--history`,
  and error handling).
- `joke-service.js` — a reference example showing extension item 4 (splitting the
  joke-fetching/logging logic into its own module) as a separate, fully working file.

## Notes

- **The joke API can print raw errors.** `give-me-a-joke` calls `icanhazdadjoke.com`
  internally and — if that request fails (no internet, firewall, DNS issue) — the
  package itself dumps a large raw error object straight to the console, rather than
  passing a clean error back through its callback. That's a limitation of the
  package, not something the exercise code can fully suppress from the calling side.
  On a normal internet connection this won't come up; if a student does hit it,
  it's worth pointing out as a real example of why a library's own error-handling
  quality matters when you pick a dependency.
- **chalk version matters.** `package.json` pins `chalk@^4`, which uses
  `require()`/CommonJS. Chalk v5+ switched to being an ES Module only and will not
  work with `require()` — if you ever install it separately rather than via
  `npm install` from the provided `package.json`, make sure you get v4.
- `2.3` and the capstone both write files (`notes.json`, `joke-log.txt`) into
  whatever folder you run them from — delete those generated files if you want to
  re-run an exercise from a clean slate.
- The capstone's `--history` and `2.3`'s `readNotes()` both handle the "file doesn't
  exist yet" case gracefully — worth noticing as a small but common real-world
  pattern: check-then-read (or try/catch a missing file) rather than assuming data
  is already there.
