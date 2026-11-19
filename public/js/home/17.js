(function(){
  var track=document.getElementById('omwTrack'),slider=document.getElementById('omwSlider'),dots=document.getElementById('omwDots');
  if(!track) return;
  var N=dots.children.length, slides=[].slice.call(track.children), cur=N, curOff=0, startOff=0, startX=0, drag=false, moved=0, settle=null;
  function metrics(){var w=slides[0].offsetWidth,g=parseFloat(getComputedStyle(slides[0]).marginRight);return {w:w+g,sw:w};}
  function offsetFor(i){var m=metrics();return (slider.clientWidth/2)-(i*m.w)-(m.sw/2);}
  var still=matchMedia('(prefers-reduced-motion: reduce)');
  function apply(off,anim){track.style.transition=anim&&!still.matches?'transform .72s cubic-bezier(.22,.9,.24,1)':'none';track.style.transform='translateX('+off+'px)';curOff=off;}
  function render(anim){
    slides.forEach(function(s,i){s.classList.toggle('active',i===cur);s.classList.toggle('side',i!==cur);});
    [].forEach.call(dots.children,function(b,i){var on=i===cur%N;b.className=on?'on':'';if(on)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current');});
    apply(offsetFor(cur),anim!==false);
  }
  function normalize(){
    if(cur<N){cur+=N;apply(offsetFor(cur),false);render(false);}
    else if(cur>=2*N){cur-=N;apply(offsetFor(cur),false);render(false);}
  }
  function go(n){cur=n;render(true);clearTimeout(settle);settle=setTimeout(normalize,760);}
  document.getElementById('omwNext').onclick=function(){go(cur+1);};
  document.getElementById('omwPrev').onclick=function(){go(cur-1);};
  dots.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;go(Math.floor(cur/N)*N+(+b.dataset.i));});
  track.addEventListener('click',function(e){
    if(moved>6){e.preventDefault();return;}
    var s=e.target.closest('.omw-slide');if(!s)return;
    var idx=slides.indexOf(s);
    if(idx!==cur){e.preventDefault();go(idx);}
  });
  function down(x){drag=true;startX=x;startOff=curOff;moved=0;clearTimeout(settle);track.style.transition='none';document.body.classList.add('omw-grabbing');}
  function move(x){if(!drag)return;var d=x-startX;moved=Math.abs(d);apply(startOff+d,false);}
  function up(){
    document.body.classList.remove('omw-grabbing');
    if(!drag)return;drag=false;
    var m=metrics(),delta=curOff-startOff;
    if(Math.abs(delta)>m.sw*0.1){go(cur+(delta<0?1:-1));}
    else{render(true);clearTimeout(settle);settle=setTimeout(normalize,760);}
    setTimeout(function(){moved=0;},60);
  }
  slider.addEventListener('mousedown',function(e){if(e.target.closest('[data-cs]'))return;e.preventDefault();down(e.clientX);});
  window.addEventListener('mousemove',function(e){move(e.clientX);});
  window.addEventListener('mouseup',up);
  slider.addEventListener('touchstart',function(e){down(e.touches[0].clientX);},{passive:true});
  slider.addEventListener('touchmove',function(e){move(e.touches[0].clientX);},{passive:true});
  slider.addEventListener('touchend',up);
  /* horizontal trackpad swipe (two fingers left/right) or shift+wheel moves the track with the fingers,
     then snaps to the nearest card once the gesture and its momentum end.
     Vertical scrolling is left alone so the page keeps scrolling normally. */
  var wOn=false,wStart=0,wAcc=0,wEnd=null;
  function wheelDone(){
    wOn=false;
    var m=metrics(),steps=Math.round(-wAcc/m.w);
    if(!steps&&Math.abs(wAcc)>m.sw*0.1)steps=wAcc<0?1:-1;
    go(cur+steps);
  }
  slider.addEventListener('wheel',function(e){
    if(e.ctrlKey||drag)return;
    var dx=e.deltaX,dy=e.deltaY;
    if(e.deltaMode===1){dx*=16;dy*=16;}
    if(e.shiftKey&&!dx){dx=dy;dy=0;}
    if(Math.abs(dx)<=Math.abs(dy))return;
    e.preventDefault();
    if(!wOn){wOn=true;wStart=curOff;wAcc=0;clearTimeout(settle);}
    var lim=(N-1)*metrics().w;
    wAcc=Math.max(-lim,Math.min(lim,wAcc-dx));
    apply(wStart+wAcc,false);
    clearTimeout(wEnd);wEnd=setTimeout(wheelDone,140);
  },{passive:false});
  /* keyboard: tabbing to a case-study link brings its slide to the centre.
     The slider clips with overflow:hidden, so undo any scroll the browser does to reveal the focused link. */
  track.addEventListener('focusin',function(e){
    slider.scrollLeft=0;
    var s=e.target.closest('.omw-slide');if(!s)return;
    var idx=slides.indexOf(s);
    if(idx!==cur)go(idx);
  });
  slider.addEventListener('scroll',function(){if(slider.scrollLeft)slider.scrollLeft=0;});
  window.addEventListener('resize',function(){render(false);});
  render(false);

  /* drag pill rides the site's existing cursor */
  var you=document.getElementById('curYou');
  if(you){
    var pill=document.createElement('span');
    pill.className='omw-drag';
    pill.innerHTML='<svg class="l" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg><b>DRAG</b><svg class="r" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
    you.appendChild(pill);
    document.addEventListener('mouseover',function(e){
      var inSlider=e.target.closest('#omwSlider'), cs=e.target.closest('[data-cs]');
      document.body.classList.toggle('omw-dragging', !!inSlider && !cs);
    });
  }
})();
