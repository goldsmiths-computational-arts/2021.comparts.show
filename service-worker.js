!function(){"use strict";const e=1626794423328,t=`cache${e}`,n=["/client/client.7c6bb904.js","/client/inject_styles.5607aec6.js","/client/index.f879f370.js","/client/about.1b3cf744.js","/client/index.55515a8c.js","/client/[slug].d086df25.js","/client/three-demo.66b8aac9.js"].concat(["/service-worker-index.html","/css/global.css","/img/one-pager/overlay-bg-1.png","/img/one-pager/overlay-bg-2.png","/manifest.json"]),s=new Set(n);self.addEventListener("install",(e=>{e.waitUntil(caches.open(t).then((e=>e.addAll(n))).then((()=>{self.skipWaiting()})))})),self.addEventListener("activate",(e=>{e.waitUntil(caches.keys().then((async e=>{for(const n of e)n!==t&&await caches.delete(n);self.clients.claim()})))})),self.addEventListener("fetch",(t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const n=new URL(t.request.url),c=n.protocol.startsWith("http"),a=n.hostname===self.location.hostname&&n.port!==self.location.port,i=n.host===self.location.host&&s.has(n.pathname),o="only-if-cached"===t.request.cache&&!i;!c||a||o||t.respondWith((async()=>i&&await caches.match(t.request)||async function(t){const n=await caches.open(`offline${e}`);try{const e=await fetch(t);return n.put(t,e.clone()),e}catch(e){const s=await n.match(t);if(s)return s;throw e}}(t.request))())}))}();
