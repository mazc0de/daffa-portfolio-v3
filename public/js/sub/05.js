(function(){
  var cards=[].slice.call(document.querySelectorAll('.wk-grid .wk'));
  if(!cards.length)return;
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        var i=cards.indexOf(e.target);
        e.target.style.transitionDelay=((i%2)*0.07)+'s';
        e.target.classList.add('in'); io.unobserve(e.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -4% 0px'});
  cards.forEach(function(c){io.observe(c);});
  var chips=document.querySelector('.pf-filter');
  if(chips)chips.addEventListener('click',function(){setTimeout(function(){
    cards.forEach(function(c){ if(!c.classList.contains('hide')) c.classList.add('in'); });
  },30);});
})();
