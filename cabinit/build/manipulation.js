const r="http://localhost:3000/api/felix/manupulate-images";(async()=>await setTimeout(async()=>{var e=window.location.hostname;const{isWildFelix:a}=await chrome.storage.local.get(["isWildFelix"]),{setupImages:i}=await chrome.storage.local.get(["setupImages"]);if(!a)return;const d=window.document.getElementsByTagName("img"),o=Array.from(d),n=o==null?void 0:o.map((t,s)=>({id:s,src:t.src,left:t.offsetLeft,top:t.offsetTop})),l=await(await fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({domain:e,setupImages:i,images:n})})).json(),c=l.images;await setTimeout(()=>{o.forEach((t,s)=>{t.src===c[s].src&&(t.src=c[s].manipulatedImage)})},2e3),console.table("isWildFelix:",a),console.table("domain:",e),console.table(n),console.table(i),console.table("Backend Response:",l),await m()},2e3))();const m=async()=>{const e=document.createElement("div");e.style.position="fixed",e.style.top="10px",e.style.right="10px",e.style.backgroundColor="#cdc6bc",e.style.color="black",e.style.padding="10px",e.style.borderRadius="5px",e.style.fontFamily="inherit",e.style.fontSize="14px",e.style.zIndex="999",e.style.fontWeight="bold",e.style.boxShadow="0 0 10px 0 rgba(0, 0, 0, 0.2)",e.innerHTML="🔔  Cabinit manupulated images",document.body.appendChild(e),await setTimeout(()=>{document.body.removeChild(e),e.remove()},5e3)};
