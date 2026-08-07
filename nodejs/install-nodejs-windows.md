# Installing Node.js on Windows

> *This instruction sheet was drafted with the help of Claude.ai and has been reviewed and verified by the instructor.*

This guide walks you through installing Node.js on Windows and making sure it works in both **Command Prompt (cmd)** and **PowerShell**.

---

## Step 1: Download Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Download the **LTS (Long Term Support)** version — this is the stable, recommended version for most users (avoid the "Current" version for coursework).
3. The installer file will look like `node-v20.x.x-x64.msi` (version number may differ).

---

## Step 2: Run the Installer

1. Double-click the downloaded `.msi` file.
2. Click **Next** through the setup wizard.
3. Accept the license agreement.
4. Keep the default install location:
   ```
   C:\Program Files\nodejs\
   ```
5. On the **"Custom Setup"** screen, make sure these are all set to install (they are by default):
   - Node.js runtime
   - npm package manager
   - **"Add to PATH"** ← this is the important one for environment variables
6. Click **Next**, then **Install**.
7. If Windows asks for permission (UAC prompt), click **Yes**.
8. Click **Finish** when done.

> 💡 The installer's "Add to PATH" option automatically handles the environment variable setup described in Step 3. Most students can skip Step 3 entirely — it's included here for troubleshooting or manual setup.

---

## Step 3: Manually Add Node.js to Environment Variables (if needed)

If `node` or `npm` is not recognized after installing, follow these steps:

1. Press **Windows key**, type `env`, and select **"Edit the system environment variables"**.
2. In the **System Properties** window, click **Environment Variables...**
3. Under **System variables** (bottom section), find and select the variable named **Path**, then click **Edit...**
4. Click **New** and add:
   ```
   C:\Program Files\nodejs\
   ```
5. Click **OK** on all open windows to save.
6. **Close and reopen** any open Command Prompt or PowerShell windows (this is required — they won't pick up the change until restarted).

---

## Step 4: Verify the Installation

Open **Command Prompt**:
1. Press **Windows key**, type `cmd`, press Enter.
2. Run:
   ```
   node -v
   npm -v
   ```
3. You should see version numbers printed (e.g. `v20.11.0` and `10.2.4`).

Open **PowerShell**:
1. Press **Windows key**, type `powershell`, press Enter.
2. Run the same commands:
   ```
   node -v
   npm -v
   ```

If both terminals print version numbers, Node.js is installed correctly and available system-wide.

---

## Troubleshooting

### "node is not recognized as an internal or external command"
- The PATH variable wasn't updated, or the terminal wasn't restarted after installation.
- Re-check Step 3, then close **all** terminal windows and open a new one.
- Restarting your computer also works if the terminal restart doesn't fix it.

### PowerShell blocks npm scripts with an "execution policy" error
This is specific to PowerShell and doesn't affect cmd. Example error:
```
npm : File cannot be loaded because running scripts is disabled on this system.
```
Fix — open PowerShell **as Administrator** and run:
```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```
Type `Y` to confirm. This allows locally created scripts (like npm's) to run while still blocking unsigned scripts from the internet.

### Installed a new version but the old version number still shows
- Uninstall Node.js via **Settings > Apps**, restart your PC, then reinstall the new version.
- Check for leftover folders at `C:\Program Files\nodejs\` and delete manually if needed.

---

## Quick Reference

| Task | Command |
|---|---|
| Check Node.js version | `node -v` |
| Check npm version | `npm -v` |
| Run a JavaScript file | `node filename.js` |
| Start a new npm project | `npm init` |
| Install a package | `npm install <package-name>` |
