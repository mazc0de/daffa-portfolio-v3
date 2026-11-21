/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SEMUA KONTEN WEBSITE ADA DI FILE INI.
 *  Ganti nilai-nilai placeholder di bawah dengan data Anda sendiri.
 *  Desain, animasi, dan interaksi akan menyesuaikan otomatis.
 *
 *  Gambar/video: taruh file Anda di /public/images/... lalu ganti path-nya.
 *  Logo: ganti /public/brand/mark.svg (dipakai di ruler, avatar chat, footer, WA).
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Project = {
  slug: string;
  name: string;
  /** warna aksen kartu slider & case study */
  accent: string;
  tags: string[];
  /** gambar utama (slider beranda, kartu /work, cover case study) */
  image: string;
  year: string;
  summary: string;
  /** link live publik; '' untuk proyek klien/internal (kartu /work menampilkan platform, bukan LIVE) */
  link: string;
  /** tempat proyek berjalan: Web, Kiosk, Web app, dst. */
  platform: string;
  /** 'client' = dikerjakan untuk kantor/klien; 'personal' = proyek mandiri (kartu diberi badge "Personal") */
  kind: 'client' | 'personal';
  /** isi halaman /work/[slug] (struktur sama dengan template case study asli) */
  caseStudy: {
    title: string;
    lede: string;
    facts: { k: string; v: string }[];
    live?: { label: string; url: string };
    /** repo publik (GitHub), tampil di samping "Live site" */
    code?: { label: string; url: string };
    /** teks besar yang "terisi" saat di-scroll: cerita singkat proyek */
    statement: string;
    /** paragraf kecil di bawah statement (opsional, kosongkan '' untuk menyembunyikan) */
    under: string;
    /** bagian di bawah ini opsional: tidak dirender bila tidak ada bahannya (font/palet, halaman penuh, beberapa screenshot) */
    look?: {
      heading: string; body: string;
      fonts: { family: string; weight: number; role: string }[];
      palette: { name: string; hex: string; dark?: boolean }[];
      shot: string;
    };
    /** "tour": gambar halaman penuh yang di-zoom ke titik (x,y relatif 0..1, z = zoom) saat scroll */
    tour?: { heading: string; body: string; page: string; steps: { x: number; y: number; z: number; title: string; body: string }[] };
    strip?: { heading: string; body: string; items: { label: string; image: string }[] };
    process: { heading: string; body: string; nodes: { title: string; body: string }[] };
  };
};


export const site = {
  // ── Identitas ──────────────────────────────────────────────────────────────
  /** nama panggilan: dipakai untuk wordmark loader, penggaris & footer (huruf pertama diberi warna brand) */
  brand: 'Daffa',
  fullName: 'Daffa Hanifisyafiq',
  /** peran/profesi */
  tagline: 'Frontend Developer',
  description:
    'Daffa Hanifisyafiq is a frontend developer in Semarang, Indonesia, who turns designs into fast, accessible websites and apps.',
  url: 'https://daffah.my.id',
  email: 'daffahan29@gmail.com',
  /** nomor WhatsApp format internasional tanpa + (kosongkan '' untuk menyembunyikan widget) */
  whatsapp: '6283862095217',
  ogImage: '/brand/og.png?v=2',
  /** CV (PDF di /public/cv/). Ganti filenya di sana bila CV diperbarui */
  cv: { href: '/cv/Daffa_Hanifisyafiq-resume.pdf', file: 'Daffa_Hanifisyafiq-resume.pdf', label: 'Download CV' },
  since: '2020',
  status: 'open to collaboration',

  location: {
    city: 'Semarang',
    country: 'indonesia',
    /** koordinat kota: cuaca asli di section CTA (Open-Meteo, tanpa API key) */
    lat: -6.9932,
    lon: 110.4203,
    /** offset UTC dalam menit (WIB = +420, WITA = +480, WIT = +540) */
    utcOffsetMinutes: 420,
    tzLabel: 'WIB',
  },

  /** nama di kursor Figma "teman" yang berkeliling halaman */
  teammate: 'Nuril',
  /** nama di kursor yang menegur saat teks hero di-drag */
  watcher: 'Nuril',

  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/daffahnfy/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/daffahan/' },
    { label: 'GitHub', href: 'https://github.com/mazc0de' },
  ],

  nav: [
    { label: 'Home', href: '/#top', cls: 'home' },
    { label: 'About', href: '/#about' },
    { label: 'Experience', href: '/#experience' },
    { label: 'What I build', href: '/#services' },
    { label: 'Work', href: '/work' },
    // hidden for now, together with their sections on the home page:
    // { label: 'Reviews', href: '/#reviews' },
    // { label: 'Pricing', href: '/#pricing' },
  ],

  // ── Hero ───────────────────────────────────────────────────────────────────
  hero: {
    /** badge di atas judul: "<pre> [mark] <name> <post>" */
    badge: { pre: 'Frontend', mark: '✦', name: 'developer', post: 'in Semarang' },
    /** dua baris judul partikel (font Anton, huruf besar) */
    lines: ['DAFFA', 'HANIFISYAFIQ .'],
    /** kata dalam baris ke-2 yang diberi warna brand pada fallback (mobile) */
    highlight: 'HANIFISYAFIQ',
    hint: 'from idea to production ✦',
    sub: 'I turn designs into fast, accessible interfaces that look exactly like the mockup and feel even better.',
    cornerLeft: ['based in semarang, indonesia', 'working worldwide'],
    /** dipakai bila liveClock = false */
    cornerRight: ['open for 2027', 'your timezone, handled'],
    /** pojok kanan menampilkan hari, tanggal & jam (zona waktu dari `location`) */
    liveClock: true,
    primaryCta: 'About me',
    /** tujuan tombol utama: anchor di halaman ini (#about) atau URL penuh (dibuka di tab baru) */
    primaryHref: '#about',
    secondaryCta: 'See my work',
    /** saklar di bawah hero: Design (nama partikel) ⇄ Code (kode Hero.tsx diketik) */
    view: { label: 'View the hero as', design: 'Design', code: 'Code', file: 'Hero.tsx', badge: 'dev mode' },
  },

  // ── About: "Nice to meet you" (bento) ─────────────────────────────────────
  about: {
    /** foto potret (~4:5) di /public/images/me/. Isi ukuran aslinya (px) */
    photo: '/images/me/daffa.webp',
    photoSize: { w: 819, h: 1024 },
    scribble: 'a little about me',
    heading: 'Nice to meet you',
    note: 'the short version, i promise.',
    /** kalimat pembuka di kartu besar (HELLO.TXT); `em` diberi warna brand */
    lead: 'Hi, I’m Daffa. I build websites',
    em: 'people actually enjoy using.',
    /** boleh pakai <b> */
    bio:
      'I’m a frontend developer from Semarang, writing code for the web since 2020. I like turning ideas into interfaces that are <b>fast, tidy and easy to use</b>, and I sweat the small details most people never notice but always feel.',
    facts: [
      { k: 'Based in', v: 'Semarang, Indonesia' },
      { k: 'Coding since', v: '2020' },
      { k: 'Professional', v: '4+ years' },
      { k: 'Speaks', v: 'Bahasa, English' },
      { k: 'Focus', v: 'Frontend & UI' },
    ],
    /** jenis pekerjaan frontend (tech stack ada di kartu "currently building with").
        icon: layout | code | play | a11y | target | api | layers | grid | search | next | react | ts | js | tailwind */
    skills: [
      { label: 'Responsive design', icon: 'layout' },
      { label: 'Design to code', icon: 'code' },
      { label: 'Interactions & motion', icon: 'play' },
      { label: 'Accessibility', icon: 'a11y' },
      { label: 'Performance', icon: 'target' },
      { label: 'API integration', icon: 'api' },
    ],
    nowLabel: '▶ currently building with',
    now: 'Next.js & Tailwind CSS',
    tools: ['Next.js', 'TypeScript', 'Figma'],
  },

  // ── How I got here: riwayat kerja sebagai panel "Version history" Figma ────
  experience: {
    scribble: 'the long story',
    heading: 'How I got here',
    note: 'every job, saved as a version.',
    /** terbaru dulu. `current: true` memberi lencana "Current version" */
    versions: [
      {
        role: 'Frontend Developer', company: 'PT Mitra Kasih Perkasa', period: '2024 – now', current: true,
        place: 'Semarang',
        summary: 'Ferry booking, self-service kiosks and banking-app webviews for ports in Batam, Tanjung Pinang and Bali.',
        points: [
          'Built and maintain 10+ React and Next.js apps, including Serangan Harbour (260,000+ passengers a year, 62 operators).',
          'Cashless kiosk flows (virtual account, QRIS, card) that finish a purchase in under 2 minutes.',
          'Booking, payment and ticketing APIs for a platform that handled nearly 10,000 transactions in 10 months.',
          'Rebuilding the legacy booking app as a React single-page app: 54% lighter pages, 0 ms blocking time on mobile.',
        ],
        tags: ['React', 'Next.js', 'TypeScript', 'Transportation'],
      },
      {
        role: 'Frontend Developer', company: 'Rect Media Komputindo', period: '2022 – 2023',
        place: 'Semarang',
        summary: 'Client work: refactors, dashboards and a self-hosted video conferencing platform.',
        points: [
          'Refactored a legacy frontend and cut the bundle size by 40%.',
          'Customized BigBlueButton into a self-hosted Zoom alternative for a client.',
          'Built a user management dashboard for web and mobile on microservice APIs.',
          'Worked directly with clients to turn business needs into technical fixes.',
        ],
        tags: ['React', 'Dashboards', 'Client work'],
      },
      {
        role: 'Frontend Developer Intern', company: 'Widya Robotics', period: '2022',
        place: 'Yogyakarta',
        summary: 'Frontend for a SaaS platform offering face detection and recognition APIs.',
        points: [
          'Built features alongside AI engineers and backend developers.',
          'Integrated the face detection and recognition APIs, plus secure sign-in flows.',
        ],
        tags: ['SaaS', 'AI', 'Auth'],
      },
      {
        role: 'Computer Science Student', company: 'Universitas Dian Nuswantoro', period: '2018 – 2022',
        place: 'Semarang',
        summary: 'Bachelor of Computer Science (GPA 3.61). This is where I started writing code for the web, in 2020.',
        points: [
          'Network Division Coordinator at Dinus Open Source Community, leading weekly sharing sessions.',
          'Competed in the Capture The Flag category of GEMASTIK 2020.',
          'Most Progressive Student at the Binar Academy Full-Stack Web bootcamp (2022).',
        ],
        tags: ['Computer Science', 'Open source', 'Bootcamp'],
      },
    ],
  },

  // ── Work log (thread ala Slack) ───────────────────────────────────────────
  /** cerita nyata dari CV, ditulis sebagai thread kerja. who: 'me' = Daffa, 'team' = rekan (name + color) */
  process: {
    scribble: 'the work log',
    heading: 'Real work. Real numbers.',
    note: 'A few moments from the job, straight from the thread.',
    channel: 'daffa-worklog',
    team: [
      { name: 'Ops', color: '#0D99FF' },
      { name: 'PM', color: '#141310' },
    ],
    steps: [
      { step: '01 · Self-service kiosk', msgs: [
        { who: 'team', name: 'Ops', color: '#0D99FF', tm: '09:12', tx: 'can passengers buy a ticket without a cashier?' },
        { who: 'me', tm: '09:20', tx: 'yep. QRIS, virtual account or card, and the ticket prints right away', file: 'kiosk-payment-flow.fig' },
        { who: 'team', name: 'Ops', color: '#0D99FF', tm: '14:05', tx: 'timed it at the port: under 2 minutes per ticket ✅', react: '🙌 3' },
      ] },
      { step: '02 · Eid travel peak', msgs: [
        { who: 'team', name: 'Ops', color: '#0D99FF', tm: '07:48', tx: '431 bookings today. that’s about 13× a normal day 🔥' },
        { who: 'me', tm: '07:51', tx: 'on it. watching prod, hotfix for the payment flow is going out now' },
        { who: 'team', name: 'Ops', color: '#0D99FF', tm: '08:30', tx: 'bookings and payments still flowing 🙏', react: '❤️ 5' },
      ] },
      { step: '03 · Ten months in', msgs: [
        { who: 'team', name: 'PM', color: '#141310', tm: '17:02', tx: 'monthly recap is in' },
        { who: 'me', tm: '17:04', tx: 'nearly 10,000 transactions, 100+ routes, 33 vessels 🚢', react: '🚀 6' },
      ] },
      { step: '04 · The rebuild (now)', msgs: [
        { who: 'team', name: 'PM', color: '#141310', tm: '10:15', tx: 'the old booking app is 4.8 MB on mobile 😬' },
        { who: 'me', tm: '10:18', tx: 'rebuilding it from scratch as a React SPA' },
        { who: 'me', tm: '16:40', tx: 'on staging: 2.2 MB, 41% fewer requests, blocking time 200 ms → 0 ms', file: 'lighthouse-before-after.png', react: '🔥 4' },
      ] },
    ],
  },

  // ── What I build (kartu horizontal scroll) ────────────────────────────────
  services: {
    /** teks tulisan tangan di atas judul */
    scribble: 'the things i build',
    heading: 'What I build',
    note: 'Three kinds of work, one canvas. Scroll to pan.',
    items: [
      {
        tab: 'Web-Apps', title: 'Web Apps & Dashboards', sub: 'Built for daily use.',
        short: 'Booking flows, admin panels and internal tools that have to be fast, clear and hard to break.',
        poster: '/images/work/astra-visteon.webp', video: '',
        desc: 'From search to checkout to the admin side, I build the screens behind real transactions. Recent work includes ferry booking on Tiketkapal.com and a PDCA tracking app for Astra Visteon.',
        deliverables: ['Booking & checkout flows', 'Admin dashboards', 'Payment integration (VA, QRIS, card)', 'REST API integration', 'State management', 'Role & auth flows'],
      },
      {
        tab: 'Websites', title: 'Websites & Landing Pages', sub: 'Fast and findable.',
        short: 'Company profiles and landing pages that load fast, look right on any phone and get people to reach out.',
        poster: '/images/work/spc-detailing.webp', video: '',
        desc: 'Responsive, quick and easy to update, with just enough motion to feel alive. Recent work includes SPC Auto Detailing and Kos Ibu Ami Petarukan.',
        deliverables: ['Responsive layouts', 'Design to code', 'Animations', 'SEO basics', 'Performance tuning', 'Deployment'],
      },
      {
        tab: 'Kiosk-and-Embedded', title: 'Kiosk & Embedded UIs', sub: 'Off the usual screen.',
        short: 'Interfaces in unusual places: port ticket machines, bank app webviews, live departure boards.',
        poster: '/images/work/selfkiosk.webp', video: '',
        desc: 'Touch screens, limited connections and people in a hurry. I build kiosk flows with cashless payment and ticket printing, ferry booking inside the Livin’ banking app, and real-time departure boards for ports.',
        deliverables: ['Touch-first kiosk flows', 'Cashless payment flows', 'Ticket printing', 'Mobile banking webviews', 'Real-time displays', 'Offline-tolerant UI'],
      },
    ],
  },

  // ── The difference ────────────────────────────────────────────────────────
  difference: {
    scribble: 'why me',
    heading: ['same design.', 'different developer.'],
    /** label kolom kiri */
    themLabel: 'the usual handoff',
    them: [
      'Looks close to the Figma. Close enough, they say.',
      'Fine on desktop, broken on a small phone.',
      'Heavy pages that crawl on mobile data.',
      'Hard-coded screens nobody wants to touch later.',
      'Goes quiet for weeks, then ships late.',
    ],
    us: [
      'Matches the design down to the spacing and hover states.',
      'Tested on real phones, tablets and even port kiosks.',
      'Built light. I cut one app from 4.8 MB to 2.2 MB.',
      'Clean, reusable components that are easy to extend.',
      'Staging links early, clear updates, no surprises.',
    ],
    foot: ['Same Figma file, same deadline.', 'Very different result.'],
  },

  // ── Testimonials ──────────────────────────────────────────────────────────
  testimonials: {
    heading: ["Don't take it", 'from us'],
    note: 'real founders, real work.',
    /** kartu video: isi `video` dengan path .mp4/.webm untuk mengaktifkan play */
    videos: [
      { name: 'Client A', role: 'Marketing Lead', company: 'COMPANY ONE', poster: '/images/people/video-1.svg', video: '',
        stats: [{ v: '58', u: '%+', l: 'MORE SIGNUPS', up: true }, { v: '1.9', u: 's', l: 'LOAD TIME' }] },
      { name: 'Client B', role: 'Co-founder', company: 'COMPANY TWO', poster: '/images/people/video-2.svg', video: '',
        stats: [{ v: '2.3', u: 'x+', l: 'DEMO REQUESTS', up: true }, { v: '1', u: '+ yr', l: 'PARTNERSHIP' }] },
      { name: 'Client C', role: 'Founder', company: 'COMPANY THREE', poster: '/images/people/video-3.svg', video: '',
        stats: [{ v: '3.1', u: 'x+', l: 'QUALIFIED LEADS', up: true }, { v: '6', u: 'mo', l: 'PAYBACK PERIOD' }] },
    ],
    comments: [
      { name: 'Client D', role: 'CEO, Company Four', t: '4d', accent: '#7A9E5B', avatar: '/images/people/avatar-2.svg', likes: 9, thumbs: 3, badge: 'RESOLVED',
        q: 'Our old site made us look smaller than we are, and the redesign fixed that overnight. Tiny interactions everywhere you can’t unsee.' },
      { name: 'Client E', role: 'Founder, Company Five', t: '2w', accent: '#2F7BF5', avatar: '/images/people/avatar-3.svg', likes: 13, thumbs: 4, badge: 'RESOLVED',
        q: 'Open to all my feedback and quick to turn changes around. They kept it simple while showing off every key feature.' },
      { name: 'Client F', role: 'Marketing Director, Company Six', t: 'Clutch', accent: '#2E7FC2', avatar: '/images/people/avatar-4.svg', likes: 21, thumbs: 6, badge: 'VERIFIED 5.0',
        q: 'Conversions and demo requests went up within weeks. Honestly can’t think of anything to improve.' },
    ],
  },

  // ── CTA siang/malam (mengikuti jam lokasi studio) ─────────────────────────
  cta: { button: 'Talk with me' },

  // ── Pricing (slider 2 paket) ──────────────────────────────────────────────
  pricing: {
    heading: ['Pick your', 'plan.'],
    note: 'one flat price. pause or cancel whenever.',
    currency: '$',
    badge: 'Founding rate, ends soon',
    proof: 'Loved by <b>40+</b> founders &amp; teams',
    delivery: 'Avg 48 hour delivery',
    ctaLabel: 'Start today',
    ctaHref: '/contact',
    reassure: 'No contracts. Cancel or pause anytime.',
    plans: {
      design: { short: 'Just design', name: 'Design', amt: '1,499', was: '$1,699', req: 'One request at a time' },
      dev: { short: 'Design + Dev', name: 'Design + Development', amt: '1,999', was: '$2,499', req: 'Two requests at a time', tag: 'Most picked' },
    },
    base: ['One request at a time', 'Unlimited brands', 'Web & app UI design', 'Design systems', 'Landing & pitch design', 'Unlimited revisions', 'Dedicated design lead', 'Avg. 48 hour delivery'],
    dev: ['Astro & Framer build', 'Interactive prototypes', 'Custom animations', 'HTML email development', 'Technical SEO', 'Two requests at a time'],
  },

  // ── FAQ ───────────────────────────────────────────────────────────────────
  faq: {
    heading: 'The nosy section',
    note: "everything you'd grill us on a call, minus the call.",
    items: [
      { file: 'how-it-works', q: 'Okay, how does this subscription thing work?',
        a: 'You pay <b>one flat monthly fee</b> and we become your design team on tap. Send as many tasks as you like, we build them one at a time and ship fast.' },
      { file: 'need-for-speed', q: 'How fast will I actually see stuff?',
        a: 'Most things land in <b>around 48 hours</b>, quicker for small asks, a little longer for full builds. You always know where your request sits.' },
      { file: 'the-firehose', q: 'How much can I pile onto the queue?',
        a: 'As much as you want. We work <b>one thing at a time</b> so each gets our full attention. Reshuffle your list whenever.' },
      { file: 'the-whole-thing', q: 'Is it just design, or the whole thing?',
        a: 'Design, websites, brands and the marketing pages that get people clicking. <b>Figma, Astro and Framer, all in house.</b>' },
      { file: 'the-do-over', q: 'What if the first draft makes me go ‘hmm’?',
        a: 'Then it’s not done. <b>We revise until you get that ‘oh, that’s the one’ grin.</b> No ego, no drama.' },
    ],
  },

  // ── Drop fun (tombol physics matter.js) ───────────────────────────────────
  dropfun: {
    heading: ['This button does', 'absolutely', 'nothing'],
    sub: 'I built it anyway. Little details like this are my favorite part of the job.',
    button: 'Poke it anyway',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    eyebrow: 'have an idea worth building?',
    bookLabel: 'Show me the idea',
    columns: [
      { title: 'Explore', links: [
        { label: 'About', href: '/#about' }, { label: 'Experience', href: '/#experience' },
        { label: 'What I build', href: '/#services' },
        { label: 'Work', href: '/work' },
        { label: 'Contact', href: '/contact' },
        // { label: 'Pricing', href: '/#pricing' }, // Pricing section hidden for now
        // { label: 'FAQ', href: '/#faq' }, // FAQ section hidden for now
      ] },
    ],
    copyright: `© ${new Date().getFullYear()} Daffa Hanifisyafiq`,
  },
};

// ── Portfolio / case studies ────────────────────────────────────────────────
// Proyek kantor/klien diambil dari portofolio lama (daffa-portfolio-v2/src/data/projects.json).
// Proyek mandiri ditandai kind: 'personal' (badge "Personal" di kartu, Role "Solo, full stack", link GitHub).
// Urutan = urutan tampil di slider beranda & /work: dicampur, yang paling kuat di depan.

type ProjectInput = {
  slug: string;
  name: string;
  /** warna aksen kartu (diambil dari warna screenshot) */
  accent: string;
  /** tech stack, tampil sebagai tag di kartu */
  tags: string[];
  /** ringkasan satu kalimat (kartu /work) */
  summary: string;
  /** screenshot utama di /public/images/work/ */
  image: string;
  /** link live; kosongkan '' untuk proyek internal/klien yang tidak publik */
  link: string;
  industry: string;
  platform: string;
  /** tahun proyek; kosongkan '' bila belum diisi */
  year?: string;
  /** cerita singkat (2–3 kalimat) di bawah statement case study */
  story: string;
  /** 3–4 sorotan "What I worked on" di case study */
  highlights: { title: string; body: string }[];
  /** 'personal' untuk proyek mandiri; default 'client' */
  kind?: 'client' | 'personal';
  /** link repo publik (GitHub); kosongkan bila privat */
  repo?: string;
};

function project(p: ProjectInput): Project {
  const { slug, name, accent, tags, summary, image, link, industry, platform, year = '', story, highlights, kind = 'client', repo = '' } = p;
  const personal = kind === 'personal';
  const facts = [
    { k: 'Role', v: personal ? 'Solo, full stack' : 'Frontend development' },
    { k: 'Industry', v: industry },
    { k: 'Platform', v: platform },
    { k: 'Stack', v: tags.join(', ') },
  ];
  if (year) facts.push({ k: 'Year', v: year });
  return {
    slug, name, accent, tags, year, summary, image, link, platform, kind,
    caseStudy: {
      title: name,
      lede: summary,
      facts,
      live: link ? { label: new URL(link).hostname.replace(/^www\./, ''), url: link } : undefined,
      code: repo ? { label: 'GitHub', url: repo } : undefined,
      statement: story,
      under: '',
      // look / tour / strip stay empty until there are real assets for them (palette, full-page shot, more screenshots)
      process: {
        heading: personal ? 'What I built.' : 'What I worked on.',
        body: personal ? 'My own project, from the idea to the database.' : 'The parts of the frontend I owned.',
        nodes: highlights,
      },
    },
  };
}

export const projects: Project[] = [
  project({
    slug: 'tiketkapal', name: 'Tiket Kapal.com', accent: '#1E4E8C',
    tags: ['React.js', 'Tailwind CSS'], industry: 'Transportation', platform: 'Web',
    summary: 'Online ferry booking for routes from Bali, Tanjung Pinang and Batam.',
    image: '/images/work/tiketkapal.webp', link: 'https://tiketkapal.com/',
    story: 'Tiket Kapal is the public booking site for ferries out of Bali, Tanjung Pinang and Batam. I build and maintain its frontend at PT Mitra Kasih Perkasa: the schedule search, the booking steps and the hand-off to payment, all wired to the booking, payment and ticketing APIs.',
    highlights: [
      { title: 'Search to ticket', body: 'Schedule search, booking and payment, each step connected to its REST API.' },
      { title: 'Through the Eid peak', body: 'On call during the 2025 Eid rush, when daily bookings reached about 13 times the usual, shipping hotfixes while it ran.' },
      { title: 'The rebuild', body: 'Rebuilding the old Next.js app as a lean React single-page app (in staging): 54% lighter pages and 0 ms blocking time on mobile.' },
    ],
  }),
  project({
    slug: 'cawang', name: 'Cawang', accent: '#2F6B34', kind: 'personal',
    tags: ['React', 'TypeScript', 'Supabase'], industry: 'Personal finance', platform: 'Web app (PWA)',
    summary: 'A money tracker that counts the month from payday, not from the 1st.',
    image: '/images/work/cawang.webp', link: 'https://www.cawang.web.id/', repo: 'https://github.com/mazc0de/cawang-v3',
    story: 'Cawang, short for Catat Keuangan, is a money tracker for people whose month starts on payday. It shows what is still safe to spend until the next one, sets money aside for bills with Safe-Pay and turns a purchase into a record in two taps. I designed and built it alone, from the Supabase schema to the landing page.',
    highlights: [
      { title: 'Safe to spend', body: 'The available balance leaves out money locked for upcoming bills, so the number on screen is what you can really use.' },
      { title: 'Payday cycles', body: 'Budgets and reports run from one payday to the next, not by calendar month.' },
      { title: 'Fast entry', body: 'Amounts take sums like 25000+12500, and bulk entry takes rows pasted straight from Excel.' },
      { title: 'Two languages, offline reads', body: 'English and Indonesian, dark mode, and an installable PWA that still shows your data offline.' },
    ],
  }),
  project({
    slug: 'selfkiosk', name: 'Selfkiosk Pelabuhan', accent: '#3E8E7E',
    tags: ['React.js', 'Tailwind CSS'], industry: 'Transportation', platform: 'Kiosk',
    summary: 'Self-service kiosks at the port: browse schedules, pick a route, pay and print the ticket.',
    image: '/images/work/selfkiosk.webp', link: '',
    story: 'Self-service ticket kiosks at the port, so passengers can skip the counter queue. I built the kiosk frontend: choosing a route and schedule, entering passenger details, paying and getting the ticket printed on the spot, all connected to the ferry reservation system.',
    highlights: [
      { title: 'Cashless payments', body: 'Virtual account, QRIS and credit or debit card, all inside the kiosk flow.' },
      { title: 'Under two minutes', body: 'From the first tap to a finished purchase in under two minutes.' },
      { title: 'Instant tickets', body: 'The ticket prints at the kiosk as soon as payment goes through.' },
    ],
  }),
  project({
    slug: 'kashiru', name: 'Kashiru', accent: '#C2410C', kind: 'personal',
    tags: ['React', 'Supabase', 'PWA'], industry: 'Automotive retail', platform: 'Web app (PWA)',
    summary: 'A point-of-sale and stock app for a small motorcycle and car workshop.',
    image: '/images/work/kashiru.webp', link: 'https://kashiru-workshop.vercel.app/', repo: 'https://github.com/mazc0de/kashiru-v2',
    story: 'Kashiru runs the counter of a small workshop that also sells parts: parts and service sales, stock, incoming goods and stock takes, with reports and a change log. It runs on a Windows laptop with a thermal receipt printer and a barcode scanner, and keeps writing receipts when the internet drops.',
    highlights: [
      { title: 'Works offline', body: 'The cashier keeps making receipts without internet; they are sent once the connection is back.' },
      { title: 'Real hardware', body: 'Barcode scanning, plus receipts and barcode labels printed on a 58 or 80 mm thermal printer.' },
      { title: 'Stock you can trust', body: 'Stock cards, low-stock alerts, incoming goods and full or per-category stock takes.' },
      { title: 'Reports and history', body: 'Sales, mechanic and stock reports to Excel and PDF, and a change log nobody can edit.' },
    ],
  }),
  project({
    slug: 'departure-board', name: 'Harbor Departure Board', accent: '#2A17C9',
    tags: ['React.js', 'Tailwind CSS'], industry: 'Transportation', platform: 'Digital signage',
    summary: 'A real-time departure board for ports: vessel, destination, schedule, gate and status.',
    image: '/images/work/departure-board.webp', link: '',
    story: 'The screens in a port terminal that tell passengers which ferry leaves when. I built the board’s frontend: vessel, destination, schedule, gate, status and remarks, kept up to date in real time so nobody has to touch it.',
    highlights: [
      { title: 'Readable from afar', body: 'Large type and color-coded statuses like Boarding and Scheduled.' },
      { title: 'Always current', body: 'Departures update in real time, with the date and a live clock on screen.' },
      { title: 'Every detail in one row', body: 'Vessel, destination, time, gate, status and remarks, side by side.' },
    ],
  }),
  project({
    slug: 'prologue', name: 'Prologue', accent: '#1F7A3D', kind: 'personal',
    tags: ['React', 'TypeScript', 'Supabase'], industry: 'Developer tools', platform: 'Web app',
    summary: 'A project log for developers: repository, environments, releases and a task board.',
    image: '/images/work/prologue.webp', link: 'https://prologue-app.vercel.app/', repo: 'https://github.com/mazc0de/prologue-app',
    story: 'Prologue, short for Project Log Gue, keeps every project in one place: where the code lives, where it runs, which version is out on each environment and what work is left. Teammates join a project by invitation and move tasks on a shared board that updates in real time.',
    highlights: [
      { title: 'Versions per environment', body: 'Production, staging and development, each with its branch and the release that is out.' },
      { title: 'A live board', body: 'Drag-and-drop tasks with labels, synced in real time for everyone on the project.' },
      { title: 'Rules in the database', body: 'Who can see and change what is enforced with row-level security in Postgres, not only in the UI.' },
      { title: 'Paper and ink', body: 'A calm e-ink look: monochrome, hairlines, mono numbers, in light and dark paper.' },
    ],
  }),
  project({
    slug: 'astra-visteon', name: 'Astra Visteon', accent: '#D9822B',
    tags: ['React.js', 'Tailwind CSS'], industry: 'Manufacturing', platform: 'Web app',
    summary: 'A web app for tracking continuous-improvement work through every PDCA stage.',
    image: '/images/work/astra-visteon.webp', link: '',
    story: 'A web app for running continuous improvement with the PDCA cycle: Plan, Do, Check, Action. Teams log issues, follow each one through every stage and see where things stand on a dashboard.',
    highlights: [
      { title: 'Dashboard first', body: 'Total issues, issue status, overdue items and PDCA performance at a glance.' },
      { title: 'Every stage tracked', body: 'Each improvement moves through Plan, Do, Check and Action, with its progress visible.' },
      { title: 'Any time frame', body: 'Daily, weekly and monthly views of issues and claims.' },
    ],
  }),
  project({
    slug: 'kingslock', name: 'Kingslock', accent: '#16A34A', kind: 'personal',
    tags: ['React', 'Supabase', 'WebCrypto'], industry: 'Security', platform: 'Web app',
    summary: 'A zero-knowledge password manager: everything is encrypted in the browser.',
    image: '/images/work/kingslock.webp', link: 'https://kingslock.vercel.app/', repo: 'https://github.com/mazc0de/kingslock',
    story: 'Kingslock is a password manager for one person, self-hosted on Supabase. Every name, login, password and note is encrypted in the browser before it leaves, so the server only ever stores ciphertext. Signing in takes a master password and a 2FA code, and every sensitive action asks for the code again.',
    highlights: [
      { title: 'Zero-knowledge', body: 'Argon2id, HKDF and AES-GCM in the browser; the master password never leaves the device.' },
      { title: 'Enforced by the database', body: 'The 2FA re-check before viewing, editing or exporting is enforced in Postgres, not just in the UI.' },
      { title: 'Careful by default', body: 'Revealed passwords hide again and the clipboard clears after 30 seconds; the vault locks when idle.' },
      { title: 'Nothing left behind', body: 'No browser storage, no third-party scripts, and an activity log that can only grow.' },
    ],
  }),
  project({
    slug: 'mini-bms', name: 'Mini BMS Lifestyle', accent: '#D99A00',
    tags: ['Next.js', 'Tailwind CSS'], industry: 'Transportation', platform: 'Mobile web (Livin’)',
    summary: 'Ferry ticket booking inside Livin’ Sukha Lifestyle, paid with Bank Mandiri.',
    image: '/images/work/mini-bms.webp', link: '',
    story: 'Ferry booking inside the Livin’ by Mandiri app, under its Sukha Lifestyle section. It works like Tiket Kapal, but lives in a webview inside the banking app and pays straight through Bank Mandiri.',
    highlights: [
      { title: 'Inside a banking app', body: 'A webview sized and styled to sit inside a mobile banking app.' },
      { title: 'Search to booking', body: 'Pick a route and date, choose a trip and book, the Tiket Kapal flow in a smaller frame.' },
      { title: 'Paid with Mandiri', body: 'Checkout runs through Bank Mandiri payment services.' },
    ],
  }),
  project({
    slug: 'kos-ibu-ami', name: 'Kos Ibu Ami Petarukan', accent: '#8A6A4F',
    tags: ['Next.js', 'Tailwind CSS', 'shadcn/ui'], industry: 'Property', platform: 'Web',
    summary: 'A simple website for a boarding house in Petarukan, with facilities, location and contact in one place.',
    image: '/images/work/kos-ibu-ami.webp', link: 'https://kosibuami.my.id/',
    story: 'A small website for a boarding house in Petarukan. Anyone looking for a room can see the facilities, real photos and the location in one place, then contact the owner directly. Built with Next.js, Tailwind CSS and shadcn/ui.',
    highlights: [
      { title: 'The facts up front', body: 'Room size, private bathroom, shared kitchen, parking and free electricity: what tenants ask first.' },
      { title: 'Real photos', body: 'Pictures of the actual rooms and building, not stock images.' },
      { title: 'One tap to ask', body: 'A contact button that goes straight to the owner.' },
    ],
  }),
  project({
    slug: 'spc-detailing', name: 'SPC Auto Detailing', accent: '#D62828',
    tags: ['React.js', 'Tailwind CSS'], industry: 'Automotive', platform: 'Landing page',
    summary: 'A landing page for a car detailing and ceramic coating business.',
    image: '/images/work/spc-detailing.webp', link: '',
    story: 'A landing page for a car detailing and ceramic coating business. It shows off the work with big photos, explains the services plainly and keeps the next step, the price list or a message, within reach.',
    highlights: [
      { title: 'A hero that sells', body: 'Full-width photos of the work, a short promise and a Pricelist button right away.' },
      { title: 'Services, plainly', body: 'Detailing, paint protection and ceramic coating, each explained in simple words.' },
      { title: 'Two languages', body: 'A language switch in the header for visitors who prefer English.' },
    ],
  }),
];

/** konfigurasi yang dibaca oleh script interaktif di /public/js (window.__SITE__) */
export const clientConfig = {
  brand: site.brand,
  email: site.email,
  /** /contact: the brief opens in WhatsApp (wa.me) or the visitor's email app, no form backend */
  whatsapp: site.whatsapp,
  teammate: site.teammate,
  watcher: site.watcher,
  heroLines: site.hero.lines,
  utcOffsetMs: site.location.utcOffsetMinutes * 60_000,
  country: site.location.country,
  city: site.location.city,
  lat: site.location.lat,
  lon: site.location.lon,
  pricing: {
    base: site.pricing.base,
    dev: site.pricing.dev,
    plans: site.pricing.plans,
  },
};
