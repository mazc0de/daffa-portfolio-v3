(function(){var el=document.getElementById('ct');function p(n){return(n<10?'0':'')+n}function tick(){var d=new Date(),h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),ap=h>=12?'PM':'AM';h=h%12||12;el.textContent=p(h)+':'+p(m)+':'+p(s)+' '+ap;}tick();setInterval(tick,1000);})();
(function(){function reveal(){var l=document.getElementById('loader');if(!l||l.classList.contains('done'))return;l.classList.add('done');document.body.classList.add('loaded');setTimeout(function(){l.style.display='none';},1000);}
addEventListener('load',function(){setTimeout(reveal,1600);});setTimeout(reveal,2500);})();
function drawRuler(cv){if(!cv)return;var dpr=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;cv.width=w*dpr;cv.height=h*dpr;var ctx=cv.getContext('2d');ctx.scale(dpr,dpr);ctx.clearRect(0,0,w,h);ctx.font='9px "Space Mono",monospace';ctx.lineWidth=1;for(var x=0;x<=w;x+=10){var maj=(x%100===0);ctx.strokeStyle=maj?'#2E4554':'#7B93A4';ctx.beginPath();ctx.moveTo(x+.5,h);ctx.lineTo(x+.5,maj?h-12:(x%50===0?h-8:h-5));ctx.stroke();if(maj&&x>0){ctx.fillStyle='#2E4554';ctx.fillText(x,x+3,h-14);}}}
function drawAll(){drawRuler(document.getElementById('rulerTop'));drawRuler(document.getElementById('rulerBot'));}
drawAll();addEventListener('resize',drawAll);addEventListener('load',drawAll);
(function(){var m=document.getElementById('heroMark');if(!m)return;var d=m.querySelector('.dim');if(!d)return;function set(){var r=m.getBoundingClientRect();d.textContent=Math.round(r.width)+' × '+Math.round(r.height);}m.addEventListener('mouseenter',set);addEventListener('load',set);set();})();
/* hero | gentle 3D parallax tilt for depth */
(function(){var hero=document.querySelector('.hero');if(!hero)return;
var mark=document.getElementById('heroMark'),floats=hero.querySelectorAll('.float'),sky=document.querySelector('.sky');
if(matchMedia('(pointer:coarse)').matches||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
function move(e){var r=hero.getBoundingClientRect();var cx=(e.clientX-r.left)/r.width-.5,cy=(e.clientY-r.top)/r.height-.5;
 if(mark)mark.style.transform='rotateY('+(cx*5).toFixed(2)+'deg) rotateX('+(-cy*5).toFixed(2)+'deg)';
 floats.forEach(function(f,i){var dp=(i%2?1:-1)*(14+i*3);f.style.setProperty('--px',(cx*dp).toFixed(1)+'px');f.style.setProperty('--py',(cy*dp).toFixed(1)+'px');});
 if(sky)sky.style.transform='translate('+(cx*-14).toFixed(1)+'px,'+(cy*-8).toFixed(1)+'px)';}
function reset(){if(mark)mark.style.transform='';floats.forEach(function(f){f.style.setProperty('--px','0px');f.style.setProperty('--py','0px');});if(sky)sky.style.transform='';}
hero.addEventListener('mousemove',move);hero.addEventListener('mouseleave',reset);})();
/* hero wordmark | auto-select on load, then release */
(function(){var m=document.getElementById('heroMark');if(!m)return;if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;setTimeout(function(){m.classList.add('demo');},1400);setTimeout(function(){m.classList.remove('demo');},4600);})();
(function(){var el=document.getElementById('tw');if(!el)return;var words=['boring brands','tired websites','dull funnels','flat campaigns','dead inboxes'],wi=0,ci=0,del=false;function step(){var w=words[wi];el.textContent=w.substring(0,ci);if(!del){ci++;if(ci>w.length){del=true;return setTimeout(step,1400);}}else{ci--;if(ci<0){del=false;wi=(wi+1)%words.length;ci=0;return setTimeout(step,260);}}setTimeout(step,del?45:85);}setTimeout(step,900);})();
document.querySelectorAll('.qa button').forEach(function(b){b.addEventListener('click',function(){var qa=b.parentElement,a=qa.querySelector('.a'),open=qa.classList.contains('open');document.querySelectorAll('.qa').forEach(function(o){o.classList.remove('open');o.querySelector('.a').style.maxHeight=null;});if(!open){qa.classList.add('open');a.style.maxHeight=a.scrollHeight+'px';}});});
/* services scroll isolated below */
/* work hover preview */
(function(){var pv=document.getElementById('wpreview'),img=document.getElementById('wpimg'),items=document.querySelectorAll('.witem'),tx=0,ty=0,raf=0;if(!pv)return;if(window.matchMedia&&!window.matchMedia('(pointer:fine)').matches)return;items.forEach(function(it){it.addEventListener('mouseenter',function(e){var sx=it.getAttribute('data-img');if(sx&&img.getAttribute('src')!==sx)img.setAttribute('src',sx);tx=e.clientX;ty=e.clientY;pv.style.left=tx+'px';pv.style.top=ty+'px';pv.classList.add('show');});it.addEventListener('mouseleave',function(){pv.classList.remove('show');});});var _wl=document.querySelector('.wlist');if(_wl)_wl.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!raf)raf=requestAnimationFrame(function(){pv.style.left=tx+'px';pv.style.top=ty+'px';raf=0;});});})();
/* count up */
(function(){var done=false;var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting&&!done){done=true;document.querySelectorAll('.num[data-count]').forEach(function(n){var t=parseFloat(n.dataset.count),dec=n.dataset.dec?1:0,d=1100,s=performance.now();function f(now){var p=Math.min((now-s)/d,1),e=1-Math.pow(1-p,3),v=(t*e).toFixed(dec);n.textContent=v;if(p<1)requestAnimationFrame(f);else{var suf=n.dataset.suffix;n.innerHTML=v+(suf?'<span class="u star">'+suf+'</span>':'<span class="u">+</span>');}}requestAnimationFrame(f);});}});},{threshold:.4});var st=document.querySelector('.c-stats');if(st)io.observe(st);})();
/* reveal */
(function(){var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}});},{threshold:.1});document.querySelectorAll('.reveal,.stagger').forEach(function(e){io.observe(e);});})();
/* eyebrow handwriting | trigger self-draw on view */
(function(){var sc=[].slice.call(document.querySelectorAll('.scribble'));if(!sc.length)return;
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('writing');io.unobserve(en.target);}});},{threshold:.2});
sc.forEach(function(s){io.observe(s);});})();
/* scrollspy */
(function(){var links=[].slice.call(document.querySelectorAll('.nav-pill a[href^="#"]')),map={};links.forEach(function(l){var id=l.getAttribute('href').slice(1);if(id)map[id]=l;});var secs=Object.keys(map).map(function(id){return document.getElementById(id)}).filter(Boolean);var spy=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){links.forEach(function(l){l.classList.remove('active')});var l=map[en.target.id];if(l)l.classList.add('active');}});},{rootMargin:'-45% 0px -50% 0px'});secs.forEach(function(s){spy.observe(s)});})();
/* cursor */
(function(){if(!window.matchMedia||!window.matchMedia('(pointer:fine)').matches)return;document.body.style.cursor='none';document.querySelectorAll('a,button,.btn,.layer,.witem').forEach(function(e){e.style.cursor='none'});
var you=document.getElementById('curYou'),mate=document.getElementById('curMate'),nm=you.querySelector('.name');var tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
/* perf: cursor loop runs only while the cursor is catching up to the mouse */var yraf=0;function yloop(){yraf=0;cx+=(tx-cx)*.3;cy+=(ty-cy)*.3;if(Math.abs(tx-cx)<0.1&&Math.abs(ty-cy)<0.1){cx=tx;cy=ty;}else yraf=requestAnimationFrame(yloop);you.style.transform='translate('+cx+'px,'+cy+'px)';}addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!yraf)yraf=requestAnimationFrame(yloop);});yloop();
var t=0;
/* teammate cursor | appears only at a few spots, parks in empty space beside the thing, never on buttons */
(function(){var pois=[
 {sel:'.figwin .layer.active',label:'tap a layer',place:'left'},
 {sel:'.wlist .witem',label:'take a peek',place:'left'}];
var gx=innerWidth*0.5,gy=innerHeight*0.5,mtx=gx,mty=gy,curL='',vis=false;
function pick(){var vc=innerHeight*0.5,best=null,bd=1e9;for(var i=0;i<pois.length;i++){var el=document.querySelector(pois[i].sel);if(!el)continue;var r=el.getBoundingClientRect();if(r.bottom<140||r.top>innerHeight-110)continue;var c=r.top+r.height/2,d=Math.abs(c-vc);if(d<bd){bd=d;best={r:r,label:pois[i].label,place:pois[i].place};}}
 var ok=false;
 if(best){var r=best.r,px=0,py=0,left=false;
   if(best.place==='left'){px=r.left-30;py=r.top+Math.min(54,r.height*0.4);left=true;if(px>=96)ok=true;}
   else{px=r.right-26;py=r.top-30;if(r.top>120)ok=true;}
   if(ok){px=Math.max(16,Math.min(px,innerWidth-160));py=Math.max(70,py);mtx=px;mty=py;mate.classList.toggle('lbl-left',left);if(best.label!==curL){curL=best.label;mate.querySelector('.name').textContent=best.label;}mate.style.opacity=.96;vis=true;}
 }
 if(!ok){mate.style.opacity=0;vis=false;}gkick();}
/* perf: the teammate only animates while it is visible (idle bob) or still gliding to its spot */var graf=0;function gkick(){if(!graf)graf=requestAnimationFrame(guide);}function guide(){graf=0;t+=0.045;gx+=(mtx-gx)*0.07;gy+=(mty-gy)*0.07;var bob=vis?Math.sin(t)*2.5:0;mate.style.transform='translate('+gx+'px,'+(gy+bob)+'px)';if(vis||Math.abs(mtx-gx)>0.1||Math.abs(mty-gy)>0.1)gkick();}guide();
var praf=0;addEventListener('scroll',function(){if(!praf)praf=requestAnimationFrame(function(){praf=0;pick();});},{passive:true});addEventListener('resize',pick);setInterval(pick,1000);setTimeout(pick,600);})();
document.addEventListener('mouseover',function(e){var yc=e.target.closest('.ph-yc'),cfp=e.target.closest('.cf-play'),cfc=e.target.closest('.cf-card'),w=e.target.closest('.witem'),a=e.target.closest('a,button,.btn,.layer');if(yc){you.classList.add('hot');nm.textContent='the flex';nm.style.background='#0D99FF';}else if(cfp||(cfc&&cfc.classList.contains('k-video'))){you.classList.add('hot');nm.textContent='watch';nm.style.background='#0D99FF';}else if(cfc){you.classList.add('hot');nm.textContent='read';nm.style.background='#0D99FF';}else if(w){you.classList.add('hot');nm.textContent='view';nm.style.background='#F0531C';}else if(a){you.classList.add('hot');nm.textContent='click';nm.style.background='#0D99FF';}else{you.classList.remove('hot');nm.textContent='You';nm.style.background='#0D99FF';}});})();

/* footer | clock, wordmark wave, back to top */
(function(){var cl=document.getElementById('fClock');function tk(){var o=(window.__SITE__||{}).utcOffsetMs,d=o==null?new Date():new Date(Date.now()+o),h=o==null?d.getHours():d.getUTCHours(),m=o==null?d.getMinutes():d.getUTCMinutes();cl.textContent=('0'+h).slice(-2)+':'+('0'+m).slice(-2);}if(cl){tk();setInterval(tk,20000);}
var b=document.getElementById('toTop');if(b)b.addEventListener('click',function(){window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});
var w=document.getElementById('footWord');if(w&&window.matchMedia&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches){var ls=[].slice.call(w.children);var cur=ls.map(function(){return 0;});var bx=[],by=[],measured=false;function measure(){bx=[];by=[];ls.forEach(function(l){bx.push(l.offsetLeft+l.offsetWidth/2);by.push(l.offsetTop+l.offsetHeight/2);});measured=true;}var mx=0,my=0,inside=false,raf=0;function loop(){raf=0;if(!measured)measure();var fs=parseFloat(getComputedStyle(w).fontSize)||120;var maxLift=Math.min(70,fs*0.18);var R=fs*1.9+170;var cr=w.getBoundingClientRect();var busy=false,i,n=ls.length;for(i=0;i<n;i++){var cx=cr.left+bx[i],cy=cr.top+by[i];var dx=mx-cx,dy=my-cy;var d=Math.sqrt(dx*dx+dy*dy);var t=inside?Math.max(0,1-d/R):0;t=t*t*(3-2*t);var tgt=t*maxLift;cur[i]+=(tgt-cur[i])*0.18;if(Math.abs(tgt-cur[i])>0.06)busy=true;var ratio=maxLift?cur[i]/maxLift:0;var rot=(dx>0?-1:1)*ratio*4.5;ls[i].style.transition='none';ls[i].style.transform='translate3d(0,'+(-cur[i]).toFixed(2)+'px,0) rotate('+rot.toFixed(2)+'deg)';}if(busy||inside)raf=requestAnimationFrame(loop);}w.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;inside=true;if(!raf)raf=requestAnimationFrame(loop);});w.addEventListener('mouseleave',function(){inside=false;if(!raf)raf=requestAnimationFrame(loop);});window.addEventListener('resize',function(){measured=false;});}})();
/* headings | letters lift toward the cursor (footer wordmark, dialed back) */
(function(){if(!(window.matchMedia&&matchMedia('(pointer:fine)').matches)||(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches))return;function build(h2){var nodes=[].slice.call(h2.childNodes);h2.textContent='';nodes.forEach(function(node){if(node.nodeType===3){node.textContent.split(/(\s+)/).forEach(function(pt){if(pt==='')return;if(/^\s+$/.test(pt)){h2.appendChild(document.createTextNode(' '));return;}var w=document.createElement('span');w.className='word';for(var i=0;i<pt.length;i++){var s=document.createElement('span');s.className='ltr';s.textContent=pt[i];w.appendChild(s);}h2.appendChild(w);});}else if(node.nodeName==='BR'){h2.appendChild(document.createElement('br'));}else if(node.nodeType===1){var el2=node.cloneNode(false);el2.classList.add('word');node.textContent.split('').forEach(function(ch){if(ch===' '){el2.appendChild(document.createTextNode(' '));return;}var s2=document.createElement('span');s2.className='ltr';s2.textContent=ch;el2.appendChild(s2);});h2.appendChild(el2);}else{h2.appendChild(node.cloneNode(true));}});}function attach(h2){if(h2.dataset.att)return;h2.dataset.att='1';var fs=parseFloat(getComputedStyle(h2).fontSize)||40;var maxLift=Math.min(22,fs*0.3);var R=fs*2.6+70;var raf=0,mx=0,my=0;function run(){raf=0;[].forEach.call(h2.querySelectorAll('.ltr'),function(l){var r=l.getBoundingClientRect();var dx=mx-(r.left+r.width/2),dy=my-(r.top+r.height/2);var d=Math.sqrt(dx*dx+dy*dy);var t=Math.max(0,1-d/R);var lift=t*t;l.style.transform='translateY('+(-lift*maxLift).toFixed(1)+'px) rotate('+((dx>0?-1:1)*lift*2).toFixed(2)+'deg)';});}h2.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(run);});h2.addEventListener('mouseleave',function(){[].forEach.call(h2.querySelectorAll('.ltr'),function(l){l.style.transition='transform .55s cubic-bezier(.34,1.56,.64,1)';l.style.transform='';});setTimeout(function(){[].forEach.call(h2.querySelectorAll('.ltr'),function(l){l.style.transition='';});},560);});}[].slice.call(document.querySelectorAll('h2')).forEach(function(h2){build(h2);attach(h2);});window.__omReheadline=function(h2){build(h2);attach(h2);};})();
/* nav | link roll + hide-on-scroll-down */
(function(){var links=[].slice.call(document.querySelectorAll('.nav-pill a'));links.forEach(function(a){var t=a.textContent.trim();a.setAttribute('data-t',t);a.innerHTML='<span class="navtxt">'+t+'</span>';});
var bar=document.querySelector('.topbar');if(bar){var last=0;addEventListener('scroll',function(){var y=window.pageYOffset||document.documentElement.scrollTop||0;if(y>last&&y>260){bar.classList.add('nav-hidden');}else{bar.classList.remove('nav-hidden');}last=y;},{passive:true});}})();
/* testimonials | one pinned stage; cards rise & stack, heading + stack release together */
(function(){var sc=document.querySelector('.rev-scroll');var stack=document.getElementById('revStack');if(!sc||!stack)return;
 var cards=[].slice.call(stack.querySelectorAll('.rcard'));var N=cards.length;if(!N)return;
 if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 /* fan deck: front card upright & centered, the rest splay out behind it around a low pivot */
 var FRONT=N-1,raf=0,fan=[],W=1/N,HOLD=0.55,RISE=0.45;
 (function(){var dpt=[0,0];
  for(var k=N-1;k>=0;k--){
   if(k===FRONT){fan[k]={ang:0,scl:1};continue;}
   var back=N-1-k,side=(back%2===1)?1:-1,si=(side>0)?0:1,d=(++dpt[si]);
   fan[k]={ang:side*5*d,scl:1-0.03*d};}
 })();
 cards.forEach(function(c,i){c.style.zIndex=10+i;});
 function ez(t){return t*t*t*(t*(t*6-15)+10);}
 var vh=1,LIFT=0,sectop=0,travel=1,rp=-1,mob=false;
 function measure(){vh=window.innerHeight||1;LIFT=vh*0.66;sectop=sc.getBoundingClientRect().top+window.pageYOffset;travel=sc.offsetHeight-vh;if(travel<1)travel=1;mob=!!(window.matchMedia&&matchMedia('(max-width:760px)').matches);}
 function render(p){
  for(var i=0;i<N;i++){var f=fan[i],u=(p-i*W)/W,ty,scl,ang,op;
   if(u<0){var r=(u+RISE)/RISE;if(r<0)r=0;if(r>1)r=1;r=ez(r);op=r;ty=LIFT*(1-r);scl=0.94+0.06*r;ang=0;}
   else if(i===FRONT||u<=HOLD){op=1;ty=0;scl=1;ang=0;}
   else{var q=(u-HOLD)/(1-HOLD);if(q<0)q=0;if(q>1)q=1;q=ez(q);op=1;ty=0;scl=1-(1-f.scl)*q;ang=f.ang*q;}
   cards[i].style.opacity=op.toFixed(3);
   cards[i].style.transform='translateY('+ty.toFixed(1)+'px) rotate('+ang.toFixed(2)+'deg) scale('+scl.toFixed(3)+')';}
 }
 function target(){var p=(window.pageYOffset-sectop)/travel;if(p<0)p=0;if(p>1)p=1;return p;}
 function tick(){raf=0;
  if(mob){cards.forEach(function(c){c.style.transform='';c.style.opacity='';});return;}
  var p=target();
  if(rp<0)rp=p;
  rp+=(p-rp)*0.19;
  if(Math.abs(p-rp)<0.0004)rp=p;
  render(rp);
  if(rp!==p)raf=requestAnimationFrame(tick);
 }
 function kick(){if(!raf)raf=requestAnimationFrame(tick);}
 measure();rp=target();if(mob){cards.forEach(function(c){c.style.transform='';c.style.opacity='';});}else render(rp);
 addEventListener('scroll',kick,{passive:true});
 addEventListener('resize',function(){measure();rp=-1;kick();});})();
 /* CTA | live teammate cursor brings the cards in and types the comment */
 (function(){var card=document.querySelector('.cta-card');if(!card)return;
  var cm=card.querySelector('.comment'),nt=card.querySelector('.cta-note'),tx=card.querySelector('.comment .tx');
  if(!cm||!nt||!tx)return;
  if(!(window.matchMedia&&matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches))return;
  var words=tx.textContent.split(' ');tx.textContent='';
  words.forEach(function(w,i){var sp=document.createElement('span');sp.textContent=w+(i<words.length-1?' ':'');sp.style.transitionDelay=(1.05+i*0.06).toFixed(2)+'s';tx.appendChild(sp);});
  var cur=document.createElement('div');cur.className='cta-cur';
  cur.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 3l14 7-6 2-2 6z" fill="#F0531C" stroke="#fff" stroke-width="1.2"/></svg><span class="name">'+((window.__SITE__||{}).teammate||"Sam")+'</span>';
  card.appendChild(cur);card.classList.add('seq');
  if(!('IntersectionObserver' in window)){card.classList.add('played');return;}
  var done=false;var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){if(es[i].isIntersecting&&!done){done=true;card.classList.add('played');io.disconnect();}}},{threshold:0.4});
  io.observe(card);
 })();

/* work alt 02 | featured reel (auto-play + rail + progress) */
(function(){var fc=document.getElementById('fc');if(!fc)return;
 var D=[
  {nm:'CineDream',sub:'Color-grading tools turned into a brand filmmakers trust.',url:'cinedream.io',pv:'pv-tool',tags:['SAAS','WEBFLOW','2026']},
  {nm:'TRUE',sub:'An identity that made an AI mortgage platform feel human.',url:'true.ai',pv:'pv-ink',tags:['BRAND','CAMPAIGN','2026']},
  {nm:'finden',sub:'Turning curiosity into a sign-up in five seconds.',url:'finden.app',pv:'pv-brand',tags:['FINTECH','UI/UX','2026']},
  {nm:'Langdock',sub:'Getting seven stakeholders to agree on what they are building.',url:'langdock.com',pv:'pv-paper',tags:['AI','ENTERPRISE','2025']}
 ];
 var card=document.getElementById('fcCard'),big=document.getElementById('fcBig'),url=document.getElementById('fcUrl'),ix=document.getElementById('fcIx'),nm=document.getElementById('fcNm'),sub=document.getElementById('fcSub'),tags=document.getElementById('fcTags'),meta=fc.querySelector('.fc-meta');
 var items=[].slice.call(fc.querySelectorAll('.fc-item')),cur=0,timer=null,playing=true,DUR=4800;
 function prog(i,run){var p=items[i]&&items[i].querySelector('.fc-prog i');if(!p)return;p.style.transition='none';p.style.width=run?'0%':'100%';void p.offsetWidth;if(run){p.style.transition='width '+DUR+'ms linear';p.style.width='100%';}}
 function fill(i){var d=D[i];cur=i;
  card.className='fc-card '+d.pv;void card.offsetWidth;card.classList.add('in');
  meta.classList.remove('in');void meta.offsetWidth;meta.classList.add('in');
  big.textContent=d.nm;url.textContent=d.url;ix.textContent='0'+(i+1)+' / 0'+D.length;
  nm.textContent=d.nm;sub.textContent=d.sub;
  tags.innerHTML=d.tags.map(function(t){return '<span>'+t+'</span>';}).join('');
  items.forEach(function(it,k){it.classList.toggle('active',k===i);var pp=it.querySelector('.fc-prog i');if(pp&&k!==i){pp.style.transition='none';pp.style.width='0%';}});
  prog(i,playing);
 }
 function next(){fill((cur+1)%D.length);}
 function play(){stop();playing=true;prog(cur,true);timer=setInterval(next,DUR);}
 function stop(){if(timer){clearInterval(timer);timer=null;}}
 items.forEach(function(it){var i=parseInt(it.getAttribute('data-i'),10);
  it.addEventListener('mouseenter',function(){playing=false;stop();fill(i);});
  it.addEventListener('mouseleave',function(){play();});
  it.addEventListener('focus',function(){playing=false;stop();fill(i);});
 });
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){if(!timer&&playing)play();}else{stop();}});},{threshold:.2});io.observe(fc);
 fill(0);
})();


/* footer | dot grid gravity well that follows the cursor */
(function(){var ft=document.querySelector('.foot');if(!ft)return;var cv=document.getElementById('footDots');if(!cv)return;var ctx=cv.getContext&&cv.getContext('2d');if(!ctx)return;
var DPR=Math.min(2,window.devicePixelRatio||1),gap=26,R=180,W=0,H=0,dots=[];
var mx=-9999,my=-9999,tmx=-9999,tmy=-9999,str=0,tstr=0,raf=0;
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
function build(){var r=ft.getBoundingClientRect();W=Math.ceil(r.width);H=Math.ceil(r.height);if(W<2||H<2)return;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);dots=[];for(var y=gap/2;y<H;y+=gap){for(var x=gap/2;x<W;x+=gap){dots.push(x,y);}}draw();}
function draw(){ctx.clearRect(0,0,W,H);for(var i=0;i<dots.length;i+=2){var bx=dots[i],by=dots[i+1],px=bx,py=by,rad=1.1,a=0.07;if(str>0.002){var dx=mx-bx,dy=my-by,d=Math.sqrt(dx*dx+dy*dy);if(d<R){var fwd=1-d/R;fwd=fwd*fwd;var pull=fwd*0.6*str;px=bx+dx*pull;py=by+dy*pull;rad=1.1+fwd*1.7*str;a=0.07+fwd*0.34*str;}}ctx.beginPath();ctx.arc(px,py,rad,0,6.2832);ctx.fillStyle='rgba(255,255,255,'+a.toFixed(3)+')';ctx.fill();}}
function loop(){raf=0;mx+=(tmx-mx)*0.2;my+=(tmy-my)*0.2;str+=(tstr-str)*0.12;draw();if(Math.abs(tstr-str)>0.004||str>0.004&&(Math.abs(tmx-mx)>0.4||Math.abs(tmy-my)>0.4))raf=requestAnimationFrame(loop);}
if(!reduce){ft.addEventListener('mousemove',function(e){var r=ft.getBoundingClientRect();tmx=e.clientX-r.left;tmy=e.clientY-r.top;if(str<0.02){mx=tmx;my=tmy;}tstr=1;if(!raf)raf=requestAnimationFrame(loop);});
ft.addEventListener('mouseleave',function(){tstr=0;if(!raf)raf=requestAnimationFrame(loop);});}
build();window.addEventListener('load',build);if(window.ResizeObserver){new ResizeObserver(build).observe(ft);}else{window.addEventListener('resize',build);}})();

/* about bento | make each card a selectable Figma layer (handles + name tab) */
(function(){var names={'c-stmt':'hello','me-photo':'portrait','me-facts':'quick-facts','c-skills':'skills','c-now':'now-building','c-stats':'metrics','c-quote':'review','c-photo':'craft'};
[].slice.call(document.querySelectorAll('.bento .cell')).forEach(function(c){
 c.classList.add('sel');
 if(!c.querySelector('.h')){['tl','tr','bl','br'].forEach(function(p){var s=document.createElement('span');s.className='h '+p;c.appendChild(s);});}
 var key=Object.keys(names).filter(function(k){return c.classList.contains(k);})[0];
 if(key&&!c.querySelector('.layer-tab')){var t=document.createElement('span');t.className='layer-tab';t.innerHTML='<i></i>'+names[key];c.appendChild(t);}
});})();
