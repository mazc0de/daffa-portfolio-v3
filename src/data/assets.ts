// Self-hosted Google Fonts / Fontshare stylesheets (files live in /public/fonts).
// Bricolage Grotesque (display) · Hanken Grotesk (body) · Space Mono (mono) · Shantell Sans (hand)
// Fraunces (serif accents) · Anton (particle hero) · Archivo · Outfit · Clash Display
// home: one merged stylesheet instead of six render-blocking requests (Clash Display is not used on home)
export const homeFonts = ['/fonts/home.css'];
/** Anton (latin) draws the hero name; preloaded so the largest text paints sooner */
export const homeFontPreload = ['/fonts/75f46c51d6f1f3cc.woff2'];

/** srcset for a photo with smaller copies made by scripts/image-variants.sh (name-640.webp next to name.webp) */
export const srcset = (src: string, widths: number[], fullWidth: number) =>
  [...widths.map((w) => `${src.replace(/\.webp$/, `-${w}.webp`)} ${w}w`), `${src} ${fullWidth}w`].join(', ');

export const workFonts = ['/fonts/f-dc6ac6936bdb.css', '/fonts/f-c02ad85c8bb0.css'];
export const caseFonts = ['/fonts/f-70a8f3562240.css', '/fonts/f-c02ad85c8bb0.css', '/fonts/f-b2accdf8dee4.css'];
export const contactFonts = ['/fonts/f-dc6ac6936bdb.css', '/fonts/f-c02ad85c8bb0.css'];

const sub = (n: number) => `/js/sub/${String(n).padStart(2, '0')}.js`;
/** shared sub-page behaviour: clock + ruler, reveal, cursor, footer dot-grid & wordmark, tab-away title, scribbles */
export const workScripts = Array.from({ length: 9 }, (_, n) => sub(n));
export const caseScripts = [...workScripts, '/js/case.js'];
export const contactScripts = ['/js/contact.js', sub(1), sub(2), sub(4)];
