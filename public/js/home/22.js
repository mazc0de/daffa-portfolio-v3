/* perf: pause CSS loop animations in sections that are far off screen (see .is-off in home.css).
   Fixed layers (sky, topbar, cursors) live outside these sections, so they keep animating. */
(function(){
  if(!('IntersectionObserver' in window)) return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(en){ en.target.classList.toggle('is-off',!en.isIntersecting); });
  },{rootMargin:'200px 0px'});
  document.querySelectorAll('body > header, body > section, body > footer').forEach(function(s){ io.observe(s); });
})();
