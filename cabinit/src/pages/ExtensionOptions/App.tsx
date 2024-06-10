import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "./tabs/Router/router";
import { Settings } from "./tabs/tab-settings/Settings";
import { FelixSites } from "./tabs/tab-supported-site/FelixSites";
import { DemoPage } from "./tabs/tab-demo-page/DemoPage";
import { Layout } from "./tabs/Layout/Layout";
import { HeadDropsControlCenterProvider } from "./tabs/tab-head-drops-control-center/HeadDropsControlCenter.context";
import "../../index.css";
import "../../App.css";
import { HeadDropsControlCenter } from "./tabs/tab-head-drops-control-center/HeadDropsControlCenter";
import { SettingsProvider } from "./tabs/tab-settings/Settings.context";

ReactDOM.createRoot(document.getElementById("extension-options") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider>
      <SettingsProvider>
        <Layout>
          <Settings />
          <HeadDropsControlCenterProvider>
            <HeadDropsControlCenter />
          </HeadDropsControlCenterProvider>
          <DemoPage />
          <FelixSites />
        </Layout>
      </SettingsProvider>
    </RouterProvider>
  </React.StrictMode>
);
