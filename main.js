(()=>{"use strict";async function e(){let e=await fetch("../quotes.json");return await e.json()}function t(e,t){let n=document.getElementById(t);if(n.textContent="",t="theList")for(let t of e){let e=document.createElement("li");for(let n of t.quote)if("the"===n||"The"===n){let t=document.createElement("b");t.innerHTML=n,e.appendChild(t)}else e.textContent+=n;n.appendChild(e)}else for(let t of e){let e=document.createElement("li");e.innerHTML=t.quote+"\n\t-"+t.author,n.appendChild(e)}}document.addEventListener("DOMContentLoaded",(()=>{document.getElementById("all").addEventListener("click",(async()=>{t((await e()).quotes.sort((function(e,t){let n=e.author.toUpperCase(),o=t.author.toUpperCase();return n<o?-1:n>o?1:0})),"allList")})),document.getElementById("the").addEventListener("click",(async()=>{t((await e()).quotes.filter((e=>e.quote.includes("the")||e.quote.includes("The"))),"theList")})),document.getElementById("length").addEventListener("click",(async()=>{let t=[],n=(await e()).quotes.sort((function(e,t){let n=e.author.toUpperCase(),o=t.author.toUpperCase();return n<o?-1:n>o?1:0})),o=document.getElementById("lengthList");o.textContent="";for(let e of n){let n=document.createElement("li");t.push(e.quote.length),n.innerHTML=e.quote.length+" "+e.quote+"\n\t-"+e.author,o.appendChild(n)}})),document.getElementById("search").addEventListener("change",(async()=>{let t=document.getElementById("search").value,n=(await e()).quotes.filter((e=>e.author.toLowerCase()===t.toLowerCase()));document.getElementById("countOut").value=n.length}))}))})();