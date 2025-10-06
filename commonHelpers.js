import{S as f,i as p}from"./assets/vendor-8c59ed88.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const n={form:document.querySelector(".search-form"),input:document.querySelector(".input-form"),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader-container"),searchBtn:document.querySelector(".search-btn")},m="https://pixabay.com/api/",d="42030436-f44bf17f2fc4b636ae2b8b7a9";n.form.addEventListener("submit",s=>{s.preventDefault();const t=n.form.query.value.trim();if(!t){l("The search field can't be empty! Please, enter your request!");return}const a=`${m}?key=${d}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true`;y(a).then(o=>{o.hits.length===0&&(l("Sorry, there are no images matching your search query. Please, try again!"),i(!1)),n.gallery.innerHTML=h(o.hits),i(!1),new f(".gallery-item a",{captionsData:"alt",captionDelay:250}),n.form.reset()}).catch(o=>console.error(o))});function y(s){return i(!0),fetch(s).then(t=>{if(!t.ok)throw new Error(t.ststusText);return t.json()})}function h(s){return s.map(({webformatURL:t,largeImageURL:a,tags:o,likes:e,views:r,comments:c,downloads:u})=>`<li class="gallery-item">

    <a class="gallery-link" href="${a}">
      <img
        class="gallery-image"
        src="${t}"
        alt="${o}"
      />

      <p class="gallery-descr">Likes: <span class="descr-span">${e}</span> 
      Views: <span class="descr-span">${r}</span> 
      Comments: <span class="descr-span">${c}</span> 
      Downloads: <span class="descr-span">${u}</span></p>

    </a>
  </li>`).join("")}function l(s){p.show({class:"error-svg",position:"topRight",icon:"error-svg",message:s,maxWidth:"432",messageColor:"#fff",messageSize:"16px",backgroundColor:"#EF4040",close:!1,closeOnClick:!0})}function i(s=!0){n.loader.style.display=s?"inline-block":"none",n.searchBtn.disabled=s}
//# sourceMappingURL=commonHelpers.js.map
