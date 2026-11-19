/* CTA "got an idea?": changes with the time AND the real weather where Daffa is.
   - time of day comes from the site's UTC offset (WIB), not the visitor's clock
   - weather comes from Open-Meteo (free, no key) for the city's coordinates, refreshed every 15 min
   - if the weather can't be fetched, the section simply falls back to the time-based states */
(function () {
  var cfg = window.__SITE__ || {};
  var OFF = cfg.utcOffsetMs == null ? 25200000 : cfg.utcOffsetMs;
  var CITY = cfg.city || 'Semarang';
  var city = CITY.toLowerCase();

  var head = document.getElementById('dnHead'), tape = document.getElementById('dnTape'),
      glyph = document.getElementById('dnGlyph'), sub = document.getElementById('dnSub'),
      cta = document.getElementById('dnCta');
  if (!head) return;

  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function localMs() { return Date.now() + OFF; }
  function hourNow() { return Math.floor(localMs() / 3600000) % 24; }
  function hmNow() { var m = localMs(); return pad(Math.floor(m / 3600000) % 24) + ':' + pad(Math.floor(m / 60000) % 60); }

  /* ── glyphs ─────────────────────────────────────────────────────────────── */
  var INK = '#14202B', BRAND = '#F0531C', RAIN = '#0D99FF';
  function ray(list) {
    return list.map(function (a) {
      var r = a * Math.PI / 180;
      return '<line x1="' + (60 + 37 * Math.cos(r)).toFixed(1) + '" y1="' + (60 + 37 * Math.sin(r)).toFixed(1) +
        '" x2="' + (60 + 50 * Math.cos(r)).toFixed(1) + '" y2="' + (60 + 50 * Math.sin(r)).toFixed(1) + '"/>';
    }).join('');
  }
  function horizon(rays, sunY) {
    return '<svg viewBox="0 0 140 110" width="150" height="112" aria-hidden="true"><g stroke="' + BRAND + '" stroke-width="4" stroke-linecap="round">' +
      rays.map(function (a) {
        var r = a * Math.PI / 180;
        return '<line x1="' + (70 + 30 * Math.cos(r)).toFixed(1) + '" y1="' + (sunY + 30 * Math.sin(r)).toFixed(1) +
          '" x2="' + (70 + 42 * Math.cos(r)).toFixed(1) + '" y2="' + (sunY + 42 * Math.sin(r)).toFixed(1) + '"/>';
      }).join('') + '</g><circle cx="70" cy="' + sunY + '" r="23" fill="' + BRAND + '"/><rect x="6" y="' + (sunY + 2) +
      '" width="128" height="34" fill="#A6D6F3"/><line x1="8" y1="' + (sunY + 2) + '" x2="132" y2="' + (sunY + 2) +
      '" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/></svg>';
  }
  var SUN = '<svg viewBox="0 0 120 120" width="112" height="112" class="float" aria-hidden="true"><circle cx="60" cy="60" r="25" fill="' + BRAND + '"/><g stroke="' + BRAND + '" stroke-width="5" stroke-linecap="round">' + ray([0, 45, 90, 135, 180, 225, 270, 315]) + '</g></svg>';
  var MOON = '<svg viewBox="0 0 120 120" width="108" height="108" class="float" aria-hidden="true"><path d="M82 60a32 32 0 1 1-32-32 26 26 0 0 0 32 32z" fill="' + INK + '"/><circle cx="92" cy="34" r="2.6" fill="' + INK + '"/><circle cx="80" cy="20" r="1.8" fill="' + INK + '"/><circle cx="100" cy="52" r="1.8" fill="' + INK + '"/></svg>';
  var DAWN = horizon([200, 225, 250, 290, 315, 340], 84);
  var DUSK = horizon([200, 235, 270, 305, 340], 78);

  /* cloud drawn white with an ink outline, like the rest of the canvas */
  var CLOUD_PATH = 'M30 74h58a17 17 0 0 0 1-34 25 25 0 0 0-47-6 18 18 0 0 0-12 40z';
  function cloud(extra, under) {
    /* the cloud and what falls from it sit 8px lower, so a sun or moon can peek out above it */
    return '<svg viewBox="0 0 120 120" width="128" height="128" class="float dn-wx" aria-hidden="true">' + (under || '') +
      '<g transform="translate(0 8)"><path d="' + CLOUD_PATH + '" fill="#fff" stroke="' + INK + '" stroke-width="4" stroke-linejoin="round"/>' + (extra || '') + '</g></svg>';
  }
  function drops(list) {
    return (list || [[42, 0], [58, .35], [74, .7], [50, .9], [66, .15]]).map(function (d) {
      return '<line class="dn-drop" style="animation-delay:' + d[1] + 's" x1="' + d[0] + '" y1="84" x2="' + (d[0] - 4) + '" y2="96" stroke="' + RAIN + '" stroke-width="4" stroke-linecap="round"/>';
    }).join('');
  }
  var SMALL_SUN = '<circle cx="90" cy="24" r="17" fill="' + BRAND + '"/><g stroke="' + BRAND + '" stroke-width="4" stroke-linecap="round"><line x1="90" y1="1" x2="90" y2="-1"/><line x1="112" y1="24" x2="116" y2="24"/><line x1="106" y1="8" x2="109" y2="5"/></g>';
  var SMALL_MOON = '<path d="M104 26a17 17 0 1 1-17-17 13 13 0 0 0 17 17z" fill="' + INK + '"/>';
  var CLOUDY = cloud('', SMALL_SUN);
  var RAINY = cloud(drops());
  var RAINY_NIGHT = cloud(drops(), SMALL_MOON);
  var STORM = cloud('<path class="dn-bolt" d="M66 66 50 90h12l-8 20 24-30H66l9-14z" fill="' + BRAND + '" stroke="' + INK + '" stroke-width="2.5" stroke-linejoin="round"/>' + drops([[38, 0], [88, .5]]));

  /* rain + lightning motion (respects reduced motion) */
  if (!document.getElementById('dnWxStyle')) {
    var st = document.createElement('style');
    st.id = 'dnWxStyle';
    st.textContent = '.dn-drop{animation:dnDrop 1.1s linear infinite}' +
      '@keyframes dnDrop{0%{transform:translateY(-6px);opacity:0}25%{opacity:1}100%{transform:translateY(12px);opacity:0}}' +
      '.dn-bolt{animation:dnBolt 2.8s steps(1) infinite}' +
      '@keyframes dnBolt{0%,90%,94%,100%{opacity:1}91%,93%{opacity:.35}}' +
      '@media (prefers-reduced-motion:reduce){.dn-drop,.dn-bolt{animation:none}}';
    document.head.appendChild(st);
  }

  /* ── states ─────────────────────────────────────────────────────────────── */
  var TALK = 'Talk with me', LEAVE = 'Leave your idea';
  var ST = {
    dawn:   { hl: 'First coffee,<br>then <span class="o">you.</span>', tape: 'sunrise in ' + city, glyph: DAWN,
              sub: 'It’s {t} in ' + CITY + '. Booting up, and your idea is first in line.', cta: TALK },
    day:    { hl: 'Me <span class="o">too.</span>', tape: 'the sun’s up in ' + city, glyph: SUN,
              sub: 'It’s {t} in ' + CITY + '. Perfect light for building, so send it over.', cta: TALK },
    dusk:   { hl: 'Still <span class="o">building.</span>', tape: 'golden hour in ' + city, glyph: DUSK,
              sub: 'It’s {t} in ' + CITY + '. The best ideas always seem to land about now.', cta: TALK },
    night:  { hl: 'Ideas don’t <span class="o">sleep.</span>', tape: 'it’s late in ' + city, glyph: MOON,
              sub: 'It’s {t} in ' + CITY + '. Leave your idea, I’ll pick it up in the morning.', cta: LEAVE },
    cloudy: { hl: 'Grey skies,<br><span class="o">clear</span> head.', tape: 'cloudy in ' + city, glyph: CLOUDY,
              sub: 'It’s {t} in ' + CITY + '. Grey outside, good focus inside, so send it over.', cta: TALK },
    rain:   { hl: 'Rain or <span class="o">shine.</span>', tape: 'it’s raining in ' + city, glyph: RAINY,
              sub: 'It’s {t} in ' + CITY + ' and it’s pouring. Good weather to stay in and build.', cta: TALK },
    rainNight: { hl: 'Rain or <span class="o">shine.</span>', tape: 'rainy night in ' + city, glyph: RAINY_NIGHT,
              sub: 'It’s {t} in ' + CITY + ', raining and quiet. Leave your idea, I’ll pick it up in the morning.', cta: LEAVE },
    storm:  { hl: 'Thunder outside,<br><span class="o">focus</span> inside.', tape: 'thunderstorm in ' + city, glyph: STORM,
              sub: 'It’s {t} in ' + CITY + ' and the sky is loud. Still building, so send it over.', cta: TALK }
  };

  function timeState(h) {
    if (h >= 5 && h < 8) return 'dawn';
    if (h >= 8 && h < 17) return 'day';
    if (h >= 17 && h < 20) return 'dusk';
    return 'night';
  }
  var weather = null; /* 'rain' | 'storm' | 'cloudy' | null */
  function pick() {
    var t = timeState(hourNow());
    if (weather === 'storm') return 'storm';
    if (weather === 'rain') return t === 'night' ? 'rainNight' : 'rain';
    if (weather === 'cloudy' && t === 'day') return 'cloudy';
    return t;
  }

  var cur = null, lastSub = '';
  function apply() {
    var k = pick(), v = ST[k];
    if (k !== cur) {
      cur = k;
      head.innerHTML = v.hl;
      if (window.__omReheadline) window.__omReheadline(head);
      tape.textContent = v.tape;
      glyph.innerHTML = v.glyph;
      cta.textContent = v.cta;
    }
    var html = v.sub.replace('{t}', '<b>' + hmNow() + '</b>');
    if (html !== lastSub) { lastSub = html; sub.innerHTML = html; }
  }
  apply();
  setInterval(apply, 1000);

  /* ── real weather ───────────────────────────────────────────────────────── */
  /* WMO weather codes: https://open-meteo.com/en/docs */
  function classify(code) {
    if (code >= 95) return 'storm';
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rain';
    if (code === 3 || code === 45 || code === 48) return 'cloudy';
    return null;
  }
  /* the hero corner shows the same reading, so share it as an event */
  function share(c) {
    try { document.dispatchEvent(new CustomEvent('dn:weather', { detail: { code: c.code, temp: c.temp, day: c.day } })); } catch (e) {}
  }
  var KEY = 'dnWeather2', TTL = 15 * 60 * 1000;
  function cached() {
    try { var c = JSON.parse(sessionStorage.getItem(KEY) || 'null'); if (c && Date.now() - c.at < TTL) return c; } catch (e) {}
    return null;
  }
  function load() {
    var c = cached();
    if (c) { weather = c.w; apply(); share(c); return; }
    if (cfg.lat == null || cfg.lon == null || !window.fetch) return;
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 6000);
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + cfg.lat + '&longitude=' + cfg.lon + '&current=weather_code,temperature_2m,is_day',
          ctrl ? { signal: ctrl.signal } : undefined)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        clearTimeout(timer);
        if (!d || !d.current || typeof d.current.weather_code !== 'number') return;
        var now = d.current;
        weather = classify(now.weather_code);
        var c = { w: weather, code: now.weather_code, temp: now.temperature_2m, day: now.is_day, at: Date.now() };
        try { sessionStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
        apply();
        share(c);
      })
      .catch(function () { clearTimeout(timer); /* keep the time-based state */ });
  }
  load();
  setInterval(load, TTL);
})();
