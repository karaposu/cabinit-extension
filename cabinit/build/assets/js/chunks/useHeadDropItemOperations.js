import{j as h}from"./router.js";import{r}from"./shared.js";const F={favoritedHeadDrops:[],favoritedHeadDropNameList:[],myHeadDrops:[],setMyHeadDrops:()=>{},friendsHeadDrops:[],isDataFetched:!1},u=r.createContext(F),C=()=>r.useContext(u),v=s=>Array.from({length:5},(d,i)=>({name:`${s}${i}`,previewPhotoBase64:"",feedPhotos:[],avatar:[],isActiveHeadDrop:!1})),w=({children:s})=>{const d=async a=>(await chrome.storage.local.get([a]))[a],[i,n]=r.useState(v("myHeadDrop-")),[p,H]=r.useState(v("friendsHeadDrop-")),[D,f]=r.useState([]),[e,t]=r.useState([]),[o,c]=r.useState(!1);return r.useLayoutEffect(()=>{(async()=>{try{const a=await d("myHeadDrops");a&&n(a);const m=await d("friendsHeadDrops");m&&H(m);const{favoritedHeadDropNameList:l}=await chrome.storage.local.get(["favoritedHeadDropNameList"]);l&&t(l);const y=a.filter(g=>l.includes(g.name));f(y),c(!0)}catch(a){console.error("Failed to load head drops:",a)}})()},[]),h.jsx(u.Provider,{value:{favoritedHeadDrops:D,favoritedHeadDropNameList:e,myHeadDrops:i,setMyHeadDrops:n,friendsHeadDrops:p,isDataFetched:o},children:s})},A=()=>{const{myHeadDrops:s,favoritedHeadDropNameList:d}=C(),i=()=>d.length===1,n=(e,t)=>{chrome.storage.local.set({[e]:t})},p=()=>{window.location.reload()},H=async e=>{const t=d.filter(o=>o!==e.name);if(n("favoritedHeadDropNameList",t),e.isActiveHeadDrop){D(e);const o=s.map(c=>({...c,isActiveHeadDrop:!1}));o[0].isActiveHeadDrop=!0,n("myHeadDrops",o),p()}else p()},D=async e=>{const t=s.map(o=>({...o,isActiveHeadDrop:o.name===e.name?!o.isActiveHeadDrop:!1}));n("myHeadDrops",t),p()};return{toggleActiveHeadDrop:D,removeFromFavoritedHeadDrop:H,hasOnlyOneFavoritedHeadDropExist:i,resetHeadDropContext:()=>{const e=t=>Array.from({length:5},(o,c)=>({name:`${t}${c}`,previewPhotoBase64:"",feedPhotos:[],avatar:[],isActiveHeadDrop:!1}));chrome.storage.local.set({myHeadDrops:e("myHeadDrop-")}),chrome.storage.local.set({favoritedHeadDropNameList:[]}),window.location.reload()}}};export{w as H,A as a,C as u};