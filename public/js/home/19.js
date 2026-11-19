(function(){
  var cards=[].slice.call(document.querySelectorAll('#reviews .tv'));
  if(!cards.length)return;
  var lb=document.createElement('div');
  lb.id='tstLb';
  lb.innerHTML='<div class="box"><button class="x" aria-label="Close">&times;</button>'+
    '<video controls playsinline preload="none"></video><div class="who"><div class="nm"></div><div class="rl"></div></div></div>';
  document.body.appendChild(lb);
  var v=lb.querySelector('video'),nm=lb.querySelector('.who .nm'),rl=lb.querySelector('.who .rl');
  function open(card){
    var src=card.getAttribute('data-video');if(!src)return;
    nm.textContent=(card.querySelector('.cap .nm')||{}).textContent||'';
    var _r=(card.querySelector('.cap .rl')||{}).textContent||'',_c=(card.querySelector('.cap .co')||{}).textContent||'';rl.textContent=[_r,_c].filter(Boolean).join(', ');
    v.src=src;lb.classList.add('on');document.body.classList.add('tstlb-open');
    v.currentTime=0;v.muted=false;v.play().catch(function(){});
    document.body.style.overflow='hidden';
  }
  function close(){lb.classList.remove('on');document.body.classList.remove('tstlb-open');v.pause();v.removeAttribute('src');v.load();document.body.style.overflow='';}
  cards.forEach(function(c){
    c.addEventListener('click',function(){open(c);});
    var p=c.querySelector('.play');
    if(p)p.addEventListener('click',function(e){e.stopPropagation();open(c);});
  });
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('x'))close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&lb.classList.contains('on'))close();});
})();
