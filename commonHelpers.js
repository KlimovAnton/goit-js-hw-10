import{a as y,i as q,S as E}from"./assets/vendor-527658dd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const L=15;y.defaults.baseURL="https://pixabay.com/api/";const P="42471453-a4a004408e33f852748a0909e";async function g(a,s){const o="photo",i="horizontal",{data:t}=await y.get("",{params:{page:a,per_page:L,key:P,q:s,image_type:o,orientation:i,safesearch:!0}});return t}function v(a,s){const o=a.map(({webformatURL:i,largeImageURL:e,tags:t,likes:n,views:w,comments:I,downloads:b})=>`<li class="image-search">
        <a href="${e}">
        <img class="gallery-image" src="${i}" alt="${t}"/>
        </a>
        <ul class="gallery-image-info">
          <li class="image-items">
            <p class="image-info-items"><span class="image-items-text">Likes</span>${n}</p>
            <p class="image-info-items"><span class="image-items-text">Views</span>${w}</p>
            <p class="image-info-items"><span class="image-items-text">Comments</span>${I}</p>
            <p class="image-info-items"><span class="image-items-text">Downloads</span>${b}</p>
          </li>
        </ul>
      </li>`).join("");s.insertAdjacentHTML("beforeend",o)}function l(a,s,o){q.info({position:"topRight",message:a,iconUrl:o,messageColor:"#ffffff",backgroundColor:s,messageSize:16,layout:2,maxWidth:380,theme:"dark"})}const S=new E(".gallery-list a",{captionsData:"alt",captionDelay:250}),u=document.querySelector(".loading"),d=document.querySelector(".form-container div"),h=document.querySelector("input"),f=document.querySelector("form"),r=document.querySelector(".load-more-img"),p=document.querySelector(".gallery-list");let c=1,m;r.classList.add("hidden");f.addEventListener("submit",x);async function x(a){if(a.preventDefault(),c=1,m=h.value,p.innerHTML="",r.classList.add("hidden"),await g(c,m),h.value.trim()===""){r.classList.add("hidden"),l("Sorry, input is emty. Please try again!","#FFA000");return}d.classList.add("loader");try{const s=await g(c,m);if(s.total===0){l("Sorry, there are no images matching your search query. Please try again!","#EF4040",cross),d.classList.remove("loader"),r.classList.add("hidden"),f.reset();return}v(s.hits,p),s.hits.length<14?r.classList.add("hidden"):(d.classList.remove("loader"),r.classList.remove("hidden"),S.refresh())}catch{l("Something went wrong.Please try later")}f.reset()}r.addEventListener("click",$);async function $(){c+=1,u.classList.add("loader"),r.classList.add("hidden");try{const a=await g(c,m);if(v(a.hits,p),d.classList.remove("loader"),u.classList.remove("loader"),r.classList.remove("hidden"),window.scrollBy({top:575.6666870117188,behavior:"smooth"}),a.hits.length<L)return r.classList.add("hidden"),l("We're sorry, but you've reached the end of search results.","#0071BD");S.refresh()}catch{u.classList.remove("loader"),l("You have more 100 requests per minute.Please try later")}}
//# sourceMappingURL=commonHelpers.js.map
