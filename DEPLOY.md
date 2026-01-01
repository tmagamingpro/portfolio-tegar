Deployment checklist — backend + monorepo frontend (Vercel)

1) Prepare & deploy backend (Express)
- Ensure `backend/package.json` has:
  - `"start": "node app.js"`
  - `"engines": { "node": "18.x" }` (optional)
- Ensure `backend/app.js` uses `process.env.PORT` and `process.env.CLIENT_ORIGIN` (CORS).
- Commit & push the `backend` folder.
- Deploy to Render / Railway / Heroku (recommended):
  - Create new Web Service, set Root Directory to `backend`.
  - Start command: `npm start`.
- After deploy, copy the backend URL (e.g. `https://my-backend.onrender.com`).

2) Configure backend env (recommended)
- In your backend host set `CLIENT_ORIGIN` to your frontend origin (e.g. `https://your-site.vercel.app`) to restrict CORS.

3) Prepare frontends
- `admin-dashboard` (React + Vite) already uses `import.meta.env.VITE_API_URL`.
  - In Vercel set Environment Variable `VITE_API_URL` = backend URL.
- `frontend` (static HTML/JS) reads `window.__API_URL__` at runtime.
  - Replace the placeholder `%%API_URL%%` in `frontend/index.html` with your backend URL before deploying, or use a CI step to replace it.
  - Example replace (local):
    ```bash
    sed -i "s|%%API_URL%%|https://my-backend.onrender.com|g" frontend/index.html
    ```

4) Monorepo Vercel config
- `vercel.json` at repo root routes `/admin/*` to `admin-dashboard` and others to `frontend`.
- On Vercel, create a new project from the repo (root). Vercel will use `vercel.json`.
- Add Environment Variable for the project:
  - `VITE_API_URL` = `https://my-backend.onrender.com`

5) Deploy & verify
- Push commits to trigger Vercel deploy.
- Verify these URLs:
  - `/` → portfolio (frontend)
  - `/admin` → admin dashboard (admin-dashboard)
  - API calls from both frontends hit `https://my-backend.onrender.com/api/...`
- If you see CORS errors, adjust `CLIENT_ORIGIN` in backend or allow `*` temporarily.

6) Notes & tips
- For production, avoid storing secrets in plain HTML; prefer server-injected values or build-time env injection.
- If you want `frontend` to read env vars without manual replacement, consider building it with Vite and using `VITE_API_URL` as well.

If you want, I can: (A) replace the placeholder now with a sample backend URL, (B) add a small npm script to replace the placeholder during CI, or (C) guide you through setting `VITE_API_URL` in Vercel. Which do you prefer?
