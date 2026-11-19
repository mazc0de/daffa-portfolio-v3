/* services horizontal scroll (isolated + robust) */
(function(){
  var sec=document.querySelector('.sv-story');
  if(sec){
    var track=sec.querySelector('.sv-track');
    /* perf: layout is measured only when sizes change; scrolling just does math + one transform write */
    var secTop=0,travel=0,max=0,raf=0;
    function measure(){
      secTop=sec.getBoundingClientRect().top+window.scrollY;
      travel=sec.offsetHeight-window.innerHeight;
      max=track.scrollWidth-window.innerWidth;
      update();
    }
    function update(){
      raf=0;
      var pr= travel>0 ? Math.max(0,Math.min(1,(window.scrollY-secTop)/travel)) : 0;
      track.style.transform='translateX('+(-(pr*max)).toFixed(2)+'px)';
    }
    function onScroll(){ if(!raf) raf=requestAnimationFrame(update); }
    /* keyboard: the panels slide sideways with the page scroll, so focusing a control in an off-screen panel
       scrolls the page to the point where that panel is in view */
    track.addEventListener('focusin',function(e){
      var p=e.target.closest('.sv-panel');if(!p||max<=0||travel<=0)return;
      var r=p.getBoundingClientRect();if(r.left>=0&&r.right<=window.innerWidth)return;
      window.scrollTo(0,secTop+Math.max(0,Math.min(1,p.offsetLeft/max))*travel);
    });
    addEventListener('scroll',onScroll,{passive:true});
    addEventListener('resize',measure);
    addEventListener('load',measure);
    if(document.fonts&&document.fonts.ready) document.fonts.ready.then(measure);
    /* content above the section (images, fonts, accordions) can shift it — re-measure when the page or track resizes */
    if('ResizeObserver' in window){ var ro=new ResizeObserver(function(){ requestAnimationFrame(measure); }); ro.observe(document.body); ro.observe(track); }
    measure();
  }
  document.querySelectorAll('.sv-toggle').forEach(function(t){
    t.addEventListener('click',function(){var d=t.closest('.sv-drop');if(!d)return;var open=d.classList.toggle('sv-open');t.setAttribute('aria-expanded',open?'true':'false');});
  });
})();
