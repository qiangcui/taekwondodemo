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

## 3. Vercel Setup (Clean URLs)
Vercel is better for professional demos because it provides "Clean URLs" without the `#` or subfolder.

1. **Import**: Login to [Vercel.com](https://vercel.com) and import your GitHub repo.
2. **The 404 Fix**: For Single Page Apps (SPA), you must create a `vercel.json` in your root folder:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
3. **Result**: You can now refresh any page (like `/about-us`) without getting a 404 error.

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
| **URL Type** | `user.github.io/repo/` | `repo.vercel.app` |
| **Best For** | Internal testing | Client-facing demo |
| **Page Refresh**| Requires HashRouter or "404 hack" | Works perfectly via `vercel.json` |
| **Automation** | Via GitHub Actions | Instant via GitHub Integration |
