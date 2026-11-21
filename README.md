# portfolio — Astro

Desain, animasi, dan interaksi identik dengan ohhmydesign.com (layout homepage sudah dicek
pixel-per-pixel terhadap clone di `../draft`), dengan konten placeholder yang siap diganti.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output statis di dist/
```

## Mengganti konten

Hampir semua teks ada di **`src/data/site.ts`**: nama brand, email, link booking, WhatsApp,
lokasi & zona waktu (mengatur section CTA siang/malam dan jam footer), hero, about, process,
services, testimonials, pricing, FAQ, footer, dan daftar proyek `projects` (otomatis membuat
halaman `/work/<slug>`). Proyek mandiri diberi `kind: 'personal'` (badge "Personal" di kartu,
Role "Solo, full stack") dan boleh diberi `repo` (link GitHub di case study); urutan array = urutan tampil.

| Ganti | Lokasi |
|---|---|
| Logo mark (**df.**) | `public/brand/mark.svg` (ruler, avatar, footer, WA) + set favicon di `public/`: `favicon.svg`, `favicon.ico`, `apple-touch-icon.png`, `android-chrome-192x192.png`/`-512x512.png`, `site.webmanifest` |
| Versi ikon (anti-cache) | Saat logo/ikon/OG diganti, naikkan `?v=2` → `?v=3` di 4 tempat: `iconV` di `src/layouts/Base.astro`, `public/site.webmanifest`, `public/css/brand.css`, dan `ogImage` di `src/data/site.ts`. Browser (dan WhatsApp/Facebook) lalu mengambil file baru, bukan dari cache |
| Gambar OG | `public/brand/og.png` (1200×630, dipakai untuk preview link). Sumber desainnya `public/brand/og.svg`; render ulang ke PNG bila diubah: bungkus SVG-nya dalam HTML yang memuat `/fonts/home.css` (font Space Mono tidak terpasang di sistem), sajikan hasil build lewat server lokal, lalu `"Google Chrome" --headless=new --window-size=1200,630 --virtual-time-budget=4000 --screenshot=og.png <url>` |
| Gambar proyek | `public/images/work/<slug>.svg`, `-1/-2/-3.svg`, `-page.svg` (halaman penuh untuk tour) |
| Video/poster layanan | `public/images/services/` → isi `video` di `services.items` |
| CV | `public/cv/*.pdf` (path di `site.cv`). Tombol CV kanan atas membuka preview PDF (`src/components/shared/CvPreview.astro`) dengan tombol Download / Open PDF; cukup ganti file PDF-nya, preview ikut berubah |
| Testimoni | `public/images/people/` → isi `video` agar tombol PLAY aktif |

Form `/contact` tidak memakai backend: brief dirangkai jadi pesan lalu dibuka di WhatsApp
(`wa.me` ke `whatsapp`) atau di aplikasi email pengunjung (`mailto:` ke `email`).

## Struktur

```
src/
  data/site.ts          semua konten + clientConfig (dikirim ke window.__SITE__)
  data/assets.ts        daftar font & script per halaman
  layouts/Base.astro    <head>, SEO, JSON-LD, urutan CSS/JS
  components/home/      section beranda (Hero, WorkSlider, About, Process, Services, …)
  components/shared/    SubChrome (ruler/nav sub-halaman), WorkCard
  pages/                index, work/index, work/[slug], contact, 404
public/
  css/                  stylesheet asli per halaman (dilayani apa adanya, lihat catatan)
  js/home/00–21.js      interaksi beranda, urutan sesuai aslinya
  js/sub/, case.js, contact.js   interaksi sub-halaman
  js/matter.min.js      physics untuk section "This button does nothing"
  fonts/                Google Fonts + Fontshare self-hosted
```

**Catatan teknis**

- CSS disajikan dari `public/` tanpa diproses Vite karena stylesheet aslinya mengandung
  beberapa error sintaks kecil yang ditoleransi browser tapi ditolak PostCSS. Ini menjaga
  cascade tetap 100% sama.
- Script interaktif berupa vanilla JS tanpa build step dan membaca konten dinamis dari
  `window.__SITE__` (diisi dari `clientConfig` di `site.ts`).
- Semua efek kursor hanya aktif di `pointer:fine` dan menghormati `prefers-reduced-motion`.
