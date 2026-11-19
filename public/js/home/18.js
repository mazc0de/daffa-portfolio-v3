(function(){
  var cards=[].slice.call(document.querySelectorAll('#reviews .tv'));
  if(!cards.length)return;

  /* Only wire hover-play on real pointers. On touch, mouseenter fires on
     tap and would pull the whole file right before the lightbox opens
     and pulls it again. */
  var canHover=window.matchMedia&&window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if(!canHover)return;

  var HOVER_DELAY=140; /* ms of intent before we spend any bandwidth */

  cards.forEach(function(c){
    var v=c.querySelector('video');if(!v)return;
    var timer=null;

    function attach(){
      if(v.getAttribute('src'))return;           /* already attached */
      var src=v.getAttribute('data-src');if(!src)return;
      v.setAttribute('src',src);
      v.load();
    }

    c.addEventListener('mouseenter',function(){
      clearTimeout(timer);
      timer=setTimeout(function(){
        attach();
        v.play().catch(function(){});
      },HOVER_DELAY);
    });

    c.addEventListener('mouseleave',function(){
      clearTimeout(timer);
      v.pause();
    });
  });
})();
