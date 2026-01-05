const c=document.querySelectorAll(".broker-checkbox"),f=document.getElementById("clearSelection"),o=document.getElementById("emptyState"),l=document.getElementById("comparisonTable"),r=document.getElementById("brokerHeaders"),t={rating:document.getElementById("row-rating"),hq:document.getElementById("row-hq"),established:document.getElementById("row-established"),regulation:document.getElementById("row-regulation"),fees:document.getElementById("row-fees"),platforms:document.getElementById("row-platforms"),regulations:document.getElementById("row-regulations"),spreads:document.getElementById("row-spreads")},i={};async function p(){(await(await fetch("/brokers.json")).json()).brokers.forEach(e=>{i[e.slug]=e})}p();function d(){const a=Array.from(c).filter(s=>s.checked).map(s=>s.value);if(a.length<2){o?.classList.remove("hidden"),l?.classList.add("hidden");return}o?.classList.add("hidden"),l?.classList.remove("hidden"),r&&(r.innerHTML='<div class="p-4 font-medium text-gray-500">Feature</div>',a.forEach(s=>{const e=i[s];e&&(r.innerHTML+=`
            <div class="p-4 text-center">
              <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <span class="font-bold text-gray-400">${e.name.charAt(0)}</span>
              </div>
              <a href="/brokers/${s}" class="font-semibold text-gray-900 hover:text-primary-600">${e.name}</a>
            </div>
          `)})),a.forEach(s=>{const e=i[s];if(e&&(t.rating&&(t.rating.innerHTML+=`
          <div class="text-center">
            <div class="flex items-center justify-center gap-1">
              <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span class="font-bold">${e.rating.toFixed(1)}</span>
            </div>
          </div>
        `),t.hq&&(t.hq.innerHTML+=`<div class="text-center text-sm">${e.headquarters}</div>`),t.established&&(t.established.innerHTML+=`<div class="text-center text-sm">${e.established}</div>`),t.regulation&&(t.regulation.innerHTML+=`
          <div class="text-center">
            <div class="inline-flex items-center gap-1">
              <span class="font-semibold">${e.scores?.regulationTrust||"N/A"}</span>
              <span class="text-gray-400">/10</span>
            </div>
          </div>
        `),t.fees&&(t.fees.innerHTML+=`
          <div class="text-center">
            <div class="inline-flex items-center gap-1">
              <span class="font-semibold">${e.scores?.fees||"N/A"}</span>
              <span class="text-gray-400">/10</span>
            </div>
          </div>
        `),t.platforms&&(t.platforms.innerHTML+=`
          <div class="text-center">
            <div class="flex flex-wrap justify-center gap-1">
              ${(e.platforms||[]).slice(0,2).map(n=>`<span class="text-xs bg-gray-100 px-2 py-1 rounded">${n}</span>`).join("")}
              ${(e.platforms||[]).length>2?`<span class="text-xs text-gray-400">+${(e.platforms||[]).length-2}</span>`:""}
            </div>
          </div>
        `),t.regulations&&(t.regulations.innerHTML+=`
          <div class="text-center text-sm">
            ${(e.regulations||[]).map(n=>`<div class="text-xs">${n.jurisdiction}</div>`).join("")||"N/A"}
          </div>
        `),t.spreads)){const n=(e.spreads||[]).find(m=>m.currencyPair==="EUR/USD");t.spreads.innerHTML+=`
          <div class="text-center">
            <span class="font-semibold">${n?n.spreadFrom:"N/A"}</span>
            <span class="text-gray-400 text-sm"> pips</span>
          </div>
        `}})}c.forEach(a=>{a.addEventListener("change",()=>{Object.values(t).forEach(s=>{s&&(s.innerHTML="")}),d()})});f?.addEventListener("click",()=>{c.forEach(a=>a.checked=!1),Object.values(t).forEach(a=>{a&&(a.innerHTML="")}),d()});
