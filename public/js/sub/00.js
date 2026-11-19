(function(){var chips=document.querySelectorAll('.pf-chip'),cards=document.querySelectorAll('.wk-grid .wk'),feat=null,empty=document.querySelector('.pf-empty');
chips.forEach(function(c){c.addEventListener('click',function(){chips.forEach(function(x){x.classList.remove('on')});c.classList.add('on');var f=c.dataset.f,n=0;
 cards.forEach(function(k){var ok=(f==='all')||((' '+k.dataset.cat+' ').indexOf(' '+f+' ')>-1);k.classList.toggle('hide',!ok);if(ok)n++;});
 if(feat){var fok=(f==='all')||((' '+feat.dataset.cat+' ').indexOf(' '+f+' ')>-1);feat.style.display=fok?'':'none';if(fok)n++;}
 if(empty)empty.style.display=n?'none':'block';});});})();
