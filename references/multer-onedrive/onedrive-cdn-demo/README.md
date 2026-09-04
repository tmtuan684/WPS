# Multer Upload vs. OneDrive-as-CDN — Demo App

A small Express app for demonstrating two things side by side:

1. **Part 1 — Ordinary Multer upload.** A standard `diskStorage` upload
   (with `fileFilter` + `limits`, same pattern as the Practice Lab), saved to
   this server's own `uploads/` folder.
2. **Part 2 — OneDrive as a "CDN" (Option A: manual link).** The app does
   **not** call OneDrive's API. You upload a file to OneDrive yourself, copy
   the "Embed" link OneDrive generates, and paste it into the form. The app
   automatically converts that `embed` link into a direct `download` link
   and renders it as an `<img>` — demonstrating a file being served from an
   external host instead of your own server.

## Run it

```bash
npm install
npm start
```

Then open http://localhost:3000

## How to get a OneDrive link for Part 2

1. Upload a file to OneDrive (**personal** Microsoft account — the Embed
   option isn't available on OneDrive for Business/SharePoint accounts).
2. Right-click the file → **Embed** → click **Generate**.
3. Copy the link. It looks like:
   `https://onedrive.live.com/embed?cid=...&resid=...&authkey=...`
4. Paste it into the "Register CDN link" form in the app — it will show up
   converted to:
   `https://onedrive.live.com/download?cid=...&resid=...&authkey=...`

## What this demo is (and isn't) showing

- It **is** a working example of taking a manually-generated link and
  turning it into something usable as an image source — the one part of
  "OneDrive as CDN" that's easy to automate without the Graph API.
- It is **not** uploading files to OneDrive automatically — that would
  require the Microsoft Graph API + an Azure app registration (see the
  Deployment Guide's discussion of "Option B" for that version).
- It's for demonstration only: uploaded files and registered links are kept
  in memory and reset every time the server restarts. Nothing here is
  production-shaped (no persistence, no auth, no rate limiting).
