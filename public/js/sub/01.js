(function(){
 function p(n){return(n<10?'0':'')+n}
 function clock(){var d=new Date(),h=d.getHours(),m=d.getMinutes(),s=d.getSeconds(),ap=h>=12?'PM':'AM',hh=h%12||12;
   var a=document.getElementById('ct');if(a)a.textContent=p(hh)+':'+p(m)+':'+p(s)+' '+ap;
   var ist=new Date(d.getTime()+d.getTimezoneOffset()*60000+((window.__SITE__||{}).utcOffsetMs!=null?(window.__SITE__||{}).utcOffsetMs:19800000));var b=document.getElementById('fClock');if(b)b.textContent=p(ist.getHours())+':'+p(ist.getMinutes());}
 clock();setInterval(clock,1000);

 function ruler(cv){if(!cv)return;var dpr=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;if(!w)return;cv.width=w*dpr;cv.height=h*dpr;var x=cv.getContext('2d');x.scale(dpr,dpr);x.clearRect(0,0,w,h);x.strokeStyle='#9fb1c0';x.fillStyle='#9fb1c0';x.font='9px "Space Mono",monospace';for(var i=0;i<=w;i+=10){var maj=i%100===0;x.beginPath();x.moveTo(i+.5,h);x.lineTo(i+.5,maj?h-11:(i%50===0?h-7:h-4));x.stroke();if(maj&&i>0)x.fillText(i,i+3,h-13);}}
 function rulers(){ruler(document.getElementById('rulerTop'));}
 rulers();window.addEventListener('resize',rulers);window.addEventListener('load',rulers);

 var tt=document.getElementById('toTop');if(tt)tt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});

 var rv=document.querySelectorAll('.reveal,.stagger');
 if('IntersectionObserver' in window){
   var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.06,rootMargin:'0px 0px -4% 0px'});
   rv.forEach(function(e){io.observe(e);});
 } else { rv.forEach(function(e){e.classList.add('in');}); }
 setTimeout(function(){rv.forEach(function(e){e.classList.add('in');});},1500);

 if(window.matchMedia&&matchMedia('(pointer:fine)').matches){
   document.body.style.cursor='none';
   document.querySelectorAll('a,button,input,textarea,.pf-card,.pf-feat,.pf-chip,.cc-in,.cc-ta').forEach(function(e){e.style.cursor='none';});
   var you=document.getElementById('curYou');
   if(you){var tx=innerWidth/2,ty=innerHeight/2,cx=tx,cy=ty;
     /* perf: the loop runs only while the cursor is catching up to the mouse */
     var craf=0;function cloop(){craf=0;cx+=(tx-cx)*.2;cy+=(ty-cy)*.2;if(Math.abs(tx-cx)<0.1&&Math.abs(ty-cy)<0.1){cx=tx;cy=ty;}else craf=requestAnimationFrame(cloop);you.style.transform='translate('+cx+'px,'+cy+'px)';}
     window.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!craf)craf=requestAnimationFrame(cloop);});
     cloop();}
 }
})();

/* footer: cursor-reactive dot grid (matches home) */
(function(){
 var ft=document.querySelector('.foot');if(!ft)return;
 var cv=document.getElementById('footDots');if(!cv)return;
 var ctx=cv.getContext&&cv.getContext('2d');if(!ctx)return;
 var DPR=Math.min(2,window.devicePixelRatio||1),gap=26,R=185,W=0,H=0,dots=[];
 var mx=-9999,my=-9999,cmx=-9999,cmy=-9999;
 function build(){var r=ft.getBoundingClientRect();W=Math.ceil(r.width);H=Math.ceil(r.height);if(W<2||H<2)return;cv.width=W*DPR;cv.height=H*DPR;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(DPR,0,0,DPR,0,0);dots=[];for(var y=gap;y<H;y+=gap){for(var x=gap;x<W;x+=gap){dots.push({x:x,y:y});}}}
 /* perf: redraw only while the glow is still easing; idle = the last frame stays on the canvas */
 var raf=0;function kick(){if(!raf)raf=requestAnimationFrame(loop);}
 function rebuild(){build();kick();}
 build();window.addEventListener('resize',rebuild);window.addEventListener('load',rebuild);
 ft.addEventListener('mousemove',function(e){var r=ft.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;kick();});
 ft.addEventListener('mouseleave',function(){mx=-9999;my=-9999;kick();});
 function loop(){
   raf=0;
   cmx+=(mx-cmx)*.12;cmy+=(my-cmy)*.12;
   if(W>1){ctx.clearRect(0,0,W,H);
     for(var i=0;i<dots.length;i++){var d=dots[i],dx=d.x-cmx,dy=d.y-cmy,dist=Math.sqrt(dx*dx+dy*dy);
       var t=dist<R?(1-dist/R):0;t=t*t;
       var a=0.09+t*0.7,rad=1.05+t*1.9;
       ctx.beginPath();ctx.fillStyle='rgba(150,188,235,'+a.toFixed(3)+')';ctx.arc(d.x,d.y,rad,0,6.2832);ctx.fill();}
   }
   if(Math.abs(mx-cmx)>0.5||Math.abs(my-cmy)>0.5)kick();else{cmx=mx;cmy=my;}
 }
 kick();
})();

/* footer: cursor-reactive wordmark (runs after the reveal entrance) */
(function(){
 var w=document.getElementById('footWord');if(!w)return;
 if(!(window.matchMedia&&matchMedia('(pointer:fine)').matches))return;
 if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 var ls=[].slice.call(w.children),tx=-9999,on=false;
 /* perf: letters are recomputed once per frame only when the pointer moves or the page scrolls under it */
 var wraf=0;function kick(){if(on&&!wraf)wraf=requestAnimationFrame(upd);}
 function upd(){wraf=0;
     for(var i=0;i<ls.length;i++){var el=ls[i],r=el.getBoundingClientRect(),c=r.left+r.width/2;
       var t=(tx<-9000)?0:Math.max(0,1-Math.abs(c-tx)/230);t=t*t;
       el.style.transform='translateY('+(-16*t)+'px)';el.style.transition='transform .18s cubic-bezier(.2,.8,.2,1)';}}
 w.addEventListener('mousemove',function(e){tx=e.clientX;kick();});
 w.addEventListener('mouseleave',function(){tx=-9999;kick();});
 window.addEventListener('scroll',function(){if(tx>-9000)kick();},{passive:true});
 setTimeout(function(){on=true;
   upd();
 },1400);
})();
