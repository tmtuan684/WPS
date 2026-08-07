# Learning Notes: The `fs` Module in Node.js

> *These learning notes were drafted with the help of Claude.ai and have been reviewed and verified by the instructor. All code examples below were run and confirmed working.*

**Purpose of this document:** a self-contained set of notes for you to learn the `fs` module deeply, structured so each section can be lifted directly into a lecture, live-coded, or handed to students as reading material. Teaching notes (in blockquotes) explain *why* the material is sequenced this way and where students typically get stuck.

---

## 1. What is `fs` and why does it matter?

`fs` (File System) is one of Node's **built-in core modules** — it ships with Node itself, so `npm install` is never needed for it. It's what lets server-side JavaScript do something browser JavaScript fundamentally cannot: read, write, create, and delete files on disk.

```js
const fs = require('fs');
```

> **Teaching note:** This is a good moment to reconnect to the "browser vs Node" distinction from the REPL exercise earlier in the course (`document`/`window` not existing in Node). Frame it the other direction here: *"Node can't touch the DOM, but it can touch the disk — the browser can't."* This symmetry helps the concept stick.

---

## 2. The Three API Styles — the most important concept in this module

Nearly every `fs` method exists in **three forms**. Understanding this up front prevents 90% of student confusion later.

| Style | Naming pattern | Blocking? | When to reach for it |
|---|---|---|---|
| **Synchronous** | method name ends in `Sync` | Blocks the entire program until finished | Quick scripts, CLI tools, setup code that must finish before anything else runs |
| **Callback** | takes a callback function as the last argument | Non-blocking | Legacy code, libraries that predate Promises |
| **Promise-based** | imported from `fs/promises`, used with `async/await` | Non-blocking | Default choice for anything real — servers, apps |

> **Teaching note:** Introduce these in this exact order — Sync first (easiest mental model, "just like Python/Java"), then Callback (to explain *why* Node code doesn't always run top-to-bottom, tying back to the async/event-loop lecture), then Promises/async-await as "the callback problem, solved." Presenting Promises first tends to make students treat `await` as magic rather than understanding what it's replacing.

### 2.1 Synchronous — simplest to reason about, but freezes everything else

```js
const fs = require('fs');

fs.writeFileSync('greeting.txt', 'Hello from fs!\n');
const content = fs.readFileSync('greeting.txt', 'utf8');
console.log('Sync read:', content);
```
```
Sync read: Hello from fs!
```

**What's happening line by line:**
- `writeFileSync(path, data)` creates the file (or overwrites it if it already exists).
- `readFileSync(path, encoding)` reads it back. **The `'utf8'` argument matters** — without it, you get a raw `Buffer` (binary data) instead of a readable string. This is a very common student bug: they read a file, `console.log` it, and see something like `<Buffer 48 65 6c 6c 6f>` instead of text.

### 2.2 Callback — Node's classic non-blocking style

```js
const fs = require('fs');

fs.writeFile('greeting.txt', 'Hello from callback fs!\n', (err) => {
  if (err) throw err;
  console.log('File written.');

  fs.readFile('greeting.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Callback read:', data);
  });
});

console.log('This logs first (non-blocking!)');
```
```
This logs first (non-blocking!)
File written.
Callback read: Hello from callback fs!
```

> **Teaching note:** This is your best live-demo moment for the whole module. Ask students to predict the output order *before* running it — most will guess top-to-bottom. Watching "This logs first" print before "File written" is the exact same lesson as the `readFile` big-file/small-file example from the async lecture, just made concrete with something they can touch (a real file on disk).

**Why the nesting?** The second `readFile` has to live *inside* the first callback, because we can't read the file reliably until we're sure the write finished. This nesting is exactly the "callback hell" problem that motivates the next section.

### 2.3 Promises + async/await — the modern default

```js
const fs = require('fs/promises'); // note: different import path from plain 'fs'

async function main() {
  await fs.writeFile('greeting.txt', 'Hello from promises fs!\n');
  const data = await fs.readFile('greeting.txt', 'utf8');
  console.log('Promise read:', data);
}

main().catch(console.error);
```

**Key differences from the callback version:**
- Import from `'fs/promises'`, not `'fs'`.
- No callback functions — `await` pauses execution *within* the `async function` (without blocking the rest of the program, unlike `Sync`) until each operation finishes.
- Reads top-to-bottom, almost identical in shape to the synchronous version — but non-blocking underneath.

> **Teaching note:** This is the payoff moment — show all three versions side by side and ask: *"Which one reads the most like the Sync version, but behaves like the Callback version?"* That question usually gets the concept to click.

---

## 3. Core Methods Reference

All examples below use `Sync` for brevity in this reference table — remember every one of these has a callback form (same name, no `Sync`, add a callback) and a promise form (same name, no `Sync`, `import from 'fs/promises'`, use `await`).

```js
const fs = require('fs');

// --- Directories ---
if (!fs.existsSync('mydir')) fs.mkdirSync('mydir');
fs.mkdirSync('mydir/nested/deeper', { recursive: true }); // creates nested dirs in one call

fs.writeFileSync('mydir/a.txt', 'a');
fs.writeFileSync('mydir/b.txt', 'b');
console.log(fs.readdirSync('mydir'));
// [ 'a.txt', 'b.txt', 'nested' ]

// --- File info ---
const stats = fs.statSync('mydir/a.txt');
console.log(stats.isFile(), stats.size); // true 1

// --- Rename / move ---
fs.renameSync('mydir/a.txt', 'mydir/renamed.txt');

// --- Copy ---
fs.copyFileSync('mydir/renamed.txt', 'mydir/copy.txt');

// --- Delete a file ---
fs.unlinkSync('mydir/copy.txt');

// --- Delete a folder (and everything inside it) ---
fs.rmSync('mydir', { recursive: true, force: true });

// --- Append instead of overwrite ---
fs.appendFileSync('log.txt', 'new line\n');

// --- Check existence without try/catch ---
console.log(fs.existsSync('log.txt')); // true
```

| Method | What it does | Common gotcha |
|---|---|---|
| `writeFile(Sync)` | Create/**overwrite** a file | Students forget this erases existing content — that's what `appendFile` is for |
| `appendFile(Sync)` | Add to the end without erasing | — |
| `readFile(Sync)` | Read a file's contents | Forgetting `'utf8'` returns a `Buffer`, not a string |
| `mkdir(Sync)` | Create a folder | Fails if the folder already exists *and* you didn't check first — or use `{ recursive: true }`, which also silently succeeds if it already exists |
| `readdir(Sync)` | List a folder's contents | Returns filenames only, not full paths — often needs `path.join(dir, name)` |
| `stat(Sync)` | Get metadata (size, type, timestamps) | `stats.isFile()` and `stats.isDirectory()` are *methods*, not properties — `stats.isFile` (no `()`) is always truthy (it's a function reference) |
| `rename(Sync)` | Rename **or move** a file/folder | Same method does both — moving is just "renaming to a different path" |
| `copyFile(Sync)` | Copy a file | Doesn't work on folders directly |
| `unlink(Sync)` | Delete a file | Cannot delete folders — use `rmdir`/`rm` for that (a frequent source of `EISDIR` errors) |
| `rmdir(Sync)` / `rm(Sync)` | Delete a folder | `rmdir` alone fails on non-empty folders; `rm` with `{ recursive: true }` deletes everything inside too |
| `existsSync` | Check if a path exists | The **only** fs method with no separate callback/promise form — it was intentionally kept simple |

---

## 4. Two Pitfalls Worth Teaching Explicitly

### 4.1 Relative paths are relative to *where you ran `node`*, not where the file lives

This trips up nearly every student at some point, especially once projects have subfolders.

```js
const fs = require('fs');
const path = require('path');

console.log('process.cwd():', process.cwd()); // current working directory — where you ran `node` from
console.log('__dirname:', __dirname);          // folder the SCRIPT FILE lives in — always stable

// Unsafe: 'data.txt' resolves relative to process.cwd(), which changes
// depending on where you run the command from.

// Safe: always build paths from __dirname
const safePath = path.join(__dirname, 'data.txt');
fs.writeFileSync(safePath, 'This always lands next to the script.\n');
console.log('Wrote to:', safePath);
```

Run this same script from two different starting directories and `process.cwd()` changes, but `__dirname` (and therefore where the file actually gets written) stays the same.

> **Teaching note:** Demo this live by running the exact same script twice — once from its own folder, once with `cd ..` first, calling it as `node subfolder/script.js`. `process.cwd()` will differ between runs; `__dirname` won't. This is usually the single most useful debugging habit you can give students working with `fs`.

### 4.2 Reading/writing JSON — a pattern students will use constantly

`fs` only reads and writes **text/binary data** — it has no built-in understanding of JSON. You combine it with `JSON.stringify`/`JSON.parse` yourself:

```js
const fs = require('fs');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');

// Writing an object as JSON (the `null, 2` pretty-prints with 2-space indent)
const config = { username: 'tuan', theme: 'dark', notifications: true };
fs.writeFileSync(configPath, JSON.stringify(config, null, 2));

// Reading it back as a real object
const raw = fs.readFileSync(configPath, 'utf8');
const loaded = JSON.parse(raw);
console.log('Loaded config:', loaded);
console.log('Theme is:', loaded.theme);
```
```
Loaded config: { username: 'tuan', theme: 'dark', notifications: true }
Theme is: dark
```

> **Teaching note:** This exact pattern (`JSON.stringify` before writing, `JSON.parse` after reading) is the backbone of almost every "save app state to a file" exercise — worth naming explicitly as a reusable recipe rather than letting students rediscover it each time.

### 4.3 Bonus: handling errors from `Sync` methods

Unlike callback/promise versions (which pass errors through a callback argument or a rejected Promise), `Sync` methods **throw** — so they need `try/catch`:

```js
const fs = require('fs');

try {
  const data = fs.readFileSync('does-not-exist.txt', 'utf8');
  console.log(data);
} catch (err) {
  console.log('Caught an error!');
  console.log('err.code:', err.code);       // 'ENOENT'
  console.log('err.message:', err.message); // "ENOENT: no such file or directory, open 'does-not-exist.txt'"
}
```
```
Caught an error!
err.code: ENOENT
err.message: ENOENT: no such file or directory, open 'does-not-exist.txt'
```

> **Teaching note:** `err.code` is more reliable to branch on programmatically than `err.message` (the message string can vary slightly by OS). `ENOENT` ("Error NO ENTry") is the code students will see most — worth memorizing what it means the first time it comes up, since it'll recur constantly across `fs`, `require()`, and even `git`.

---

## 5. Suggested Teaching Sequence

A lesson-plan-shaped summary of everything above, in delivery order:

1. **Frame the "why"** — reconnect to REPL exercise (browser vs Node capabilities).
2. **Live-code the Sync example** — simplest mental model, gets students writing/reading a real file fast.
3. **Live-code the Callback example** — have students *predict the output order first*. This is the payoff moment for the async/event-loop lecture.
4. **Live-code the Promises/async-await example** — pose the "reads like Sync, behaves like Callback" framing.
5. **Walk the method reference table** — don't lecture through every row; instead, live-code 2–3 (`mkdir` with `recursive`, `readdir`, `stat`) and let students look up the rest as needed.
6. **Demo the `__dirname` vs `process.cwd()` pitfall live** — run the same script from two folders.
7. **Demo the JSON read/write recipe** — name it explicitly as a pattern they'll reuse.
8. **Assign exercises** — see the companion exercise set (Level 1–3) for practice problems using everything above; recommend students attempt Level 1–2 in class and Level 3 as homework.

---

## 6. Quick Reference Card (for students to keep open while coding)

```js
const fs = require('fs');            // classic API (sync + callback)
const fsp = require('fs/promises');  // promise API, use with async/await
const path = require('path');        // pairs with fs for safe path-building

// Always prefer:
path.join(__dirname, 'somefile.txt')
// over:
'somefile.txt' // relative to cwd — unreliable across environments
```

| I want to... | Use |
|---|---|
| Read a file | `readFile` / `readFileSync` |
| Create or overwrite a file | `writeFile` / `writeFileSync` |
| Add to a file without erasing it | `appendFile` / `appendFileSync` |
| Make a folder (incl. parent folders) | `mkdir(path, { recursive: true })` |
| List a folder's contents | `readdir` / `readdirSync` |
| Get size/type/timestamps of a file | `stat` / `statSync` |
| Rename or move something | `rename` / `renameSync` |
| Copy a file | `copyFile` / `copyFileSync` |
| Delete a file | `unlink` / `unlinkSync` |
| Delete a folder (and contents) | `rm(path, { recursive: true, force: true })` |
| Check if a path exists | `existsSync` (no async equivalent) |
| Save an object to disk | `writeFileSync(path, JSON.stringify(obj, null, 2))` |
| Load an object from disk | `JSON.parse(readFileSync(path, 'utf8'))` |
