(function(){
  var vids=[].slice.call(document.querySelectorAll('video.sv-vid'));
  if(!vids.length)return;
  /* reduced motion: keep the poster frames, never autoplay the loops */
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;

  function load(v){
    if(v.getAttribute('src'))return;
    var src=v.getAttribute('data-src');if(!src)return;
    v.setAttribute('src',src);
    v.load();
  }

  /* No IntersectionObserver (old browsers): just load them normally. */
  if(!('IntersectionObserver' in window)){
    vids.forEach(function(v){load(v);v.play().catch(function(){});});
    return;
  }

  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      var v=e.target;
      if(e.isIntersecting){
        load(v);
        v.play().catch(function(){});
      }else{
        v.pause();
      }
    });
  },{rootMargin:'200px 0px',threshold:0.01});

  vids.forEach(function(v){io.observe(v);});

  /* Autoplaying video off-tab is wasted bytes and wasted battery. */
  document.addEventListener('visibilitychange',function(){
    if(document.hidden)vids.forEach(function(v){v.pause();});
  });
})();
