# مؤسسة قمة الأداء للصيانة والعوازل — Qimma Performance Website

Bilingual (Arabic RTL default / English LTR) static website. HTML + CSS + vanilla JS. No backend, no build step, GitHub Pages ready.

## Structure
```
index.html            page (12 sections)
css/style.css         all styling
js/config.js          ALL business details (phones, address, social, tracking IDs, WhatsApp messages)
js/translations.js    ALL Arabic + English text
js/main.js            language switch, nav, gallery/lightbox, FAQ, WhatsApp form, tracking hooks
assets/logo/          original logo files (cropped from the supplied card, never redrawn)
assets/icons/         favicon + app icons
assets/images/        hero/ services/ projects/ about/ backgrounds/  (WebP)
robots.txt, sitemap.xml, .nojekyll
```

## Upload to GitHub
1. Create a new repository on github.com (e.g. `qimma-website`), public.
2. Click **Add file → Upload files**, drag in the *contents* of this folder (so `index.html` is at the repository root), then **Commit changes**.
   (Or with git: `git init && git add . && git commit -m "Initial site" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`.)

## Enable GitHub Pages
Repository **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `/ (root)` → Save.**
After about a minute the site is live at `https://<username>.github.io/<repo>/`.
To use `kdmat.com`, add it under *Custom domain* and point the domain's DNS to GitHub Pages (GitHub shows the exact records).

## Update business details
Edit **js/config.js** only: phones, address, Instagram/X, email, tracking IDs, WhatsApp message text.
Phone/WhatsApp buttons, floating buttons, form, footer and contact section all update automatically.
Also keep the static copies in sync inside `index.html`: the JSON-LD block (phones/address/URL), `canonical`, `og:url`, `og:image`, and `sitemap.xml`/`robots.txt` if the domain differs from `https://kdmat.com`.

## Update text
Edit **js/translations.js** (keys are the same in `ar` and `en`). The Arabic text is also written in `index.html` for search engines — change both if you change Arabic wording.

## Replace the images with real photos
Every image is a local file. To swap one, save your photo with the **same file name and size ratio** (WebP/JPG converted to WebP, ideally under 200 KB) into the same folder:
- `hero/hero-riyadh-rooftop-dusk.webp` (1920×1080) and `…-mobile.webp` (1080×1350), `hero/og-image.jpg` (1200×630, social preview)
- `services/service-*.webp` (1200×900, one per service)
- `projects/*.webp` (1000×750, gallery) — captions are in translations.js (`g1`…`g10`)
- `about/about-building-protection.webp`, `backgrounds/*.webp`
Current images are **AI-generated illustrative images (cropped from a contact sheet, so low resolution: roughly 225x180 px originals upscaled), not company projects**; for best sharpness regenerate each one separately at 1024 px or larger, especially the two hero images; they are labeled "illustrative" on the page. When you replace gallery images with your real completed jobs, delete the `work.badge` badge/`work.note` notice (or edit them) so the page is accurate. Only use photos you own or that are licensed for commercial use (e.g. Unsplash / Pexels / Pixabay licence terms).

## Tracking (Google Ads, Meta, TikTok)
Paste real IDs into `tracking` in js/config.js: `gtmId`, `ga4Id`, `metaPixelId`, `tiktokPixelId`. Empty = nothing loads.
Events pushed to `dataLayer` / pixels: `phone_click`, `whatsapp_click`, `form_whatsapp_submit`, `language_switch`.
Mark `whatsapp_click`/`phone_click` as conversions in Google Ads / GA4 / Meta / TikTok.

## Items to verify before publishing
- **Email** in the logo reads `mwsshqmhalada@gmail.com`. Not verified, so it is hidden. Confirm it, then set `showEmail: true`.
- **Website URL** `kdmat.com` is used for canonical/OG/schema. Change if the site lives elsewhere.
- **Instagram** `mossat_qamt_alada` and **X** `QEMAHALADA` links are built from the supplied usernames — click both to confirm.
- **Map:** no pin is embedded because only a road + district was supplied. The button opens a Google Maps *search* for the address. Put a verified embed URL in `mapEmbedUrl` to show a map.
- **Reviews:** placeholders only. Replace the three `.rev` blocks with real, consented reviews.
- **Before/after:** not included (no real matching photos). Add when available.
