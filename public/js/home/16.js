(function(){
  var track=document.getElementById('rvTrack');if(!track)return;
  var prev=document.getElementById('rvPrev'),next=document.getElementById('rvNext'),dots=document.getElementById('rvDots');
  var n=track.children.length,i;
  for(i=0;i<n;i++){var d=document.createElement('i');if(i===0)d.className='on';(function(idx){d.addEventListener('click',function(){track.scrollTo({left:per()*idx,behavior:'smooth'});});})(i);dots.appendChild(d);}
  function per(){var c=track.children[0];return c?c.getBoundingClientRect().width+22:1;}
  function sync(){var idx=Math.round(track.scrollLeft/per());[].forEach.call(dots.children,function(d,j){d.className=j===idx?'on':'';});prev.disabled=track.scrollLeft<4;next.disabled=track.scrollLeft>track.scrollWidth-track.clientWidth-4;}
  prev.onclick=function(){track.scrollBy({left:-per(),behavior:'smooth'});};
  next.onclick=function(){track.scrollBy({left:per(),behavior:'smooth'});};
  track.addEventListener('scroll',function(){requestAnimationFrame(sync);});
  setTimeout(sync,60);window.addEventListener('resize',sync);
  // video lightbox (ready for real URLs via data-video)
  var lb=document.createElement('div');lb.id='rvLightbox';
  lb.innerHTML='<div class="rv-lb-inner"><button class="rv-lb-close" aria-label="Close">\u00D7</button><div class="rv-lb-media"></div></div>';
  document.body.appendChild(lb);
  var media=lb.querySelector('.rv-lb-media');
  function close(){lb.classList.remove('on');document.body.classList.remove('tstlb-open');media.innerHTML='';}
  lb.addEventListener('click',function(e){if(e.target===lb||e.target.closest('.rv-lb-close'))close();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
  [].forEach.call(document.querySelectorAll('#reviews .cf-play'),function(btn){
    btn.addEventListener('click',function(){
      var src=btn.getAttribute('data-video');if(!src)return;
      media.innerHTML=/\.mp4($|\?)/.test(src)?'<video src="'+src+'" controls autoplay playsinline></video>':'<iframe src="'+src+'" allow="autoplay; fullscreen" allowfullscreen></iframe>';
      lb.classList.add('on');
    });
  });
})();
