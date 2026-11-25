(function(){
 var cv=document.getElementById('phPc');if(!cv)return;var ctx=cv.getContext('2d');
 var W=0,H=0,dpr=1,particles=[],mouse={x:-9999,y:-9999},fine=matchMedia('(pointer:fine)').matches;
 /* the ink particles follow the theme (light ink on the night sky) */
 var ink='#14202B';function setInk(){ink=document.documentElement.getAttribute('data-theme')==='dark'?'#E4EBF1':'#14202B';}setInk();
 var cols=['#F0531C','#F0531C','#F0531C','#14202B','#0D99FF'],PSIZE=2.9;
 /* perf: the loop only runs while the hero is on screen, the tab is visible and the particles are still moving */
 var raf=0,started=false,onScreen=true,settled=false;
 function size(){dpr=Math.min(window.devicePixelRatio||1,2);var r=cv.getBoundingClientRect();W=Math.max(1,r.width);H=Math.max(1,r.height);cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
 function build(){
  var off=document.createElement('canvas');off.width=W;off.height=H;var o=off.getContext('2d',{willReadFrequently:true});
  o.fillStyle='#000';o.textAlign='center';o.textBaseline='middle';
  var lines=(window.__SITE__||{}).heroLines||['IMPOSSIBLE','TO IGNORE .'];
  o.font='700 100px Anton, sans-serif';var w100=1;for(var wi=0;wi<lines.length;wi++){w100=Math.max(w100,o.measureText(lines[wi]).width);}var fs=Math.min(W*0.9/w100*100,H*0.46);
  o.font='700 '+fs+'px Anton, sans-serif';
  var lh=fs*0.92;
  o.fillText(lines[0],W/2,H/2-lh/2);
  o.fillText(lines[1],W/2,H/2+lh/2);
  var data=o.getImageData(0,0,W,H).data,targets=[],step=Math.max(2,Math.min(3,Math.round(fs/47)));PSIZE=Math.max(2.2,Math.min(2.55,fs/72));
  for(var y=0;y<H;y+=step){for(var x=0;x<W;x+=step){if(data[(y*W+x)*4+3]>128)targets.push(x+ (y<<16));}}
  var np=[];
  for(var k=0;k<targets.length;k++){var tx=targets[k]&0xffff,ty=targets[k]>>16;var pt=particles[k]||{x:Math.random()*W,y:Math.random()*H,vx:0,vy:0,c:cols[k%cols.length]};pt.tx=tx;pt.ty=ty;np.push(pt);}
  particles=np;
 }
 function frame(){
  raf=0;
  ctx.clearRect(0,0,W,H);
  var R=92,maxV=0,maxA=0,fill='';
  for(var i=0;i<particles.length;i++){var p=particles[i];
   var ax=(p.tx-p.x)*0.02,ay=(p.ty-p.y)*0.02;
   if(fine){var dx=p.x-mouse.x,dy=p.y-mouse.y,d2=dx*dx+dy*dy;if(d2<R*R){var d=Math.sqrt(d2)||1,f=(R-d)/R*4.5;ax+=dx/d*f;ay+=dy/d*f;}}
   p.vx=(p.vx+ax)*0.86;p.vy=(p.vy+ay)*0.86;p.x+=p.vx;p.y+=p.vy;
   var v=(p.vx<0?-p.vx:p.vx)+(p.vy<0?-p.vy:p.vy),a=(ax<0?-ax:ax)+(ay<0?-ay:ay);if(v>maxV)maxV=v;if(a>maxA)maxA=a;
   if(p.c!==fill){fill=p.c;ctx.fillStyle=fill==='#14202B'?ink:fill;}
   ctx.fillRect(p.x,p.y,PSIZE,PSIZE);
  }
  /* at rest (no net force, no velocity): the last frame stays on the canvas, stop until something moves */
  settled=maxV<0.02&&maxA<0.01;
  kick();
 }
 function kick(){if(!raf&&started&&onScreen&&!settled&&!document.hidden)raf=requestAnimationFrame(frame);}
 function wake(){settled=false;kick();}
 window.addEventListener('themechange',function(){setInk();wake();});
 function init(){size();build();wake();}
 /* hero Design ⇄ Code toggle: blow the name apart, or pull it back together from random spots */
 window.__phParticles={
  scatter:function(){for(var i=0;i<particles.length;i++){var p=particles[i],a=Math.random()*6.283,f=12+Math.random()*26;p.vx+=Math.cos(a)*f;p.vy+=Math.sin(a)*f;}wake();},
  reform:function(){for(var i=0;i<particles.length;i++){var p=particles[i];p.x=Math.random()*W;p.y=Math.random()*H;p.vx=0;p.vy=0;}wake();}
 };
 cv.addEventListener('pointermove',function(e){var r=cv.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;wake();});
 cv.addEventListener('pointerleave',function(){mouse.x=-9999;mouse.y=-9999;wake();});
 var rt;window.addEventListener('resize',function(){clearTimeout(rt);rt=setTimeout(function(){if(started)init();},200);});
 document.addEventListener('visibilitychange',kick);
 if('IntersectionObserver' in window){new IntersectionObserver(function(es){onScreen=es[es.length-1].isIntersecting;kick();}).observe(cv);}
 function start(){if(started||matchMedia('(max-width:680px)').matches)return;started=true;init();}
 if(document.fonts&&document.fonts.load){document.fonts.load('700 100px Anton').then(function(){return document.fonts.ready;}).then(start).catch(start);}else{start();}
})();
