import React from "react";
import ReactDOM from "react-dom/client";

import "../../index.css";
import "../../App.css";
import { Widget } from "./components/WIdget/Widget";
import { HeadDropsControlCenterProvider } from "../ExtensionOptions/tabs/tab-head-drops-control-center/HeadDropsControlCenter.context";

ReactDOM.createRoot(document.getElementById("widget-page") as HTMLElement).render(
  <React.StrictMode>
    <HeadDropsControlCenterProvider>
      <Widget />
    </HeadDropsControlCenterProvider>
  </React.StrictMode>
);
