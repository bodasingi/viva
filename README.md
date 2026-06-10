# Viva — Local Run Instructions

## Prerequisites
- Node.js (v14+ recommended) and npm installed: https://nodejs.org/

## Install
From the project root (`.`):

```bash
npm install
```

## Run the app
Start the local static server:

```bash
npm start
```

Then open your browser at: http://localhost:8080

## Alternatives
- Without installing dependencies, run with npx:

```bash
npx http-server -c-1 . -p 8080
```

## Files
- The app entry points are in the project root: `index.html`, `script.js`, `styles.css`.

## Deploy to GitHub Pages
This is a static site and can be deployed using GitHub Actions.

1. Commit and push to the `main` branch:

```bash
git add .github/workflows/deploy.yml README.md
git add .
git commit -m "Add GitHub Pages deployment"
git push origin main
```

2. GitHub Actions will run the workflow and publish the site.

3. The site will be available at:
   - `https://<username>.github.io/<repository>`

Notes
- If your repository uses a different branch for Pages, update the `branches` section in `.github/workflows/deploy.yml`.
- The workflow copies only the static site files into the `public/` folder and creates a `.nojekyll` file so GitHub Pages serves it correctly.
