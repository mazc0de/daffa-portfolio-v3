(function(){
/* pricing section may be hidden: nothing to wire up then */
if(!document.getElementById('lp-root'))return;
var _P=(window.__SITE__||{}).pricing||{};var BASE=_P.base||["One request at a time","Unlimited brands","Web & app UI design","Design systems","Landing & pitch design","Unlimited revisions","Dedicated design manager","Avg. 48 hour delivery"];
var DEVX=_P.dev||["Webflow & Framer build","Interactive prototypes","Custom animations","HTML email development","Technical SEO","Two requests at a time"];
var PLANS=_P.plans||{design:{amt:"1,499",was:"$1,699",name:"Design",req:"One request at a time"},dev:{amt:"1,999",was:"$2,499",name:"Design + Development",req:"Two requests at a time"}};
function fLi(x){return '<li><span class="mk"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></span><span>'+x+'</span></li>';}
var root=document.getElementById('lp-root');var $=function(s){return root.querySelector(s);};
$('.feats-base').innerHTML=BASE.map(fLi).join('');
$('.feats-dev').innerHTML=DEVX.map(fLi).join('');
(function(){var feats=[].slice.call(root.querySelectorAll('.feats-base li,.feats-dev li'));if(!feats.length)return;feats.forEach(function(li){li.style.pointerEvents='auto';});var cur=null;function hit(x,y){for(var i=0;i<feats.length;i++){var r=feats[i].getBoundingClientRect();if(x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom)return feats[i];}return null;}document.addEventListener('mousemove',function(e){var el=hit(e.clientX,e.clientY);if(el===cur)return;if(cur)cur.classList.remove('hot');cur=el;if(cur)cur.classList.add('hot');},{passive:true});document.addEventListener('mouseleave',function(){if(cur){cur.classList.remove('hot');cur=null;}});})();
var track=$('.track'),fill=$('.fill'),handle=$('.handle'),amt=$('.amt'),was=$('.was'),pnm=$('.pnm'),ea=$('.ea'),eb=$('.eb'),unlock=$('.unlock'),ultxt=$('.ul-txt'),fdev=$('.feats-dev');
var pos=0;
function setUnlock(dev){fdev.classList.toggle('unlocked',dev);unlock.classList.toggle('open',dev);track.classList.toggle('crossed',dev);ultxt.textContent=dev?(PLANS.dev.short||'Design + Dev')+' unlocked':'Unlocks with '+(PLANS.dev.short||'Design + Dev');}
function apply(){var dev=pos===1,p=dev?PLANS.dev:PLANS.design;
  amt.style.opacity=0;setTimeout(function(){amt.textContent=p.amt;amt.style.opacity=1;},130);
  was.textContent=p.was;pnm.textContent=p.name;fill.style.width=dev?'100%':'52%';
  var tw=track.clientWidth-handle.offsetWidth-10;handle.style.transform='translateX('+(dev?tw:0)+'px)';
  ea.classList.toggle('on',!dev);eb.classList.toggle('on',dev);
  $('.hsum-req').textContent=p.req;$('.hsum-cnt').textContent=(dev?BASE.length+DEVX.length:BASE.length)+' things';
  setUnlock(dev);
}
apply();
ea.addEventListener('click',function(){pos=0;apply();});eb.addEventListener('click',function(){pos=1;apply();});
track.addEventListener('click',function(e){var r=track.getBoundingClientRect();pos=(e.clientX-r.left)>r.width/2?1:0;apply();});
var drag=false;
handle.addEventListener('pointerdown',function(e){drag=true;handle.style.transition='none';fill.style.transition='none';handle.setPointerCapture(e.pointerId);e.stopPropagation();});
handle.addEventListener('pointermove',function(e){if(!drag)return;var r=track.getBoundingClientRect();var tw=track.clientWidth-handle.offsetWidth-10;var x=Math.max(0,Math.min(tw,e.clientX-r.left-handle.offsetWidth/2));handle.style.transform='translateX('+x+'px)';var w=52+(x/tw)*48;fill.style.width=w+'%';setUnlock(w>76);});
handle.addEventListener('pointerup',function(e){if(!drag)return;drag=false;handle.style.transition='';fill.style.transition='';var r=track.getBoundingClientRect();pos=(e.clientX-r.left)>r.width/2?1:0;apply();});
window.addEventListener('resize',apply);


})();
