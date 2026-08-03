# MTD Studio — Coming Soon Page

A static "coming soon" countdown landing page, styled with an iOS-inspired
"liquid glass" look: frosted cards, soft ambient gradients, tabular countdown
widgets, and a grouped-list contact form. Pure HTML, CSS and vanilla JS —
no build step, no frameworks.

## Files

```
mtd-portfolio/
├── index.html      → page structure & content
├── style.css       → all styling (design tokens at the top)
├── script.js       → countdown timer, clock, contact form logic
└── assets/
    ├── favicon.png     → your web/browser icon
    └── logo-full.png   → your full logo, shown in the hero
```

## 1. Put this on GitHub Pages (drag & drop, no terminal needed)

1. Go to **github.com** → click the **+** in the top right → **New repository**.
2. Name it whatever you like. For a personal/main site, name it
   `yourusername.github.io` (it will publish at the root domain). For a
   project site, any name works and it'll publish at
   `yourusername.github.io/repo-name`.
3. Keep it **Public**, then click **Create repository**.
4. On the empty repo page, click **"uploading an existing file"**.
5. Drag in **all the contents of this folder** (`index.html`, `style.css`,
   `script.js`, and the `assets` folder with both images inside it) —
   keep the folder structure exactly as shown above.
6. Scroll down, click **Commit changes**.
7. Go to **Settings → Pages** (left sidebar).
8. Under **Build and deployment → Source**, choose **Deploy from a branch**.
9. Under **Branch**, choose `main` and folder `/ (root)`, then **Save**.
10. Wait 1–2 minutes, refresh — GitHub will show your live URL at the top
    of that Pages settings screen.

That's it — everything here is static and 100% compliant with GitHub Pages
(no server code, no build process).

## 2. Set your real launch date

Open `script.js` and edit the top of the file:

```js
const LAUNCH_DATE = new Date("2026-09-15T09:00:00");
```

Change the date/time to whenever you're actually launching.

## 3. Connect the contact form (required — GitHub Pages has no backend)

GitHub Pages only serves static files, so the form needs a free form
backend to actually deliver emails to you. The page is already wired for
[Formspree](https://formspree.io) (no code, just a link):

1. Create a free account at formspree.io.
2. Create a new form, and copy the endpoint it gives you
   (looks like `https://formspree.io/f/abcdwxyz`).
3. Open `index.html`, find this line:
   ```html
   <form class="contact__card" id="contactForm" action="https://formspree.io/f/yourFormID" method="POST" novalidate>
   ```
4. Replace `yourFormID` with your real endpoint.
5. Commit the change. Submissions will now land in your Formspree inbox
   (and can be forwarded to your email).

Until you do this, the button will show a friendly reminder instead of
silently failing.

## 4. Customize

- **Colors, spacing, radii** — all defined as CSS variables at the top of
  `style.css` under `:root`. Change `--red` if your brand red differs
  slightly from the sampled logo color.
- **Copy** — headline, subhead and section text live directly in
  `index.html`.
- **Logo/icon** — swap the files inside `assets/` (keep the same
  filenames, or update the `src`/`href` paths in `index.html`).
