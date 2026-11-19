(function(){
  /* letter-lift on the hero heading, ported from the home page */
  function build(h){var nodes=[].slice.call(h.childNodes);h.textContent='';
    nodes.forEach(function(node){
      if(node.nodeType===3){
        node.textContent.split(/(\s+)/).forEach(function(pt){
          if(pt==='')return;
          if(/^\s+$/.test(pt)){h.appendChild(document.createTextNode(' '));return;}
          var w=document.createElement('span');w.className='word';
          for(var i=0;i<pt.length;i++){var sp=document.createElement('span');sp.className='ltr';sp.textContent=pt[i];w.appendChild(sp);}
          h.appendChild(w);
        });
      }else if(node.nodeName==='BR'){h.appendChild(document.createElement('br'));}
      else if(node.nodeType===1){
        var el=node.cloneNode(false);el.classList.add('word');
        node.textContent.split('').forEach(function(ch){
          if(ch===' '){el.appendChild(document.createTextNode(' '));return;}
          var s2=document.createElement('span');s2.className='ltr';s2.textContent=ch;el.appendChild(s2);
        });
        h.appendChild(el);
      }
    });
  }
  function attach(h){
    var fs=parseFloat(getComputedStyle(h).fontSize)||40,
        maxLift=Math.min(22,fs*0.3), R=fs*2.6+70, raf=0, mx=0, my=0;
    function run(){raf=0;
      [].forEach.call(h.querySelectorAll('.ltr'),function(l){
        var r=l.getBoundingClientRect(),dx=mx-(r.left+r.width/2),dy=my-(r.top+r.height/2);
        var d=Math.sqrt(dx*dx+dy*dy),t=Math.max(0,1-d/R),lift=t*t;
        l.style.transform='translateY('+(-lift*maxLift).toFixed(1)+'px) rotate('+((dx>0?-1:1)*lift*2).toFixed(2)+'deg)';
      });
    }
    h.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY;if(!raf)raf=requestAnimationFrame(run);});
    h.addEventListener('mouseleave',function(){
      [].forEach.call(h.querySelectorAll('.ltr'),function(l){
        l.style.transition='transform .55s cubic-bezier(.34,1.56,.64,1)';l.style.transform='';});
      setTimeout(function(){[].forEach.call(h.querySelectorAll('.ltr'),function(l){l.style.transition='';});},560);
    });
  }
  var h1=document.querySelector('.pf-h1');
  if(h1&&!h1.querySelector('.ltr')){build(h1);attach(h1);}

  /* make sure the scribble draws itself in, like the home page */
  var sc=document.querySelector('.pf-hero .scribble');
  if(sc){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('writing');io.unobserve(e.target);}});
    },{threshold:.2});
    io.observe(sc);
  }
})();
