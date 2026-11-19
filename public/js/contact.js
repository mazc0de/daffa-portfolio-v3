/* /contact: no form backend. The brief is turned into a message and opened in
   WhatsApp (wa.me, to site.whatsapp) or in the visitor's own email app (mailto: site.email). */
(function () {
  var cfg = window.__SITE__ || {};
  var form = document.getElementById('ccForm'), done = document.getElementById('ccDone');
  var doneP = document.getElementById('ccDoneP'), note = document.getElementById('ccNote');
  var noteText = note ? note.textContent : '';

  function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ''; }

  function compose() {
    var name = val('ccName'), co = val('ccCo'), msg = val('ccMsg');
    var lines = ['Hi ' + (cfg.brand || 'there') + '! I have an idea for you.', ''];
    if (name) lines.push('Name: ' + name);
    if (co) lines.push('Company / link: ' + co);
    if (name || co) lines.push('');
    lines.push('The brief:', msg);
    return { text: lines.join('\n'), subject: 'Project brief from ' + (name || 'your portfolio') };
  }

  function open(url, newTab) {
    if (newTab) { var w = window.open(url, '_blank', 'noopener'); if (w) return; }
    window.location.href = url;
  }

  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ta = document.getElementById('ccMsg');
    if (!val('ccMsg')) {
      ta.focus(); ta.setAttribute('aria-invalid', 'true');
      if (note) { note.textContent = 'Add a line or two about the idea first, rough is fine.'; note.classList.add('err'); }
      return;
    }
    ta.removeAttribute('aria-invalid');
    if (note) { note.textContent = noteText; note.classList.remove('err'); }

    var via = (e.submitter && e.submitter.dataset.via) || (cfg.whatsapp ? 'wa' : 'mail');
    var m = compose();
    if (via === 'wa' && cfg.whatsapp) {
      open('https://wa.me/' + cfg.whatsapp + '?text=' + encodeURIComponent(m.text), true);
      if (doneP) doneP.textContent = 'WhatsApp just opened with your brief. Hit send there and I’ll reply within a day.';
    } else {
      open('mailto:' + (cfg.email || '') + '?subject=' + encodeURIComponent(m.subject) + '&body=' + encodeURIComponent(m.text), false);
      if (doneP) doneP.textContent = 'Your email app just opened with the brief. Hit send there and I’ll reply within a day.';
    }
    form.style.display = 'none';
    if (done) done.classList.add('show');
  });

  var back = document.getElementById('ccBack');
  if (back) back.addEventListener('click', function () {
    if (done) done.classList.remove('show');
    if (form) { form.style.display = ''; var ta = document.getElementById('ccMsg'); if (ta) ta.focus(); }
  });

  var cp = document.getElementById('ccCopy');
  if (cp) cp.addEventListener('click', function () {
    try { navigator.clipboard.writeText(cfg.email || ''); } catch (e) {}
    var o = cp.textContent; cp.textContent = 'copied ✓';
    setTimeout(function () { cp.textContent = o; }, 1400);
  });
})();
