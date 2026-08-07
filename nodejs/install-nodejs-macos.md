# Installing Node.js on macOS

> *This instruction sheet was drafted with the help of Claude.ai and has been reviewed and verified by the instructor.*

This guide covers two ways to install Node.js and npm on macOS: using the official installer (simplest) or using Homebrew (recommended if you already use Homebrew or plan to manage multiple tools from the terminal).

---

## Option A: Official Installer (Simplest)

### Step 1: Download Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS (Long Term Support)** version for macOS (`.pkg` file).

### Step 2: Run the Installer

1. Double-click the downloaded `.pkg` file.
2. Follow the installer prompts (Continue → Agree → Install).
3. Enter your Mac password when prompted.
4. Click **Close** when finished.

Node and npm are installed to `/usr/local/bin/` (Intel Macs) or `/opt/homebrew/bin/` is *not* used here — the official installer always uses `/usr/local/bin/`, which is already on your PATH by default on macOS. No manual environment variable setup is normally needed.

---

## Option B: Using Homebrew (Recommended for Terminal Users)

### Step 1: Install Homebrew (skip if already installed)

Open **Terminal** (Cmd+Space, type "Terminal", press Enter) and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. At the end, Homebrew will print one or two commands to add itself to your PATH — **copy and run those commands**. They typically look like:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

> This step is what "adds Homebrew to your environment variables" — it updates your shell's PATH so the `brew` command is recognized.

### Step 2: Install Node.js via Homebrew

```bash
brew install node
```

This installs both `node` and `npm`, and Homebrew automatically places them on your PATH (since Homebrew itself is already on PATH from Step 1).

---

## Step 3: Verify the Installation

In Terminal, run:

```bash
node -v
npm -v
```

You should see version numbers printed (e.g. `v20.11.0` and `10.2.4`).

> If you use both **Terminal** and **iTerm2**, or switch between `bash` and `zsh`, open a fresh window/tab of each and re-run the check — PATH changes only apply to newly opened shell sessions.

---

## Troubleshooting

### "command not found: node"
- Close and reopen Terminal completely (not just a new tab) after installation.
- If using Homebrew, confirm `brew` itself works by running `brew -v`. If that also fails, your shell profile (`~/.zprofile` or `~/.zshrc`) wasn't updated — repeat Step 1 of Option B.
- Check which shell you're using with `echo $SHELL`. Homebrew's setup command differs slightly for `zsh` vs `bash`; the installer output tells you which to use.

### Permission errors when running `npm install -g <package>`
Avoid using `sudo` with npm. Instead, let npm manage global packages in your user directory:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zprofile
source ~/.zprofile
```

### Multiple Node versions conflicting (installed both via .pkg and Homebrew)
- Run `which node` to see which installation is active.
- For coursework, it's simplest to pick **one** method and uninstall the other. To uninstall the Homebrew version: `brew uninstall node`. To remove the `.pkg` install, see Node's official uninstall guide at nodejs.org.

---

## Quick Reference

| Task | Command |
|---|---|
| Check Node.js version | `node -v` |
| Check npm version | `npm -v` |
| Run a JavaScript file | `node filename.js` |
| Start a new npm project | `npm init` |
| Install a package | `npm install <package-name>` |
