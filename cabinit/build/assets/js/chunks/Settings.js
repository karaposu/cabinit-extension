import{j as e,u as C,C as S,F as p,s as E}from"./router.js";import{r as n,c as T}from"./shared.js";const D=()=>e.jsxs("div",{className:"header",children:[e.jsx("img",{src:"/images/logo-192x192.png",alt:""}),e.jsx("p",{children:"Cabinit"})]}),F=({isOn:t,handleToggle:s,onColor:i,htmlFor:a})=>e.jsxs(e.Fragment,{children:[e.jsx("input",{checked:t,onChange:s,className:"react-switch-checkbox",id:a,type:"checkbox"}),e.jsx("label",{style:{background:t?i:""},className:"react-switch-label",htmlFor:a,children:e.jsx("span",{className:"react-switch-button"})})]}),_=({handleAction:t,text:s})=>e.jsxs("button",{className:"cool-button-pushable",role:"button",onClick:t,children:[e.jsx("span",{className:"cool-button-shadow"}),e.jsx("span",{className:"cool-button-edge"}),e.jsx("span",{className:"cool-button-front text",children:s})]}),h=({labelText:t,value:s,onColor:i,handleToggle:a})=>e.jsxs("div",{className:"settings-item",children:[e.jsx("p",{children:`${t}:`}),e.jsx(F,{isOn:s,onColor:i,handleToggle:()=>a(!s),htmlFor:t})]}),k={advanceSettings:{skinColorTransfer:!1,headOrientation:!0,hairTransfer:!1,imageSizeFilter:{width:512,height:512},showResetButton:!1},handleSaveAdvanceSettings:()=>{},setSkinColorTransfer:()=>{},setHeadOrientation:()=>{},setHairTransfer:()=>{},setImageSizeFilter:()=>{},setShowResetButton:()=>{},showExtensionOptionsOnboarding:!1,showSettingsTab:!1},O=n.createContext(k),R=()=>n.useContext(O),Q=({children:t})=>{const{activeTab:s}=C(),[i,a]=n.useState(!1),[o,l]=n.useState(!0),[g,u]=n.useState(!1),[x,r]=n.useState({width:512,height:512}),[m,d]=n.useState(!1),[f,v]=n.useState(!1),[I,w]=n.useState(!1),b={skinColorTransfer:i,headOrientation:o,hairTransfer:g,imageSizeFilter:x,showResetButton:m},N=async()=>{await chrome.storage.local.set({advanceSettings:b})};return n.useEffect(()=>{chrome.storage.local.get(["advanceSettings"],function(c){a(c.advanceSettings.skinColorTransfer),l(c.advanceSettings.headOrientation),u(c.advanceSettings.hairTransfer),r(c.advanceSettings.imageSizeFilter),d(c.advanceSettings.showResetButton)}),chrome.storage.local.get([S.ExtensionOptionsOnboardingIsActive],function(c){console.log("Value ExtensionOptionsOnboardingIsActive currently is "+c[S.ExtensionOptionsOnboardingIsActive]),v(c[S.ExtensionOptionsOnboardingIsActive])});const A=localStorage.getItem("showSettingsTab")==="true";w(A)},[s]),e.jsx(O.Provider,{value:{handleSaveAdvanceSettings:N,advanceSettings:b,setSkinColorTransfer:a,setHeadOrientation:l,setHairTransfer:u,setImageSizeFilter:r,setShowResetButton:d,showExtensionOptionsOnboarding:f,showSettingsTab:I},children:t})},H=({activeSettingsTab:t})=>{if(t!==j.AdvanceSettings)return null;const{advanceSettings:s,handleSaveAdvanceSettings:i,setSkinColorTransfer:a,setHeadOrientation:o,setHairTransfer:l,setImageSizeFilter:g,setShowResetButton:u}=R(),{skinColorTransfer:x,headOrientation:r,hairTransfer:m,imageSizeFilter:d,showResetButton:f}=s;return e.jsxs("div",{className:"advance-settings",children:[e.jsx("h1",{className:"section-name",children:"Advance Settings"}),e.jsx(h,{labelText:"Skin-Color-Transfer",value:x,onColor:"#A8DF8E",handleToggle:a}),e.jsx(h,{labelText:"Head-Orientation",value:r,onColor:"#A8DF8E",handleToggle:o}),e.jsx(h,{labelText:"Hair-Transfer",value:m,onColor:"#A8DF8E",handleToggle:l}),e.jsxs("div",{className:"image-size-filter",children:[e.jsx("p",{children:"Image Size Filter Height "}),e.jsx("input",{type:"number",value:d.height,onChange:v=>g({...d,height:parseInt(v.target.value)})})]}),e.jsxs("div",{className:"image-size-filter",children:[e.jsx("p",{children:"Image Size Filter Width "}),e.jsx("input",{type:"number",value:d.width,onChange:v=>g({...d,width:parseInt(v.target.value)})})]}),e.jsx(h,{labelText:"Show Reset Button",value:f,onColor:"#A8DF8E",handleToggle:u}),e.jsx("button",{className:"save-button",onClick:i,children:e.jsx("p",{children:"Save"})})]})},y=({activeSettingsTab:t})=>{if(t!==j.ShareSettings)return null;const[s,i]=n.useState(!1),[a,o]=n.useState(!1),[l,g]=n.useState(!1),u={isIncludeOriginalImage:s,isIncludeOroductQRCode:a,isIncludeHeaddropeQRCode:l},x=async()=>{await chrome.storage.local.set({shareSettings:u})};return n.useEffect(()=>{chrome.storage.local.get(["shareSettings"],function(r){console.log("Value currently is "+r.shareSettings),i(r.shareSettings.isIncludeOriginalImage),o(r.shareSettings.isIncludeOroductQRCode),g(r.shareSettings.isIncludeHeaddropeQRCode)})},[]),e.jsxs("div",{className:"share-settings",children:[e.jsx("h1",{className:"section-name",children:"Share Settings"}),e.jsx("p",{children:"You can customize how your shared felix-images look"}),e.jsxs("div",{className:"share-settings-context",children:[e.jsx("img",{src:"/images/Share-settings.png",alt:"share-settings"}),e.jsxs("div",{className:"setting-items",children:[e.jsx(h,{labelText:"Include-Original-Image",value:s,onColor:"#8DDFCB",handleToggle:i}),e.jsx(h,{labelText:"Include-QR-code-of-the-product",value:a,onColor:"#8DDFCB",handleToggle:o}),e.jsx(h,{labelText:"Include-QR-code-of-your-headdrope",value:l,onColor:"#8DDFCB",handleToggle:g}),e.jsx("button",{className:"save-button",onClick:x,children:e.jsx("p",{children:"Save"})})]})]})]})};var j=(t=>(t.AdvanceSettings="advance-settings",t.ShareSettings="share-settings",t))(j||{});const P=()=>{const{activeTab:t}=C();if(t!==p.Settings)return null;const[s,i]=n.useState("share-settings");n.useLayoutEffect(()=>{chrome.storage.local.get(S.ExtensionOptionsSettingsActiveTab,o=>{o[S.ExtensionOptionsSettingsActiveTab]&&i(o[S.ExtensionOptionsSettingsActiveTab])})},[]);const a=o=>{i(o),E({tab:p.Settings,settingsTab:o,redirectExtensionOptionPage:!1})};return e.jsxs("div",{className:"settings",children:[e.jsxs("div",{className:"navigation-section",children:[e.jsx("div",{className:T("navigation-section__item",s==="advance-settings"&&"navigation-section__item--active"),onClick:()=>a("advance-settings"),children:e.jsx("span",{children:"Advance Settings"})}),e.jsx("div",{className:T("navigation-section__item",s==="share-settings"&&"navigation-section__item--active"),onClick:()=>a("share-settings"),children:e.jsx("span",{children:"Share Settings"})})]}),e.jsx(H,{activeSettingsTab:s}),e.jsx(y,{activeSettingsTab:s})]})};export{_ as C,D as H,F as S,j as a,Q as b,P as c,R as u};