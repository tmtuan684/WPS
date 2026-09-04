# multer-cdn-demo

Demonstration app for the **Multer Deployment Guide** (Section 3): Express + Multer
+ Cloudflare R2, with file storage kept off the app server so it works on any
ephemeral / serverless free host.

## Key idea

- Multer uses `memoryStorage()` — the upload lands in `req.file.buffer`, nothing
  is written to this server's disk.
- The buffer is handed to object storage (Cloudflare R2 / any S3-compatible
  service), which durably stores it and serves it back over a CDN URL.
- `req.file` has **no `.path`** in this setup — only `.buffer`.

## Run locally

```bash
npm install
cp .env.example .env
npm start
```

Open http://localhost:3000.

- **No `R2_*` values in `.env`** → the app runs in **demo mode**: uploads are held
  in memory and served by the app at `/files/:key`. Enough to see the full flow.
- **`R2_*` values filled in** → uploads go to your real R2 bucket and the page
  shows the public CDN URL.

## Deploy (free stack from the guide)

- **Compute:** Render free web service. It auto-detects Node; start command
  `npm start`. Reads `process.env.PORT` automatically.
- **Storage + CDN:** Cloudflare R2 free bucket (10 GB, zero egress).
- Set `R2_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `R2_BUCKET`,
  `R2_PUBLIC_URL` in the Render dashboard — never commit `.env`.
- Scope the R2 access keys to that one bucket.
- First request after idle is a slow cold start on free tiers — expected.

## Checklist (from the guide)

- [x] `diskStorage` replaced with `memoryStorage`
- [x] `.env` in `.gitignore`
- [x] `app.listen()` reads `process.env.PORT`
- [x] `fileFilter` + `limits` applied before anything reaches storage
- [x] Filenames sanitized + made unique before use as a storage key
- [ ] R2 access keys scoped to one bucket (do this when you create the keys)
- [ ] Bucket / policy allows public reads (or serve via signed URL)
