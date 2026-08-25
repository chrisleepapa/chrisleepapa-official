/* Home header logo fallback: keeps the site identity visible even if the shared header loads late. */
'use strict';
(() => {
  function ensure(){
    const host=document.getElementById('site-nav');
    if(!host)return;
    const nav=host.querySelector('#main-nav');
    if(!nav)return;
    let brand=nav.querySelector('.brand-logo');
    if(!brand){
      brand=document.createElement('a');
      brand.className='brand-logo';
      brand.href='/';
      brand.setAttribute('aria-label','Chris LEE.PAPA Home');
      brand.textContent='Chris LEE.PAPA';
      nav.insertBefore(brand,nav.firstChild);
    }
    brand.style.setProperty('display','block','important');
    brand.style.setProperty('visibility','visible','important');
    brand.style.setProperty('opacity','1','important');
    brand.style.setProperty('color','#f0ece4','important');
    brand.style.setProperty('font-family','Cinzel,serif','important');
    brand.style.setProperty('font-weight','700','important');
    brand.style.setProperty('letter-spacing','.16em','important');
  }
  ensure();
  const observer=new MutationObserver(ensure);
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),10000);
})();
