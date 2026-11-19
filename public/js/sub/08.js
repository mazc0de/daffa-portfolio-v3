(function(){
  /* underline that slides between tabs */
  

  /* CTA: glow follows the cursor, button is magnetic, picks change the label */
  var cta=document.getElementById('ctaX'),glow=null,
      btn=document.getElementById('ctaXBtn'),word=document.getElementById('ctaXWord'),
      picks=document.getElementById('ctaXPicks');
  if(cta){
    cta.addEventListener('mousemove',function(e){
      if(btn){
        var b=btn.getBoundingClientRect(),dx=e.clientX-(b.left+b.width/2),dy=e.clientY-(b.top+b.height/2);
        var dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<190){btn.style.transform='translate('+(dx*0.16).toFixed(1)+'px,'+(dy*0.16).toFixed(1)+'px)';}
        else{btn.style.transform='';}
      }
    });
    cta.addEventListener('mouseleave',function(){
      if(btn){btn.style.transition='transform .5s cubic-bezier(.34,1.56,.64,1),box-shadow .3s';btn.style.transform='';
        setTimeout(function(){btn.style.transition='box-shadow .3s';},520);}
    });
  }
  if(picks&&word){
    picks.addEventListener('click',function(e){
      var b=e.target.closest('.ctaX-pick');if(!b)return;
      picks.querySelectorAll('.ctaX-pick').forEach(function(x){x.classList.remove('on');});
      b.classList.add('on');
      word.style.opacity='0';word.style.transform='translateY(5px)';
      setTimeout(function(){word.textContent=b.dataset.lbl;word.style.opacity='';word.style.transform='';},170);
    });
    word.style.transition='opacity .18s, transform .22s';
    word.style.display='inline-block';
  }
})();
