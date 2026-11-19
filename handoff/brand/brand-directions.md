# Daffa brand directions

Three personal brand directions explored for **Daffa Hanifisyafiq** (nickname **Daffa**) in November 2026.

| Direction | Status | Use for |
|---|---|---|
| **A · Canvas** | ✅ **Chosen** | This portfolio site |
| **B · Double F** | Archived | Reference only |
| **C · Sticker Sheet** | ⭐ Saved for later | A future website project |

**View the original preview:**
- Artifact (private, needs your claude.ai login): https://claude.ai/artifact/MnNkwaHdHbbqba6kgt9ytp
- Local copy: [`brand-directions.html`](./brand-directions.html). It uses Google Fonts, so the fonts need an internet connection.

The copy below is **example text**. The role "designer & developer" is a placeholder until the real role is confirmed.

---

## A · Canvas ✅ chosen

**Idea:** keep the current site's world (Figma canvas in a blue sky with rulers, multiplayer cursors and selection boxes) and swap in Daffa's identity. "YourStudio" becomes **Daffa**, an orange **d** becomes the mark, and the particle hero spells the name.

### Logo
- **Wordmark:** `daffa`, all lowercase, Bricolage Grotesque 800, letter-spacing `-0.045em`. The first letter **d** is Signal orange and the rest is Ink. Show it inside a Figma selection box (1.5px `#0D99FF` outline, four white 9px handles, dimension tag `daffa.fig`).
- **Mark / icon:** orange rounded square (`#F0531C`, radius ≈ 24% of its size) with a white lowercase **d** in Bricolage Grotesque 800. Used for the favicon, chat avatar and WhatsApp, and as a replacement for `public/brand/mark.svg`.
- **Where it shows on the site:** loader, ruler logo, footer giant wordmark, `.fig` file label, tab title, OG image.

### Colors (already the site's tokens in `public/css/home.css`)

| Name | Hex | Role |
|---|---|---|
| Sky | `#5EAEEA` | Background gradient `#3E97E2 → #5EAEEA → #86C4EF → #ACD8F4` |
| Signal | `#F0531C` | Brand accent, primary buttons, the **d** |
| Select | `#0D99FF` | Selection boxes, handles, "You" cursor, focus |
| Ink | `#14202B` | Text, dark cards |
| Ink soft | `#4A6173` | Secondary text |
| Frame | `#FFFFFF` | Cards |

### Type
- **Display:** Bricolage Grotesque 700–800 (uppercase section headings, tight tracking)
- **Body:** Hanken Grotesk 400–600
- **Utility:** Space Mono 700 (labels, dimensions, rulers)
- **Hand:** Shantell Sans (scribbles above headings)
- **Particle hero:** Anton (particles spell `DAFFA .`)

### Voice
Short, friendly, a bit cheeky. First person.
- Greeting: "Hi, I'm Daffa. I design it and I build it."
- Call to action: "Got something worth building? Say hello."
- Playful: the existing "do not drag … i saw that." watcher stays.

### Hero composition
Badge "Designer ✦ who codes in Jakarta" → particle text `DAFFA .` → one-line sub "I design interfaces and build them myself, so what you approve is what ships." → buttons "Say hello" (orange) + "See my work" (outline). Corner labels and the Figma cursors stay.

### Changes to apply on the site
1. Replace the brand "YourStudio" with "Daffa" in `src/data/site.ts` (`brand`, `tagline`, `description`, socials, email, and so on).
2. Replace `public/brand/mark.svg` with the orange **d** icon and add a matching favicon. Update `public/brand/og.svg`.
3. Set `hero.lines` to `['DAFFA .']` or a two-line variant. Keep all existing animations.
4. Swap studio-only copy ("we", "studio", "team") for first-person copy.

---

## C · Sticker Sheet ⭐ saved for a future website

**Idea:** a maker's laptop sticker sheet. The initial **D** is a die-cut sticker with a thick white border, and small stickers carry skills and status ("open to work", ✓). Cheerful colors on bright dotted paper. The warmest and most approachable of the three.

### Logo
- **Mark:** tomato rounded square (`#FF5A3C`, radius ≈ 30%), white **D** in Gabarito 900, **6px white border**, rotated `-6deg`, shadow `0 8px 18px -6px #1D1B2E59`. On hover it straightens and scales to 1.06 with a springy ease.
- **Wordmark:** `daffa` in Gabarito 900, letter-spacing `-0.04em`, each letter its own color: **d** tomato, **a** sky, **f** sun, **f** mint, **a** white or ink.

### Colors (full palette)

| Name | Hex | Role |
|---|---|---|
| Ground | `#E9F1F5` | Page background with a dot grid (`#1D1B2E14`, 1.2px dots every 22px) |
| Ink | `#1D1B2E` | Text, primary buttons, dark cards |
| Tomato | `#FF5A3C` | Main accent, the **D** sticker, name highlight |
| Sky | `#3BA7FF` | Sticker / accent |
| Sun | `#FFC83A` | Sticker / accent (ink text on it) |
| Mint | `#2FC79A` | Sticker / success (ink text on it) |

### Type
- **Display:** Gabarito 900, tight tracking (`-0.03` to `-0.04em`)
- **Body:** Hanken Grotesk
- **Utility:** Space Mono for small details

### Shape and depth
- Cards: white, radius 22px, shadow `0 3px 0 #1D1B2E14, 0 18px 40px -28px #1D1B2E66`
- Buttons: pill shaped. Primary is ink with white text. Secondary is white with a 1.5px ink inset ring.
- Stickers: thick white border, slight rotation (−6° to +12°), soft drop shadow

### Voice
Warm and welcoming.
- Greeting: "Hi, I'm Daffa. Nice to see you here."
- Call to action: "Have an idea? Let's make it together."
- Playful: "Collect them all: every project gets a sticker."

### Hero composition
Left aligned: "Hi, I'm **Daffa**." (name in tomato), a short sub line, then pill buttons "Say hello" + "See my work". On the right, floating stickers: a big **D**, a sun-yellow "open to work" pill (rotated 8°) and a small mint ✓.

### Ideas for that future site
- Each project and skill gets its own sticker. Draggable stickers can be the signature interaction.
- The Figma cursors from this site could carry over as a nod to the portfolio.

---

## B · Double F (archived)

**Idea:** taken from the name itself. "Da**ff**a" has two f's, and the mark is two f's sharing one crossbar (design and code done by one person). Drenched ultramarine page with butter-yellow accents. The long surname is set as type: "Daffa" wide, "Hanifisyafiq" condensed.

### Logo: the ff mark (SVG)

```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <path d="M38 92V36q0-18 18-18h4M66 92V36q0-18 18-18h4M22 48h66" fill="none" stroke="#FFE45C" stroke-width="12"/>
</svg>
```
Wordmark: `daffa`, lowercase, Archivo 900 at width 125, with **ff** in ultramarine on paper or butter on blue.

### Colors

| Name | Hex | Role |
|---|---|---|
| Ultramarine | `#2433D6` | The whole surface |
| Butter | `#FFE45C` | Accent, mark, buttons |
| Night | `#0A0F3D` | Text on light |
| Deep | `#101A7A` | Cards on ultramarine |
| Paper | `#F5F6FF` | Light cards |

### Type
- Display: Archivo 900, variable width (125 wide for "Daffa", 62 condensed for "Hanifisyafiq"), uppercase
- Body: Figtree
- Radius 2–4px everywhere (sharp, precise)

### Voice
Direct and confident: "Daffa. Designer and developer. One person, whole product." / "Send the brief. You'll get screens, then code." / "Two f's. Zero handoff."

### Why it was not chosen
It needs the biggest change (it replaces the sky and Figma world, and every font and token), and A was preferred. Keep the ff idea in mind as a possible secondary mark.
