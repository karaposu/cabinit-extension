import React from "react";
import ReactDOM from "react-dom/client";
import { Layout } from "./pages/Layout/Layout";
import { RouterProvider } from "./pages/Router/router";
import { Intro } from "./pages/Intro/Intro";
import { MainMenu } from "./pages/MainMenu/MainMenu";
import { Navigation } from "./pages/Navigation/Navigation";
import { SettingsProvider, useSettings } from "../ExtensionOptions/tabs/tab-settings/Settings.context";

const IntroResetButton = () => {
  const { advanceSettings } = useSettings();

  const showResetButton = advanceSettings.showResetButton;

  const handleClick = () => {
    chrome.storage.local.set({ isIntroSeen: false });
  };

  if (!showResetButton) {
    return null;
  }

  return (
    <button onClick={handleClick} style={{ position: "fixed", bottom: 0, right: 0 }}>
      Reset Intro
    </button>
  );
};

ReactDOM.createRoot(document.getElementById("popup") as HTMLElement).render(
  <React.StrictMode>
    <SettingsProvider>
      <RouterProvider>
        <Layout>
          <Intro />
          <MainMenu />
          <Navigation />
          <IntroResetButton />
        </Layout>
      </RouterProvider>
    </SettingsProvider>
  </React.StrictMode>
);
