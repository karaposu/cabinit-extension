import{j as e,s as r,F as d,C as h,c as C}from"../chunks/router.js";import{r as o,R as M}from"../chunks/shared.js";import{H as A,S as g,C as l,a as p,b as I,u as y}from"../chunks/Settings.js";const N=({children:t})=>e.jsxs("div",{className:"popup",children:[e.jsx(A,{}),e.jsx("div",{className:"content",children:t})]});var n=(t=>(t.Intro="Intro",t.MainMenu="MainMenu",t.Navigation="Navigation",t))(n||{});const T={activeTab:n.MainMenu,setActiveTab:()=>{}},b=o.createContext(T),m=()=>o.useContext(b),w=({children:t})=>{const[i,s]=o.useState(n.MainMenu);return o.useEffect(()=>{chrome.storage.local.get(["isIntroSeen"],c=>{c.isIntroSeen||s(n.Intro)})},[]),e.jsx(b.Provider,{value:{activeTab:i,setActiveTab:s},children:t})},F=()=>{const{setActiveTab:t,activeTab:i}=m(),s=()=>{chrome.storage.local.set({isIntroSeen:!0},()=>{t(n.MainMenu)}),r({tab:d.MyHeadDrops})};return i!==n.Intro?null:e.jsxs("div",{className:"popup-intro",children:[e.jsx("p",{className:"popup-text p-1",children:"Hello, thanks for downloading Cabinit!"}),e.jsx("p",{className:"popup-text p-2",children:"Cabinit is here to help you with your online shopping experience with it's innovative but simple try-on technology."}),e.jsx("img",{src:"/images/Intro.png",alt:"abbas"}),e.jsx("p",{className:"popup-text p-3",children:"All you need to do is complete a small setup process. After that Cabinit will recognize when you are in one of the Cabinit- enabled shopping websites and it will activate automatically."}),e.jsx("div",{className:"button-wrapper",children:e.jsx("button",{className:"button-37",role:"button",onClick:s,children:"Next"})})]})},k=()=>{const{activeTab:t,setActiveTab:i}=m(),[s,c]=o.useState(!1),[a,u]=o.useState(!1),v=()=>{chrome.tabs.reload(),c(!s),chrome.storage.local.set({isWildFelix:!s})},j=()=>{u(!a),chrome.storage.local.set({[h.isExtensionActive]:!a}),chrome.tabs.reload()};o.useEffect(()=>{chrome.storage.local.get("isWildFelix",x=>{x.isWildFelix&&c(!0)}),chrome.storage.local.get([h.isExtensionActive],x=>{x[h.isExtensionActive]&&u(!0)})},[]);const S=()=>{i(n.Navigation)},f=()=>{r({tab:d.FelixSites})};return t!==n.MainMenu?null:e.jsxs("div",{className:"popup-main-menu",children:[e.jsx("p",{children:"Cabinit automatically detects felix-enabled websites and stays passive otherwise"}),e.jsxs("div",{className:"deactive-felix",children:[e.jsx("h3",{children:"Deactive Cabinit"}),e.jsx(g,{handleToggle:j,htmlFor:"isDeactiveFelix",onColor:"#F6635C",isOn:!a},1)]}),e.jsxs("div",{className:"buttons",children:[e.jsx(l,{handleAction:S,text:"My Images & Settings"}),e.jsx(l,{handleAction:f,text:"cabinit-enabled Pages"})]}),e.jsxs("div",{className:"wild-felix",children:[e.jsx("p",{children:"To use cabinit with non cabinit-enabled sites you can activate:"}),e.jsx("h1",{children:"Wild Cabinit"}),e.jsx(g,{handleToggle:v,htmlFor:"isWildFelix",onColor:"#A8DF8E",isOn:s},1)]}),e.jsx("footer",{children:"Buy me a coffee & Contact us"}),!a&&e.jsx("div",{className:"deactive-backdrop"})]})},E=()=>{const{setActiveTab:t,activeTab:i}=m(),s=()=>{r({tab:d.MyHeadDrops})},c=()=>{r({tab:d.Settings,settingsTab:p.AdvanceSettings})},a=()=>{r({tab:d.Settings,settingsTab:p.ShareSettings})};if(i!==n.Navigation)return null;const u=localStorage.getItem("showSettingsTab")==="true";return e.jsxs(e.Fragment,{children:[e.jsx("img",{className:"back-button",style:{maskImage:"url(https://cdn.dsmcdn.com/sfint/production/m-account-menu-back-button_1668535948888.svg)",WebkitMaskImage:"url(https://cdn.dsmcdn.com/sfint/production/m-account-menu-back-button_1668535948888.svg)"},onClick:()=>t(n.MainMenu)}),e.jsxs("div",{className:"popup-navigations",children:[e.jsx(l,{handleAction:s,text:"Re-upload Images"}),e.jsx(l,{handleAction:s,text:"My HeadDrops"}),u&&e.jsxs(e.Fragment,{children:[e.jsx(l,{handleAction:a,text:"Cabinit-Share Settings"}),e.jsx(l,{handleAction:c,text:"Advanced Settings"})]})]})]})},R=()=>{const{advanceSettings:t}=y(),i=t.showResetButton,s=()=>{chrome.storage.local.set({isIntroSeen:!1})};return i?e.jsx("button",{onClick:s,style:{position:"fixed",bottom:0,right:0},children:"Reset Intro"}):null};C.createRoot(document.getElementById("popup")).render(e.jsx(M.StrictMode,{children:e.jsx(I,{children:e.jsx(w,{children:e.jsxs(N,{children:[e.jsx(F,{}),e.jsx(k,{}),e.jsx(E,{}),e.jsx(R,{})]})})})}));