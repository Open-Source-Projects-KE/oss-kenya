# Open Source Kenya

React + Vite + Supabase.

## Run locally
```bash
npm install
cp .env.example .env   # then fill in your Supabase values
npm run dev
```
Without keys, the app shows built-in sample data.

## Supabase
Run `schema.sql` once in Supabase > SQL Editor. Use the anon public key only.

## Deploy (Netlify / Vercel / Cloudflare Pages)
Build command: `npm run build`, output folder: `dist`.
Add the three `VITE_` variables in the host's environment settings.
