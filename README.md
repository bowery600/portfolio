# Ethan Hood — Portfolio

Personal site for Ethan Hood. Vite + React + Tailwind, deployed to GitHub Pages at **https://ethanhood.me**.

## Develop

```bash
npm install
npm run dev          # local dev server
npm run build        # production build to dist/
npm run preview      # serve the production build locally
```

## Drop-in assets you still need to add

Place these files into `public/` before the first deploy:

| File | Purpose |
|---|---|
| `Ethan-Hood-Resume.pdf` | Linked from the navbar and mobile sheet |
| `og.png` | 1200×630 social-share image (LinkedIn / Twitter / iMessage previews) |
| `apple-touch-icon.png` | 180×180 home-screen icon for iOS |

Everything else (`favicon.svg`, `CNAME`, `robots.txt`, `sitemap.xml`, `.nojekyll`) is already in place.

## Deploy (GitHub Pages, custom domain)

1. Push this repo to GitHub. Any repo name works — the custom domain is set via `public/CNAME`.
2. In the repo settings → **Pages** → set **Source** to **GitHub Actions**.
3. The workflow at `.github/workflows/deploy.yml` builds on every push to `main` and publishes to Pages.
4. In your DNS, point `ethanhood.me` to GitHub Pages:
   - `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (apex)
   - `CNAME` `www` → `<your-github-username>.github.io`
5. After DNS propagates, enable **Enforce HTTPS** in repo settings → Pages.

## Tech

- Vite 5, React 18
- Tailwind CSS 3.4 (config in `tailwind.config.js`)
- Framer Motion for entrance + scroll animations
- Lucide React icons
- Fraunces (serif headlines) + Inter (UI) via `@fontsource-variable`

## Accessibility / quality

- Skip-to-content link
- Reduced-motion respected globally (CSS) and per-component (Framer Motion)
- Mobile menu: Escape to close, focus restored to trigger, focus moved to first link on open, `aria-controls` wired
- Safe-area insets respected in Hero scroll indicator, mobile menu sheet, and Footer
- All interactive elements have visible `focus-visible` rings
- Body and small text contrast ≥ 4.5:1
