// Builds the dark theme stylesheets: public/css/<page>-dark.css for every page stylesheet.
//
// The page stylesheets (home, work, case, contact) and brand.css hard-code most of their colors, so
// instead of rewriting them this script reads every rule that sets a color and writes the same rule
// again, scoped to :root[data-theme="dark"], with the colors turned into their night versions.
// The light stylesheets are never touched: light mode stays exactly as it is.
//
// Every color declaration is copied (changed or not), so the dark rules keep the same order and the
// same relative specificity as the light ones. Hand-written fixes live in scripts/dark/*.css and are
// appended at the end of each file (shared.css on every page, <page>.css on that page only).
//
// Run after editing any stylesheet in public/css:   node scripts/build-dark-css.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import postcss from 'postcss';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = (f) => join(root, 'public/css', f);
const PAGES = ['home', 'work', 'case', 'contact'];
const SCOPE = ':root[data-theme="dark"]';

// ── color math ────────────────────────────────────────────────────────────
function parse(str) {
  const s = str.trim().toLowerCase();
  if (s === 'white') return { r: 255, g: 255, b: 255, a: 1 };
  if (s === 'black') return { r: 0, g: 0, b: 0, a: 1 };
  if (s.startsWith('#')) {
    let h = s.slice(1);
    if (h.length === 3 || h.length === 4) h = [...h].map((c) => c + c).join('');
    const n = (i) => parseInt(h.slice(i, i + 2), 16);
    return { r: n(0), g: n(2), b: n(4), a: h.length === 8 ? n(6) / 255 : 1 };
  }
  const m = s.match(/rgba?\(([^)]*)\)/);
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map((v) => (v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v)));
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
}
function toHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    h *= 60;
  }
  return { h, s, l };
}
function fromHsl(h, s, l, a) {
  const k = (n) => (n + h / 30) % 12, q = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - q * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))));
  const hex = '#' + [f(0), f(8), f(4)].map((v) => v.toString(16).padStart(2, '0')).join('');
  return a >= 1 ? hex.toUpperCase() : `rgba(${f(0)},${f(8)},${f(4)},${+a.toFixed(3)})`;
}
const rgba = (r, g, b, a) => `rgba(${r},${g},${b},${+Math.min(1, a).toFixed(3)})`;

// the night palette is tinted with the ink hue, so grays read as navy rather than flat gray
const INK_HUE = 208;
// (near-neutral means low chroma: warm paper #FAFAF8 and cool #F1F6FA both become navy, a tinted tape like #FBE9CF keeps its hue)
const chroma = ({ r, g, b }) => (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
const tint = (c, h, s) => (chroma(c) < 0.07 ? [INK_HUE, 0.24] : [h, Math.min(s, 0.32)]);
// accents (brand orange, tool blue, green…) are left alone
const isAccent = ({ s, l }) => s > 0.45 && l > 0.25 && l < 0.8;

/** surfaces: white frames and pale panels turn into dark navy panels; faint ink tints turn into faint white tints */
function bg(c) {
  const hsl = toHsl(c);
  if (isAccent(hsl)) return null;
  if (hsl.l >= 0.55) {
    const [h, s] = tint(c, hsl.h, hsl.s);
    return fromHsl(h, s, 0.13 + (1 - hsl.l) * 0.5, c.a);
  }
  if (hsl.l < 0.3 && c.a < 0.5) return rgba(255, 255, 255, c.a * 0.9);
  return null;
}
/** text and icons: dark ink turns light, deep saturated text gets brighter so it still reads on dark */
function fg(c) {
  const hsl = toHsl(c);
  if (hsl.l >= 0.5) return null;
  if (hsl.s > 0.5 && hsl.l >= 0.25) return fromHsl(hsl.h, hsl.s, 0.64, c.a);
  const [h, s] = tint(c, hsl.h, hsl.s);
  return fromHsl(h, s, 0.92 - hsl.l * 0.55, c.a);
}
/** lines: both dark hairlines and white glass edges become faint white lines */
function line(c) {
  const hsl = toHsl(c);
  if (isAccent(hsl)) return null;
  if (hsl.l >= 0.55) return rgba(255, 255, 255, Math.max(0.06, c.a * 0.14));
  if (hsl.l < 0.3) return rgba(255, 255, 255, Math.min(0.3, c.a * 0.9 + 0.03));
  return rgba(255, 255, 255, 0.16);
}
/** shadows: darker and deeper; white highlights almost disappear */
function shadow(c) {
  const hsl = toHsl(c);
  if (isAccent(hsl)) return null;
  if (hsl.l >= 0.55) return rgba(255, 255, 255, c.a * 0.06);
  return rgba(0, 0, 0, Math.min(0.75, c.a * 1.5 + 0.1));
}

const KIND = [
  [/^(color|fill|stroke|caret-color|-webkit-text-fill-color|-webkit-text-stroke(-color)?|accent-color|stop-color|text-decoration(-color)?)$/, fg],
  [/^background(-color|-image)?$/, bg],
  [/^(border|outline|column-rule)(-.*)?$/, line],
  [/^(box-shadow|text-shadow|filter)$/, shadow],
];

// tokens from the :root block, resolved to their light values before mapping
const TOKENS = {};
const COLOR = /#[0-9a-fA-F]{8}\b|#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3,4}\b|rgba?\([^)]*\)|(?<![-\w])(?:white|black)(?![-\w])/g;

function resolveVars(v, depth = 0) {
  return depth > 4 ? v : v.replace(/var\((--[\w-]+)(?:,[^)]*)?\)/g, (m, name) => (name in TOKENS ? resolveVars(TOKENS[name], depth + 1) : m));
}
/** maps the colors outside url(...) in one declaration value; returns null when nothing in it is a color */
function mapValue(value, fn) {
  let found = false;
  const parts = value.split(/(url\((?:"[^"]*"|'[^']*'|[^)]*)\))/);
  const out = parts.map((p, i) => {
    if (i % 2) return p;
    const r = resolveVars(p);
    return r.replace(COLOR, (m) => {
      const c = parse(m);
      if (!c) return m;
      found = true;
      return fn(c) ?? m;
    });
  }).join('');
  return found ? out : null;
}

function scopeSelector(sel) {
  return sel.split(',').map((s) => {
    s = s.trim();
    if (/^:root\b/.test(s)) return s.replace(/^:root/, SCOPE);
    if (/^html\b/.test(s)) return s.replace(/^html/, `html[data-theme="dark"]`);
    return `${SCOPE} ${s}`;
  }).join(',\n');
}

function build(file) {
  const ast = postcss.parse(readFileSync(css(file), 'utf8'));
  const out = postcss.root();
  ast.walkRules((rule) => {
    if (rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
    const decls = [];
    rule.each((d) => {
      if (d.type !== 'decl' || d.prop.startsWith('--') || /^(-webkit-)?mask/.test(d.prop)) return;
      const kind = KIND.find(([re]) => re.test(d.prop));
      if (!kind) return;
      const v = mapValue(d.value, kind[1]);
      // an image with a fallback color that stays the same: leave it, so a later light rule (brand.css swaps
      // the logo image with !important) is not beaten by this more specific copy
      if (v !== null && /url\(/.test(d.value) && v === resolveVars(d.value)) return;
      if (v !== null) decls.push(postcss.decl({ prop: d.prop, value: v, important: d.important }));
    });
    if (!decls.length) return;
    const r = postcss.rule({ selector: scopeSelector(rule.selector) });
    decls.forEach((d) => r.append(d));
    // keep the @media / @supports wrappers the rule lives in
    let node = r;
    for (let p = rule.parent; p && p.type === 'atrule'; p = p.parent) {
      node = postcss.atRule({ name: p.name, params: p.params }).append(node);
    }
    out.append(node);
  });
  return out.toString();
}

for (const f of ['home.css', 'brand.css']) {
  postcss.parse(readFileSync(css(f), 'utf8')).walkDecls(/^--/, (d) => {
    if (d.parent.selector === ':root' && !(d.prop in TOKENS)) TOKENS[d.prop] = d.value;
  });
}

const manual = (f) => (existsSync(join(root, 'scripts/dark', f)) ? readFileSync(join(root, 'scripts/dark', f), 'utf8') : '');
const brand = build('brand.css');
for (const page of PAGES) {
  const body = [
    `/* GENERATED by scripts/build-dark-css.mjs from ${page}.css + brand.css + scripts/dark/. Do not edit by hand. */`,
    build(`${page}.css`),
    brand,
    '/* ── hand-written (scripts/dark/shared.css) ── */',
    manual('shared.css'),
    manual(`${page}.css`) && `/* ── hand-written (scripts/dark/${page}.css) ── */\n${manual(`${page}.css`)}`,
  ].filter(Boolean).join('\n');
  writeFileSync(css(`${page}-dark.css`), body + '\n');
  console.log(`${page}-dark.css  ${(Buffer.byteLength(body) / 1024).toFixed(1)} KB`);
}
