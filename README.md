# Talent Tree

A fan-made talent tree calculator, rebuilt from the original game's data
(node positions, prerequisites, skill effects, and icons all sourced from
the live site/game files — see the code comments for details).

## Running it locally (to test before publishing)

You'll need [Node.js](https://nodejs.org) installed (any recent version).

```
npm install
npm run dev
```

This opens the app at `http://localhost:5173`. Use this to check everything
works before pushing to GitHub.

## Publishing to GitHub Pages (free hosting)

1. **Create a new repository on GitHub** (github.com → New repository).
   Name it whatever you like — e.g. `talent-tree`.

2. **Edit `vite.config.js`** — change the `base` line so it matches your
   repo's name exactly:
   ```js
   base: "/your-repo-name/",
   ```
   (If you skip this step, the deployed site will load a blank page, since
   the assets will be requested from the wrong path.)

3. **Push this project to your new repo:**
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```

4. **Turn on GitHub Pages:**
   In your repo on GitHub → **Settings → Pages** → under "Build and
   deployment", set **Source** to **GitHub Actions**.

5. **That's it.** A workflow (already included in `.github/workflows/deploy.yml`)
   will automatically build and deploy the site every time you push to
   `main`. After the first push finishes (check the "Actions" tab for
   progress, usually ~1 minute), your site will be live at:
   ```
   https://<your-username>.github.io/<your-repo-name>/
   ```

## Making changes later

Anyone who clones this repo can edit `src/TalentTree.jsx` directly — it's a
single self-contained file. A few notable spots if you or others want to
extend it:

- **`PRESET_BUILDS`** near the top of the file — add new class build guides
  here. Format and instructions are commented right above it.
- **`ICON_B64`** — all icons are embedded as base64 so the whole app is one
  file with no external image hosting needed. To swap or add icons, replace
  the relevant base64 string (any base64 PNG encoder works).
- Known gaps are called out in code comments where they occur (e.g. the
  nebula star leveling system currently has no real cost data, so leveling
  there is free/uncapped until that data is found).

After editing, just commit and push to `main` — the site redeploys
automatically.
