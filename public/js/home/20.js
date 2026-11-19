(function(){
  /* the slider measures itself on init; media queries and webfonts can change
     the card width after that, so nudge it to re-measure once things settle */
  function recenter(){ window.dispatchEvent(new Event('resize')); }
  window.addEventListener('load',recenter);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(recenter);
  setTimeout(recenter,250); setTimeout(recenter,900);
  window.addEventListener('orientationchange',function(){setTimeout(recenter,220);});
})();
