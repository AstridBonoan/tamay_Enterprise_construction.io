# Tamay Enterprises Website

Next.js + React + Tailwind replica of [tamayenterprises.com](https://tamayenterprises.com/), with **mobile-first** layout and a **left slide-out navigation drawer**.

**Live site (after setup):** https://tamayenterprises.github.io/TamayEnterprisesOffical.io/

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Homepage media

Your files live in `public/homepage/`:

- `HomePageVideo.mp4` — hero background video
- `HomePageImage1.webp` … `HomePageImage11.webp` — carousel & service sections

## GitHub Pages (required setup)

1. Push to [TamayEnterprisesOffical.io](https://github.com/tamayenterprises/TamayEnterprisesOffical.io).
2. GitHub Actions builds the site and publishes to the **`gh-pages`** branch.
3. In the repo: **Settings → Pages → Build and deployment**
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages` / `/ (root)`
4. Wait for the workflow to finish, then open the Pages URL above.

Workflow file: `.github/workflows/deploy-github-pages.yml`

## Production build (matches CI)

```bash
set GITHUB_PAGES=true
set NEXT_PUBLIC_BASE_PATH=/TamayEnterprisesOffical.io
npm run build
```

Output is in `out/`.
