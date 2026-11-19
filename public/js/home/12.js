(function(){
  document.querySelectorAll('.fx-qa .fx-head').forEach(function(btn){
    var qa=btn.closest('.fx-qa'),card=qa.querySelector('.fx-card'),dim=qa.querySelector('[data-dim]');
    btn.addEventListener('click',function(){
      var open=qa.classList.contains('on');
      document.querySelectorAll('.fx-qa.on').forEach(function(o){o.classList.remove('on');o.querySelector('.fx-head').setAttribute('aria-expanded','false');});
      if(!open){qa.classList.add('on');btn.setAttribute('aria-expanded','true');
        setTimeout(function(){var r=card.getBoundingClientRect();dim.textContent=Math.round(r.width)+' \u00d7 '+Math.round(r.height);},420);}
    });
  });
})();
