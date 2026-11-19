(function(){
  var track=document.getElementById('wkfilTrack'),pill=document.getElementById('wkfilPill');
  if(!track||!pill)return;
  function move(){
    var on=track.querySelector('.pf-chip.on'); if(!on)return;
    pill.style.width=on.offsetWidth+'px';
    pill.style.transform='translateX('+(on.offsetLeft-5)+'px)';
  }
  track.addEventListener('click',function(e){
    if(e.target.closest('.pf-chip')) requestAnimationFrame(move);
  });
  window.addEventListener('resize',move);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(move);
  setTimeout(move,60); setTimeout(move,400);
})();
