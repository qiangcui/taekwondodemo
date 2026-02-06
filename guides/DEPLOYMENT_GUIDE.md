# 🚀 AI Studio: Website Deployment & Operations Guide

This guide explains how to set up and maintain a modern React/Vite website with dual support for **GitHub Pages** (demo/testing) and **Vercel** (production/clean URLs).

---

## 1. The "Smart Path" Secret (Image Fix)
GitHub Pages hosts in a subfolder (`/repo-name/`), while Vercel hosts at the root (`/`). To make images work on both, **never hardcode paths**.

### Step A: Configure `vite.config.ts`
Add this logic to detect the environment automatically:
```ts
// vite.config.ts
export default defineConfig({
  // ... other config
  base: process.env.GITHUB_ACTIONS === 'true' 
    ? '/your-repo-name/' 
    : '/',
})
```

### Step B: Using Images in Components
Always prefix your asset paths with `import.meta.env.BASE_URL`:
```tsx
// Instead of: <img src="/assets/logo.png" />
// Use:
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
<img src={`${base}/assets/logo.png`} />
```

---

## 2. GitHub Pages Setup (with Actions)
1. **GitHub Settings**: Go to `Settings > Pages`.
2. **Build and Deployment**: Set "Source" to **"GitHub Actions"**.
3. **The Workflow**: Create `.github/workflows/deploy.yml` (AI Studio can generate this for you).
4. **Result**: Every `git push` will now automatically update `yours.github.io/repo-name/`.

---

## 3. Vercel Setup (Push to GitHub → Auto-Deploy)
You don’t deploy to Vercel manually. Connect the repo once in Vercel; after that, **every push to GitHub deploys to Vercel automatically**.

1. **Connect the repo**: Log in at [vercel.com](https://vercel.com) → **Add New** → **Project** → **Import** your Git repository (`qiangcui/taekwondodemo`).
2. **Set the project name**: When configuring the import, set **Project Name** to `taekwondodemo` (or any name you want). That becomes `taekwondodemo.vercel.app`.
3. **Build settings**: Leave as default (Framework Preset: Vite, Build Command: `npm run build`, Output Directory: `dist`).
4. **Deploy once**: Click Deploy. From then on, **every push to `main`** will trigger a new Vercel build and deploy—no extra steps.
5. **SPA routing**: The repo already has a `vercel.json` that rewrites all routes to `/index.html`, so refreshes on routes like `/about-us` work.

---

## 4. Daily Operations with AI Studio
When working with me (AI Studio), you can use these commands to keep your site live:

*   **"Fix and Push"**: *"I changed the logo, please push it to main."*
*   **"Check Build"**: *"Can you check if my last GitHub Action deployment was successful?"*
*   **"Environment Check"**: *"Make sure the new images I added use the Smart Path logic."*

---

## 5. Dual-Deployment Summary
| Feature | GitHub Pages | Vercel |
| :--- | :--- | :--- |
| **URL Type** | `user.github.io/taekwondodemo/` | `taekwondodemo.vercel.app` (or your chosen name) |
| **Best For** | Internal testing | Client-facing demo |
| **Page Refresh**| Requires HashRouter or base path | Works via `vercel.json` rewrites |
| **Automation** | `.github/workflows/deploy.yml` | Vercel Git integration (push to GitHub → auto-deploy) |
