import{j as s,s as r,F as c,W as m,c as l}from"../chunks/router.js";import{R as g}from"../chunks/shared.js";import{u as p,a as v,H as k}from"../chunks/useHeadDropItemOperations.js";const x=a=>{window.parent.postMessage(a,"*")},h=()=>{const{favoritedHeadDrops:a}=p(),{toggleActiveHeadDrop:o}=v(),t=[{name:"reload",icon:"/svg/reload.svg",action:()=>{}},{name:"share",icon:"/svg/share.svg",action:()=>{}},{name:"download",icon:"/svg/download.svg",action:()=>{}},{name:"bookmark",icon:"/svg/bookmark.svg",action:()=>{}}],i=()=>{r({tab:c.MyHeadDrops})},n=e=>{o(e),x({action:m.UPDATE_WIDGET_IMAGE,image:e.previewPhotoBase64})},d=e=>{n(e)};return s.jsxs("div",{className:"felix-widget",children:[s.jsx("div",{className:"actions",children:t.map(e=>s.jsx("div",{className:"action",onClick:e.action,style:{maskImage:`url(${e.icon})`,WebkitMaskImage:`url(${e.icon})`}}))}),s.jsxs("div",{className:"headdrops",children:[a==null?void 0:a.map(e=>s.jsx("div",{className:"headdrop-item",onClick:()=>d(e),children:s.jsx("img",{src:e.previewPhotoBase64,alt:e.name})})),s.jsx("div",{className:"add-more-headdrop",onClick:i,style:{maskImage:'url("/svg/add-more.svg")',WebkitMaskImage:'url("/svg/add-more.svg")'}})]})]})};l.createRoot(document.getElementById("widget-page")).render(s.jsx(g.StrictMode,{children:s.jsx(k,{children:s.jsx(h,{})})}));