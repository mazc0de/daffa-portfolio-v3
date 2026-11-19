# Handoff: "Nice to meet you" + "How I got here"

Two sections for a personal portfolio, built for this Astro project. They match the existing site's look: sky background, Figma-canvas details, and the same fonts, colors and cards. The rest of that experiment was discarded. This file has everything needed to rebuild these two sections later.

| Section | What it is | Anchor |
|---|---|---|
| **Nice to meet you** | A grid of cards ("bento"): portrait shown as a selected Figma frame, a hello statement, quick facts, skills, and "currently learning" | `#about` |
| **How I got here** | Work history shown as Figma's **Version history** panel. Pick a version on the left and its frame opens on the canvas | `#experience` |

All copy in the data file below is **example content** (the name "Raka Pratama", roles, companies). Replace it with real data.

---

## 1. What these sections depend on (already in the repo)

They reuse the home page's look, so the page that renders them must load the same assets as `src/pages/index.astro` does today:

- **Fonts:** `homeFonts` from `src/data/assets.ts` (Bricolage Grotesque, Hanken Grotesk, Space Mono, Shantell Sans).
- **CSS:** `/css/home.css`, then the new `/css/about-sections.css` (section 4). Order matters.
- **Tokens from `home.css` `:root`:** `--ink #14202B`, `--ink-soft #4A6173`, `--ink-faint #8AA6B8`, `--brand #F0531C`, `--tool #0D99FF`, `--frame #fff`, `--soft #F1F6FA`, `--line-2 #14202b22`, `--sh`, `--mono`, `--display`, `--body`, `--hand`.
- **Classes reused from `home.css`:** `.wrap`, `.sec-head` (+ `.scribble`, `.note`, `h2`), `.reveal`, `.bento`, `.stagger`, `.cell`, `.clbl`, `.c-stmt` + `.stmt-quote/.stmt-head/.stmt-em/.stmt-sub/.stmt-foot2/.stmt-sign2/.stmt-avail2`, `.c-skills .chips .chip`, `.c-now` (+ `.label .nbig .tools .tchip .eq`).
- **Icons:** `src/components/home/icons.ts`. `s2`–`s7` are the chip icons, `s8` is the frame icon and `s10` is the cursor.
- **JS:** `/js/home/00.js` adds `.in` to `.reveal` and `.stagger` elements when they scroll into view. Without it the cards stay invisible (`opacity:0`). The version-history tabs use their own small inline script (it's in the component).

> **Gotcha:** don't load every `/js/home/NN.js` on a page that lacks their sections. `11.js` (pricing) has no null check and throws. On the experimental page this set worked: `[0, 3, 6, 7, 8, 9, 15, 17, 20, 22]`. `00.js` is the only one these two sections need.

---

## 2. Data: `src/data/about.ts`

```ts
// Content for the "Nice to meet you" and "How I got here" sections.
// Everything here is EXAMPLE copy: replace it with your own.
export const about = {
  name: 'Raka Pratama',
  /** short name for the cursor tag on the portrait */
  short: 'Raka',
  role: 'Product designer & front-end developer',
  /** put your photo in /public/images/me/ (portrait, ~4:5) */
  photo: '/images/me/portrait.svg',
  status: 'open to new work',
  since: '2019',

  intro: {
    scribble: 'a little about me',
    heading: 'Nice to meet you',
    note: 'the short version, i promise.',
    lead: 'I turn messy product ideas into screens people',
    em: 'get on the first try.',
    /** HTML allowed (<b>) */
    bio:
      'Six years across fintech, logistics and e-commerce taught me that most design problems are really <b>clarity problems</b>. I sketch, prototype and ship the front-end myself, which keeps the details from getting lost between design and code.',
    facts: [
      { k: 'Based in', v: 'Jakarta, Indonesia' },
      { k: 'Doing this for', v: '6+ years' },
      { k: 'Speaks', v: 'Bahasa, English' },
      { k: 'Best at', v: 'Product UI & front-end' },
    ],
    /** icon: layout | code | layers | target | play | grid | search */
    skills: [
      { label: 'Product design', icon: 'layout' },
      { label: 'Design systems', icon: 'grid' },
      { label: 'Front-end', icon: 'code' },
      { label: 'Prototyping', icon: 'target' },
      { label: 'Motion', icon: 'play' },
      { label: 'Research', icon: 'search' },
    ],
    nowLabel: '▶ currently learning',
    now: 'WebGL & shader art',
    tools: ['Figma', 'Astro', 'TypeScript'],
  },

  experience: {
    scribble: 'the long story',
    heading: 'How I got here',
    note: 'every job, saved as a version.',
    /** newest first. `current: true` adds the "Current version" badge */
    versions: [
      {
        role: 'Senior Product Designer', company: 'Company One', period: '2024 – now', current: true,
        place: 'Jakarta · hybrid',
        summary: 'Leading design for a payments app used by small merchants across Indonesia.',
        points: [
          'Rebuilt onboarding so new merchants take their first payment in under 10 minutes.',
          'Started and maintain the design system shared by 4 product squads.',
          'Pair with engineers weekly and ship front-end fixes myself.',
        ],
        tags: ['Fintech', 'Design system', 'React'],
      },
      {
        role: 'Product Designer', company: 'Company Two', period: '2022 – 2024',
        place: 'Remote',
        summary: 'Designed the driver and dispatcher apps for a last-mile logistics startup.',
        points: [
          'Redesigned the dispatch board that 300+ operators use all day.',
          'Ran field research with drivers to cut failed deliveries.',
          'Built clickable prototypes in code to test on real devices.',
        ],
        tags: ['Logistics', 'Mobile', 'Research'],
      },
      {
        role: 'UI Designer & Front-end Developer', company: 'Company Three', period: '2020 – 2022',
        place: 'Jakarta',
        summary: 'Designed and built marketing sites and storefronts for agency clients.',
        points: [
          'Shipped 25+ websites from Figma to production.',
          'Introduced a component library that halved build time for new sites.',
        ],
        tags: ['Agency', 'Web', 'Astro'],
      },
      {
        role: 'Freelance Designer', company: 'Self-employed', period: '2019 – 2020',
        place: 'Anywhere',
        summary: 'Logos, landing pages and my first paid apps, mostly for local businesses.',
        points: [
          'Learned to scope, price and deliver work on my own.',
          'Taught myself HTML, CSS and JavaScript to build what I designed.',
        ],
        tags: ['Branding', 'Landing pages'],
      },
    ],
  },
};
```

---

## 3. Components

### 3a. `src/components/about/NiceToMeetYou.astro`

Grid on desktop (12 columns): portrait `5 cols × 2 rows`, statement `7 × 2`, then facts / skills / now at `4` each.

```astro
---
// "Nice to meet you" bento: portrait frame, hello statement, quick facts, skills, currently learning.
// Reuses bento/cell/chip styles from home.css; the about-* classes live in /css/about-sections.css.
import * as i from '../home/icons';
import { about as me } from '../../data/about';
const a = me.intro;
const icons: Record<string, string> = {
  layout: i.s2,
  code: i.s3,
  layers: i.s4,
  target: i.s5,
  play: i.s6,
  grid: i.s7,
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></svg>',
};
---
<section class="about me-about" id="about">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="scribble me-scribble">{a.scribble}</span>
      <h2>{a.heading}</h2>
      <span class="note">{a.note}</span>
    </div>

    <div class="bento stagger me-bento">
      <figure class="cell me-photo" style="--i:0">
        <span class="me-flab"><Fragment set:html={i.s8} />portrait.png</span>
        <div class="me-frame">
          <img src={me.photo} alt={`Portrait of ${me.name}`} width="480" height="600" loading="lazy" decoding="async" />
          <span class="me-hd tl"></span><span class="me-hd tr"></span><span class="me-hd bl"></span><span class="me-hd br"></span>
        </div>
        <span class="me-dim">480 &times; 600</span>
        <span class="me-curs" aria-hidden="true"><Fragment set:html={i.s10} /><span class="me-nm">{me.short}</span></span>
        <figcaption class="sr-only">{me.name}, {me.role}</figcaption>
      </figure>

      <div class="cell c-stmt me-stmt" style="--i:1"><span class="clbl">HELLO.TXT</span>
        <div class="stmt-quote">
          <h3 class="stmt-head">{a.lead} <span class="stmt-em">{a.em}</span></h3>
          <p class="stmt-sub" set:html={a.bio}></p>
        </div>
        <div class="stmt-foot2"><span class="stmt-sign2">{me.name}, since {me.since}</span><span class="stmt-avail2"><i></i>{me.status}</span></div>
      </div>

      <div class="cell me-facts" style="--i:2"><span class="clbl">QUICK FACTS</span>
        <dl>
          {a.facts.map((f) => (
            <div class="me-fact"><dt>{f.k}</dt><dd>{f.v}</dd></div>
          ))}
        </dl>
      </div>

      <div class="cell c-skills me-skills" style="--i:3"><span class="clbl">WHAT I DO</span>
        <ul class="chips">
          {a.skills.map((s) => <li class="chip"><i aria-hidden="true"><Fragment set:html={icons[s.icon] ?? i.s8} /></i>{s.label}</li>)}
        </ul>
      </div>

      <div class="cell c-now me-now" style="--i:4"><span class="label">{a.nowLabel}</span><div class="nbig">{a.now}</div>
        <div class="tools">{a.tools.map((t) => <span class="tchip">{t}</span>)}</div>
        <div class="eq" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>
      </div>
    </div>
  </div>
</section>
```

### 3b. `src/components/about/HowIGotHere.astro`

Accessible tabs: `role="tablist"` (vertical) with `role="tab"` buttons and `role="tabpanel"` articles. Click, or use ↑/↓/←/→/Home/End. With no JS, the first version still shows.

```astro
---
// Work history drawn as Figma's "Version history" panel: pick a version on the left,
// its frame opens on the canvas. Keyboard: arrow keys move between versions (tabs pattern).
import { about as me } from '../../data/about';
const x = me.experience;
const file = `${me.short.toLowerCase()}-career.fig`;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
---
<section class="me-exp" id="experience">
  <div class="wrap">
    <div class="sec-head reveal">
      <span class="scribble me-scribble">{x.scribble}</span>
      <h2>{x.heading}</h2>
      <span class="note">{x.note}</span>
    </div>

    <div class="vh reveal">
      <div class="vh-bar">
        <span class="vh-file"><b aria-hidden="true"></b>{file}</span>
        <span class="vh-title">Version history</span>
      </div>

      <div class="vh-body">
        <div class="vh-list" role="tablist" aria-orientation="vertical" aria-label="Work history">
          {x.versions.map((v, k) => (
            <button
              class="vh-item"
              role="tab"
              type="button"
              id={`vh-tab-${k}`}
              aria-controls={`vh-panel-${k}`}
              aria-selected={k === 0 ? 'true' : 'false'}
              tabindex={k === 0 ? 0 : -1}
            >
              <span class="vh-node" aria-hidden="true"></span>
              <span class="vh-txt">
                {v.current && <span class="vh-cur">Current version</span>}
                <span class="vh-role">{v.role}</span>
                <span class="vh-meta">{v.company} <span aria-hidden="true">/</span> {v.period}</span>
              </span>
            </button>
          ))}
        </div>

        <div class="vh-canvas">
          {x.versions.map((v, k) => (
            <article
              class="vh-panel"
              role="tabpanel"
              id={`vh-panel-${k}`}
              aria-labelledby={`vh-tab-${k}`}
              tabindex="0"
              hidden={k !== 0}
            >
              <span class="vh-flab">{slug(v.company)} / {v.period.replace(/\s/g, '')}</span>
              <div class="vh-frame">
                <span class="vh-hd tl"></span><span class="vh-hd tr"></span><span class="vh-hd bl"></span><span class="vh-hd br"></span>
                <h3 class="vh-h">{v.role}</h3>
                <p class="vh-where"><b>{v.company}</b> <span>{v.place}</span> <span>{v.period}</span></p>
                <p class="vh-sum">{v.summary}</p>
                <ul class="vh-points">{v.points.map((pt) => <li>{pt}</li>)}</ul>
                <div class="vh-tags">{v.tags.map((t) => <span class="tchip">{t}</span>)}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

<script>
  const list = document.querySelector<HTMLElement>('.vh-list');
  if (list) {
    const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const select = (idx: number, focus = false) => {
      tabs.forEach((t, k) => {
        const on = k === idx;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls') || '');
        if (panel) panel.hidden = !on;
      });
      if (focus) tabs[idx].focus();
    };
    tabs.forEach((t, k) => {
      t.addEventListener('click', () => select(k));
      t.addEventListener('keydown', (e) => {
        const last = tabs.length - 1;
        let n = -1;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = k === last ? 0 : k + 1;
        else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = k === 0 ? last : k - 1;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = last;
        if (n < 0) return;
        e.preventDefault();
        select(n, true);
      });
    });
  }
</script>
```

---

## 4. CSS: `public/css/about-sections.css`

Load it **after** `home.css`.

```css
/* "Nice to meet you" + "How I got here". Load AFTER home.css (uses its tokens & classes). */

::selection{background:var(--brand);color:#fff}
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
:focus-visible{outline:2px solid var(--tool);outline-offset:3px;border-radius:6px}

/* handwritten note above headings (text version of the drawn scribble) */
.sec-head .me-scribble{font-size:22px;font-weight:500;transform:rotate(-2deg);margin-bottom:10px}

/* ── NICE TO MEET YOU (bento) ─────────────────────────────────────────── */
.me-about{padding:110px 0 90px}
.me-bento{grid-auto-rows:minmax(170px,auto)}
.me-bento .c-stmt{grid-column:span 7;grid-row:span 2}
.me-bento .me-facts,.me-bento .me-skills,.me-bento .me-now{grid-column:span 4}

/* portrait, shown as a selected frame on a dark Figma canvas */
.me-photo{grid-column:span 5;grid-row:span 2;margin:0;padding:44px 34px 46px;background:#0E1622;background-image:radial-gradient(#ffffff12 1.1px,transparent 1.1px);background-size:24px 24px;border-color:#0E1622;overflow:hidden;display:flex}
.me-frame{position:relative;flex:1;min-height:300px;outline:1.5px solid var(--tool);outline-offset:0;border-radius:2px}
.me-frame img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 30%;display:block;border-radius:2px}
.me-hd{position:absolute;width:9px;height:9px;background:#fff;border:1.5px solid var(--tool);border-radius:2px;z-index:2}
.me-hd.tl{top:-5px;left:-5px}.me-hd.tr{top:-5px;right:-5px}.me-hd.bl{bottom:-5px;left:-5px}.me-hd.br{bottom:-5px;right:-5px}
.me-flab{position:absolute;top:18px;left:34px;display:flex;align-items:center;gap:6px;font-family:var(--mono);font-size:11px;font-weight:700;color:var(--tool)}
.me-flab svg{width:12px;height:12px}
.me-dim{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);font-family:var(--mono);font-size:11px;font-weight:700;color:#fff;background:var(--tool);padding:3px 9px;border-radius:5px;white-space:nowrap}
.me-curs{position:absolute;right:16%;bottom:24%;z-index:3;display:block;animation:meCurs 7s cubic-bezier(.45,0,.2,1) infinite}
.me-curs svg{width:22px;height:22px;display:block;fill:var(--brand);filter:drop-shadow(0 3px 6px rgba(0,0,0,.35))}
.me-nm{position:absolute;left:18px;top:18px;font-family:var(--mono);font-size:11px;font-weight:700;color:#fff;background:var(--brand);padding:2px 8px;border-radius:5px;border-top-left-radius:0;white-space:nowrap}
@keyframes meCurs{0%,100%{transform:translate(0,0)}30%{transform:translate(-38px,-62px)}55%{transform:translate(-14px,-30px)}80%{transform:translate(10px,8px)}}

/* hello statement: no quote mark, it's me talking */
.me-stmt .stmt-head{max-width:20ch;text-wrap:balance}
.me-stmt .stmt-sub b{color:var(--ink);font-weight:700}

/* quick facts: dark card, label / value rows */
.me-facts{background:var(--ink);color:#fff;border-color:var(--ink);display:flex;flex-direction:column;justify-content:center}
.me-facts .clbl{color:#ffffff66}
.me-facts dl{display:flex;flex-direction:column}
.me-fact{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:10px 0;border-bottom:1px solid #ffffff1a}
.me-fact:last-child{border-bottom:0}
.me-fact dt{font-family:var(--mono);font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#a9bccb}
.me-fact dd{font-family:var(--display);font-weight:700;font-size:17px;letter-spacing:-.01em;text-align:right}

.me-skills .chips{list-style:none}

/* ── HOW I GOT HERE: Figma "Version history" ──────────────────────────── */
.me-exp{padding:90px 0}
.vh{background:var(--frame);border:1px solid var(--line-2);border-radius:18px;box-shadow:var(--sh);overflow:hidden}
.vh-bar{display:flex;justify-content:space-between;align-items:center;gap:16px;padding:13px 20px;border-bottom:1px solid var(--line-2);font-family:var(--mono);font-size:11px;font-weight:700}
.vh-file{display:flex;align-items:center;gap:8px;color:var(--ink-soft)}
.vh-file b{width:12px;height:12px;border-radius:3px;background:var(--brand)}
.vh-title{color:var(--ink)}

.vh-body{display:grid;grid-template-columns:minmax(280px,380px) 1fr;min-height:470px}

.vh-list{position:relative;align-self:start;display:flex;flex-direction:column;padding:14px 12px}
/* the timeline thread behind the nodes: first node centre to last node centre */
.vh-list::before{content:"";position:absolute;left:31px;top:40px;bottom:52px;width:1.5px;background:var(--line-2)}

.vh-item{position:relative;display:flex;align-items:flex-start;gap:14px;width:100%;text-align:left;font:inherit;color:inherit;background:transparent;border:0;border-radius:10px;padding:14px 12px;cursor:pointer;transition:background .15s}
.vh-item:hover{background:var(--soft)}
.vh-item[aria-selected="true"]{background:#E5F3FF}
.vh-node{position:relative;flex:none;width:15px;height:15px;margin-top:3px;border-radius:50%;background:var(--frame);border:2px solid var(--ink-faint);transition:border-color .15s,background .15s}
.vh-item[aria-selected="true"] .vh-node{border-color:var(--tool);background:var(--tool);box-shadow:0 0 0 4px #E5F3FF}
.vh-txt{display:flex;flex-direction:column;gap:3px;min-width:0}
.vh-cur{align-self:flex-start;font-family:var(--mono);font-size:10px;font-weight:700;color:#fff;background:var(--tool);padding:2px 7px;border-radius:4px;margin-bottom:3px}
.vh-role{font-family:var(--display);font-weight:700;font-size:16px;line-height:1.2;letter-spacing:-.01em}
.vh-meta{font-family:var(--mono);font-size:11px;color:var(--ink-soft)}
.vh-meta span{color:var(--ink-faint)}

.vh-canvas{position:relative;border-left:1px solid var(--line-2);display:grid;place-items:center;padding:56px clamp(24px,5vw,72px);background:#F4F8FB;background-image:radial-gradient(#14202b14 1.1px,transparent 1.1px);background-size:22px 22px}
.vh-panel{position:relative;width:100%;max-width:560px;outline:0}
.vh-panel:not([hidden]){animation:vhIn .45s cubic-bezier(.2,.8,.2,1)}
.vh-panel:focus-visible .vh-frame{box-shadow:0 0 0 3px #0d99ff55,var(--sh)}
.vh-flab{display:block;margin-bottom:9px;font-family:var(--mono);font-size:11px;font-weight:700;color:var(--tool)}
.vh-frame{position:relative;background:var(--frame);border-radius:3px;padding:clamp(24px,3vw,36px);outline:1.5px solid var(--tool);box-shadow:var(--sh)}
.vh-hd{position:absolute;width:9px;height:9px;background:#fff;border:1.5px solid var(--tool);border-radius:2px}
.vh-hd.tl{top:-5px;left:-5px}.vh-hd.tr{top:-5px;right:-5px}.vh-hd.bl{bottom:-5px;left:-5px}.vh-hd.br{bottom:-5px;right:-5px}
.vh-h{font-family:var(--display);font-weight:800;font-size:clamp(24px,2.6vw,34px);line-height:1.02;letter-spacing:-.035em;text-wrap:balance}
.vh-where{display:flex;flex-wrap:wrap;gap:6px 14px;margin-top:10px;font-family:var(--mono);font-size:12px;color:var(--ink-soft)}
.vh-where b{color:var(--brand)}
.vh-sum{margin-top:18px;font-size:17px;font-weight:500;line-height:1.5;color:var(--ink);max-width:52ch}
.vh-points{list-style:none;margin-top:14px;display:flex;flex-direction:column;gap:8px}
.vh-points li{position:relative;padding-left:20px;font-size:15px;line-height:1.5;color:var(--ink-soft);max-width:60ch}
.vh-points li::before{content:"";position:absolute;left:2px;top:.62em;width:8px;height:2px;background:var(--brand);border-radius:1px}
.vh-tags{display:flex;flex-wrap:wrap;gap:7px;margin-top:20px}
.vh-tags .tchip{font-family:var(--mono);font-size:11px;font-weight:700;padding:5px 10px;border-radius:7px;background:var(--soft);border:1px solid var(--line-2)}
@keyframes vhIn{from{opacity:0;transform:translateY(10px);filter:blur(4px)}to{opacity:1;transform:none;filter:none}}

/* ── responsive ─────────────────────────────────────────────────────── */
@media(max-width:900px){
  .me-bento .c-stmt,.me-photo,.me-bento .me-facts,.me-bento .me-skills,.me-bento .me-now{grid-column:span 6;grid-row:auto}
  .me-photo{padding:40px 24px 44px}
  .me-frame{min-height:0;aspect-ratio:4/5;max-height:420px}
  .me-flab{left:24px}
  .vh-body{grid-template-columns:1fr}
  .vh-list{align-self:stretch}
  .vh-canvas{border-left:0;border-top:1px solid var(--line-2);padding:40px 22px}
}
@media(max-width:620px){
  .me-about{padding:80px 0 60px}
  .me-exp{padding:60px 0}
  .me-frame{aspect-ratio:1/1}
}

@media(prefers-reduced-motion:reduce){
  .me-curs,.vh-panel:not([hidden]){animation:none}
}
```

---

## 5. Portrait placeholder: `public/images/me/portrait.svg`

Replace it with a real photo. A portrait around 4:5 works best, and the face is kept in frame by `object-position: 50% 30%`.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 600" role="img" aria-label="Portrait placeholder">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FDE3D6"/>
      <stop offset="1" stop-color="#F7B89C"/>
    </linearGradient>
    <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="#14202B" opacity=".08"/>
    </pattern>
  </defs>
  <rect width="480" height="600" fill="url(#bg)"/>
  <rect width="480" height="600" fill="url(#dots)"/>
  <circle cx="240" cy="236" r="92" fill="#F0531C"/>
  <path d="M64 600c14-128 92-196 176-196s162 68 176 196z" fill="#F0531C"/>
  <text x="240" y="110" text-anchor="middle" font-family="'Space Mono', ui-monospace, monospace" font-size="17" font-weight="700" letter-spacing="2" fill="#D2410E">YOUR PHOTO HERE</text>
</svg>
```

---

## 6. Using it on a page

```astro
---
import Base from '../layouts/Base.astro';
import Chrome from '../components/home/Chrome.astro';
import Footer from '../components/home/Footer.astro';
import NiceToMeetYou from '../components/about/NiceToMeetYou.astro';
import HowIGotHere from '../components/about/HowIGotHere.astro';
import { homeFonts } from '../data/assets';

const scripts = [0, 15, 22].map((n) => `/js/home/${String(n).padStart(2, '0')}.js`); // 00 is required
---
<Base scripts={scripts} fontCss={homeFonts} css={['/css/home.css', '/css/about-sections.css']}>
  <Chrome />
  <!-- ...hero or other sections... -->
  <NiceToMeetYou />
  <HowIGotHere />
  <Footer />
</Base>
```

If you add them to the nav, the links are `/#about` and `/#experience` (or `#about` / `#experience` on the same page). `00.js` has a scrollspy that highlights nav links matching section ids.

---

## 7. Notes and gotchas

- **ID conflict:** `id="about"` and the `.about` class are also used by the old studio "What's up" section (`src/components/home/About.astro`). Don't put both on one page, or rename one.
- **The scribble above the headings** is plain text in Shantell Sans. The existing site's scribbles are hand-drawn SVGs from `icons.ts`, one per phrase with its own draw-on animation. To match exactly, draw new SVG paths for "a little about me" and "the long story".
- **The timeline line** in the version list (`.vh-list::before`, `top:40px; bottom:52px`) is tuned to the item padding and the "Current version" badge on the first item. If item padding changes, or the current item isn't first, adjust those two values.
- **Browser cache:** files in `/public/css` are served as-is, so after editing hard-reload (Cmd+Shift+R) to see changes.
- **Checked when it was built:** desktop at 1440px and a narrow window at ~600px. No console errors. Keyboard navigation and visible focus work in the tabs, and reduced motion is respected. Not tested on a real phone width (~375px).
- **To tune:** the floating cursor on the portrait loops forever. Remove `animation` on `.me-curs` if it's distracting.
