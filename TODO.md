# Portfolio TODO

The site is being turned from the agency template into Daffa's personal portfolio (brand direction **A · Canvas**, see `handoff/brand/brand-directions.md`). The plan is to work **one page at a time**.

Almost all copy lives in `src/data/site.ts`. Interactive behavior lives in `public/js/` and styles in `public/css/`.

---

## ✅ Done: identity and global data

- [x] Brand name "Daffa" (loader, ruler, footer wordmark, `daffa.fig`), full name Daffa Hanifisyafiq
- [x] Top-left ruler logo shows the full name (just "DAFFA" on phones ≤520px)
- [x] CV button (top right) opens the PDF in a preview dialog with Download / Open PDF (loads only on first open)
- [x] Tab icon turns into 👻 while the visitor is on another tab (`public/favicon-away.svg`)
- [x] Logo: **df.** mark (dark tile, white df, orange dot) in `public/brand/mark.svg` + full favicon set (svg, ico, apple-touch, android, web manifest)
- [x] OG image: `public/brand/og.png` 1200×630 (from `og.svg`), df. mark in a selection frame, label daffah.my.id
- [x] Role: Frontend Developer (tab title, SEO description, JSON-LD `Person`)
- [x] Email: daffahan29@gmail.com (topbar, footer, contact form recipient)
- [x] Socials: Instagram, LinkedIn, GitHub
- [x] Since 2020
- [x] Domain: https://daffah.my.id (`site.url` + `astro.config.mjs`)
- [x] WhatsApp: 6283862095217
- [x] Teammate cursor name: Nuril
- [x] Location: Semarang, Indonesia (WIB)
- [x] Hero: particle name, badge, sub line, corner labels, live day/date/time in the right corner
- [x] Ruler mark override bug fixed (`public/css/brand.css`)

## ⏳ Still needed: personal data

- [x] Photo of Daffa: `public/images/me/daffa.webp`

---

## Page 1: Home (`/`, `src/pages/index.astro`)

Work through it one section at a time, top to bottom. Each section's copy lives under the matching key in `site.ts`.

- [x] **Hero** (`hero`, `src/components/home/Hero.astro`)
  - [x] Design ⇄ Code toggle (bottom center): particles scatter, `Hero.tsx` types out (`hero.view` in `site.ts`)
  - [x] Live weather under the date in the right corner, in place of the time (shared from the CTA weather fetch in `13.js`), gray like the left corner
- [x] **Work slider** (`projects`, `WorkSlider.astro`): 7 real projects from daffa-portfolio-v2 (Rodex removed), 16:9 frames (`public/css/work-slider.css`)
  - [x] No project years (decided); the `year` field stays available if that changes
  - [ ] Add a heading above the slider? (the template has none)
- [x] **About**, replaced by "Nice to meet you" from the handoff (`about`, `About.astro`, `public/css/about.css`)
  - [x] Hello card copy, "What I do" (responsive design, design to code, interactions & motion, accessibility, performance, API integration), "currently building with"
  - [x] Quick facts confirmed (Semarang, 2020, Bahasa & English, Frontend & UI)
  - [x] Real photo: `public/images/me/daffa.webp` (819×1024)
- [x] **How I got here** (`experience`, `Experience.astro`): Figma "Version history" with 4 versions from the CV (Mitra Kasih Perkasa, Rect Media, Widya Robotics, Udinus); tabs work with the keyboard
- [x] **Work log** (`process`, `Process.astro`): "Real work. Real numbers." Slack-style thread with real moments from the CV (kiosk, Eid peak, 10 months, rebuild)
  - [ ] Hidden for now (commented out in `src/pages/index.astro`); show it when ready
- [x] **What I build** (`services`, `Services.astro`): Web Apps & Dashboards, Websites & Landing Pages, Kiosk & Embedded UIs; posters reuse project screenshots
  - [x] Nav and footer label "What I build" (still links to `#services`)
- [x] **The difference** (`difference`, `TheDifference.astro`): "same design. different developer." (the usual handoff vs Daffa)
- [ ] **Testimonials** (`testimonials`, `Testimonials.astro`): 6 fake clients (Client A–F), video posters and avatars in `public/images/people/`
  - Hidden for now (commented out in `src/pages/index.astro`; nav + footer links commented in `site.ts`)
- [x] **CTA day/night + weather** (`cta`, `Cta.astro` + `public/js/home/13.js`): time states in Semarang (WIB) plus real weather from Open-Meteo (rain, rainy night, thunderstorm, cloudy); first-person copy
- [ ] **Pricing** (`pricing`, `Pricing.astro` + `public/js/home/11.js`): $1,499 / $1,999 subscription plans. Remove or replace?
  - Hidden for now (commented out in `src/pages/index.astro`; nav + footer links commented in `site.ts`)
- [ ] **FAQ** (`faq`, `Faq.astro`): questions about the agency subscription
  - Hidden for now (commented out in `src/pages/index.astro`)
- [x] **Drop fun** (`dropfun`, `DropFun.astro`): kept; sub line now "I built it anyway…"
- [ ] **Footer** (`footer`, `Footer.astro`): eyebrow and button copy
  - [x] "Company" column removed; Contact now sits in the first column, renamed "Explore"
  - [x] Bottom-left label shows the domain (daffah.my.id) instead of `daffa.fig`
- [x] **Nav**: Home, About, Experience, What I build, Work, Contact (Reviews and Pricing stay hidden with their sections)

## Page 2: Work (`/work`, `src/pages/work/index.astro`)

- [x] Real projects in `projects` (7 projects, screenshots in `public/images/work/`)
- [x] Intro copy: "Work I’ve shipped", frontend on every one, the public count comes from the data; bottom button "Talk with me"
- [x] LIVE badge only for projects with a public link; the rest show their platform (Kiosk, Web app…). Cards are 16:9 like the screenshots
- [x] Filters: none on the page (the template script stays dormant); 7 projects is short enough
- [x] Personal projects mixed into the grid (decided: mixed, not a separate section): Cawang, Kashiru, Prologue, Kingslock with `kind: 'personal'` → "Personal" badge, Role "Solo, full stack", GitHub link on the case study
  - [x] Kashiru and Kingslock images: screenshots of their new landing pages (1600×900)
  - [ ] Prologue image is its OG image padded to 16:9; swap for an in-app board/dashboard shot when there is one

## Page 3: Case study (`/work/[slug]`, `src/pages/work/[slug].astro`)

- [x] Title, full description, facts (role, industry, platform, stack) and live link come from the real data
- [x] Story (big scroll-fill text) and "What I worked on" highlights per project (`story`, `highlights` in each `project({...})`), from the CV, the old descriptions and the screenshots
- [x] Look & feel, page tour and "Up close" strip are hidden until there are real assets (palette/fonts, full-page shot, 2+ screenshots); "More work" copy in first person
- [x] Tiket Kapal numbers (Eid peak, the rebuild) confirmed as that project

## Page 4: Contact (`/contact`, `src/pages/contact.astro`)

- [x] Hero copy in first person: "Show me the idea." (matches the footer button), reply within a day, pins from Daffa and Nuril
- [x] Form, success and error copy in first person; side cards: email, status, what I build, Semarang (WIB, UTC+7)
- [x] No form backend (formsubmit.co removed): the brief opens in WhatsApp or the visitor's email app

## Page 5: 404 (`src/pages/404.astro`)

- [x] Copy was already neutral; added an empty Figma frame ("frame-404", 0 × 0), Back to home + See my work buttons, more room

---

## Dark mode (trial, branch `feat/dark-mode`)

- [x] Night version of every page: night sky with stars, dimmed clouds, dark frames, light text; brand orange unchanged
- [x] Toggle (sun / moon) at the end of the nav pill, shown at every width; the choice is saved, otherwise it follows the system setting; set before the first paint (no white flash); circular reveal where view transitions exist
- [x] `public/css/<page>-dark.css` are **generated**: after editing any stylesheet in `public/css`, run `node scripts/build-dark-css.mjs`. Hand-written fixes go in `scripts/dark/shared.css` (or `scripts/dark/<page>.css`), never in the generated files
- [x] Canvases follow the theme: ruler ticks (`00.js`, `sub/01.js`) and the ink particles of the hero name (`06.js`)
- [ ] Decide: keep or roll back

## Saved for later

- `handoff/sections-about-experience.md`: "Nice to meet you" + "How I got here" sections, both built now (on branch `docs/handoff-about-sections`)
- `handoff/brand/brand-directions.md`: the 3 brand directions. **C · Sticker Sheet** is saved for a future website (on branch `docs/handoff-about-sections`).

## Lighthouse (mobile, local production build)

- [x] Home 92–95 / a11y 97 / best practices 100 / SEO 100; Work, case study and Contact a11y 100
- [x] Fixed: contrast on the Contact and Work buttons and small gray labels, `role="img"` on the handwritten scribbles, srcset on Work cards and case study covers
- [x] Online (Vercel) 2026-11-21: Home 98, Work / case study / Contact 100; SEO 100 everywhere
- [x] Cache headers in `vercel.json` (fonts and versioned CSS/JS for a year, images a day); before this every asset was `max-age=0`
- [x] What I build posters use the 1024px copies (home images 358 → 282 KB)
- [x] Each case study has its own link-preview image (`public/images/og/<slug>.jpg`)
- [ ] Later: trim unused template CSS in `work.css` / `case.css` (render-blocking, ~150–300 ms), JSON-LD for case studies (BreadcrumbList, CreativeWork), sharper case study titles
- [ ] Two decorative bits still flag contrast on Home: the blue slug label on slider cards and the faint big number in What I build (left as designed)
