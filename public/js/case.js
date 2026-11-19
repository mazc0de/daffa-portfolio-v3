(function(){
  var fine = matchMedia('(pointer:fine)').matches, calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function $(s){ return document.querySelector(s); }
  function $$(s){ return [].slice.call(document.querySelectorAll(s)); }
  function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }

  /* reveals */
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, {threshold:.1});
  $$('.cs-rv').forEach(function(el){ io.observe(el); });
  var t = $('#csTitle'); if(t) requestAnimationFrame(function(){ setTimeout(function(){ t.classList.add('in'); }, 120); });

  /* split text into words for the scroll fill */
  var fills = $$('[data-fill]').map(function(el){
    el.innerHTML = el.textContent.trim().split(/\s+/).map(function(w){ return '<span class="wd">'+w+'</span>'; }).join(' ');
    return { el: el, words: [].slice.call(el.querySelectorAll('.wd')) };
  });

  var cover = $('#csCover'), fill = $('#csFill'), line = $('#csLine'), nodes = $$('.cs-node');
  function onScroll(){
    var vh = innerHeight;
    /* cover opens to full width */
    if(cover){
      var r = cover.getBoundingClientRect(), p = clamp((vh - r.top) / (vh * .9), 0, 1);
      var gut = Math.max(18, (innerWidth - 1160) / 2);
      cover.style.setProperty('--cx', (gut * (1 - p)).toFixed(1) + 'px');
      cover.style.setProperty('--cr', (24 * (1 - p)).toFixed(1) + 'px');
      cover.style.setProperty('--cs', (1.08 - .08 * p).toFixed(3));
    }
    /* word fill */
    fills.forEach(function(f){
      var r = f.el.getBoundingClientRect(), p = clamp((vh * .85 - r.top) / (r.height + vh * .35), 0, 1);
      var n = calm ? f.words.length : Math.round(p * f.words.length);
      if(n !== f.n){ f.n = n; f.words.forEach(function(w,i){ w.classList.toggle('on', i < n); }); }
    });
    /* process line */
    if(line && fill){
      var r2 = line.getBoundingClientRect(), p2 = clamp((vh * .75 - r2.top) / (vh * .5), 0, 1);
      fill.style.width = (p2 * 100) + '%';
      nodes.forEach(function(n,i){ n.classList.toggle('on', p2 >= i / (nodes.length - 1) - .02); });
    }
  }
  /* perf: at most one layout read per frame while scrolling */
  var sraf = 0; function onScrollRaf(){ if(!sraf) sraf = requestAnimationFrame(function(){ sraf = 0; onScroll(); }); }
  addEventListener('scroll', onScrollRaf, {passive:true}); addEventListener('resize', onScrollRaf); onScroll();

  /* camera tour */
  var canvas = $('#csCanvas'), steps = $$('.cs-step'), hudN = $('#csHudN'), hudT = $('#csHudT'), zoom = $('#csZoom'), curStep = -1;
  function focus(i){
    if(!canvas || i === curStep) return; curStep = i;
    var s = steps[i], view = canvas.parentNode, W = view.clientWidth, VH = view.clientHeight, H = canvas.offsetHeight || W * .5625;
    var z = +s.dataset.z, x = +s.dataset.x, y = +s.dataset.y;
    var tx = W / 2 - z * x * W, ty = VH / 2 - z * y * H;
    tx = clamp(tx, W - z * W, 0);
    ty = z * H < VH ? (VH - z * H) / 2 : clamp(ty, VH - z * H, 0);
    canvas.style.transform = 'translate(' + tx.toFixed(1) + 'px,' + ty.toFixed(1) + 'px) scale(' + z + ')';
    steps.forEach(function(st,j){ st.classList.toggle('on', j === i); });
    if(hudN) hudN.textContent = i + 1;
    if(hudT) hudT.textContent = s.querySelector('h3').textContent;
    if(zoom) zoom.textContent = Math.round(z * 100) + '%';
  }
  if(steps.length){
    var so = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) focus(steps.indexOf(e.target)); }); }, {rootMargin:'-45% 0px -45% 0px'});
    steps.forEach(function(s){ so.observe(s); });
    var img = canvas && canvas.querySelector('img');
    function init(){ curStep = -1; focus(0); }
    if(img && !img.complete) img.addEventListener('load', init); else init();
    addEventListener('resize', function(){ var c = curStep; curStep = -1; focus(Math.max(0,c)); });
  }

  /* drag strip */
  var strip = $('#csStrip'), bar = $('#csBar'), dcur = $('#csDcur');
  if(strip){
    var down = false, sx = 0, sl = 0, moved = 0;
    function upd(){ var max = strip.scrollWidth - strip.clientWidth; if(bar){ var w = strip.clientWidth / strip.scrollWidth; bar.style.width = (w * 100) + '%'; bar.style.transform = 'translateX(' + (max ? strip.scrollLeft / max * (1 / w - 1) * 100 : 0) + '%)'; } }
    strip.addEventListener('scroll', upd, {passive:true}); addEventListener('resize', upd); upd();
    if(fine){
      strip.addEventListener('pointerdown', function(e){ down = true; sx = e.clientX; sl = strip.scrollLeft; moved = 0; strip.classList.add('drag'); dcur && dcur.classList.add('down'); strip.setPointerCapture(e.pointerId); });
      strip.addEventListener('pointermove', function(e){ if(dcur){ dcur.style.left = e.clientX + 'px'; dcur.style.top = e.clientY + 'px'; } if(!down) return; moved = e.clientX - sx; strip.scrollLeft = sl - moved; });
      function end(){ down = false; strip.classList.remove('drag'); dcur && dcur.classList.remove('down'); }
      strip.addEventListener('pointerup', end); strip.addEventListener('pointercancel', end);
      strip.addEventListener('pointerenter', function(){ dcur && dcur.classList.add('on'); });
      strip.addEventListener('pointerleave', function(){ dcur && dcur.classList.remove('on'); end(); });
    }
  }

  /* next project: image follows the cursor */
  var next = $('#csNext'), fl = $('#csFloat');
  if(next && fl && fine){
    next.addEventListener('mousemove', function(e){ var r = next.getBoundingClientRect(); fl.style.left = (e.clientX - r.left) + 'px'; fl.style.top = (e.clientY - r.top) + 'px'; });
  }

  /* copy colours */
  var toast = $('#csToast'), tt;
  $$('.cs-pal button').forEach(function(b){
    b.addEventListener('click', function(){
      var hex = b.dataset.hex;
      if(navigator.clipboard) navigator.clipboard.writeText(hex).catch(function(){});
      if(toast){ toast.textContent = 'Copied ' + hex; toast.classList.add('show'); clearTimeout(tt); tt = setTimeout(function(){ toast.classList.remove('show'); }, 1400); }
    });
  });

  /* keep the tour screenshot centred on screen, with no empty gap above it */
  function sizeStage(){
    var st = document.querySelector('.cs-stage'), tour = document.querySelector('.cs-tour');
    if(!st || !tour) return;
    tour.style.setProperty('--stH', st.offsetHeight + 'px');
    st.style.top = innerWidth > 980 ? Math.max(96, (innerHeight - st.offsetHeight) / 2 + 24) + 'px' : '';
  }
  addEventListener('resize', sizeStage); addEventListener('load', sizeStage); sizeStage();
})();
