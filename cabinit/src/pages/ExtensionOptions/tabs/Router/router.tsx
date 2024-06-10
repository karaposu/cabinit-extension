import {
  Context,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useLayoutEffect,
} from "react";
import { FelixTabs } from "./NavigationSection-types";
import { ChromeStorageKeys } from "../../../../enum";
import { SettingsTabs } from "../tab-settings/Settings";

interface RouterContext {
  activeTab: FelixTabs;
  setActiveTab: Dispatch<SetStateAction<RouterContext["activeTab"]>>;
}

const defaultRouterContext: RouterContext = {
  activeTab: FelixTabs.DemoPage,
  setActiveTab: () => {},
};

const RouterContext: Context<RouterContext> = createContext(defaultRouterContext);

const useRouter = () => useContext(RouterContext);

interface RouterProviderProps {}

const RouterProvider = ({ children }: PropsWithChildren<RouterProviderProps>) => {
  const [activeTab, setActiveTab] = useState(FelixTabs.DemoPage);

  useLayoutEffect(() => {
    // check url params if tab is present then set active tab
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab");
    if (tab) {
      setActiveTab(tab as FelixTabs);
      setExtensionOptionsActiveTab({ tab: tab as FelixTabs, redirectExtensionOptionPage: false });
    }

    chrome.storage.local.get(ChromeStorageKeys.ExtensionOptionsActiveTab, (result) => {
      if (result[ChromeStorageKeys.ExtensionOptionsActiveTab]) {
        setActiveTab(result[ChromeStorageKeys.ExtensionOptionsActiveTab]);
      }
    });
  }, []);

  return (
    <RouterContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

const setExtensionOptionsActiveTab = ({
  tab,
  settingsTab,
  redirectExtensionOptionPage = true,
}: {
  tab: FelixTabs;
  settingsTab?: SettingsTabs;
  redirectExtensionOptionPage?: boolean;
}) => {
  chrome.storage.local.set({ [ChromeStorageKeys.ExtensionOptionsActiveTab]: tab });

  if (settingsTab) {
    chrome.storage.local.set({ [ChromeStorageKeys.ExtensionOptionsSettingsActiveTab]: settingsTab });
  }

  if (redirectExtensionOptionPage) {
    chrome.tabs.create({ url: "/ExtensionOptions/index.html" });
  }
};

export { RouterProvider, useRouter, RouterContext, defaultRouterContext, setExtensionOptionsActiveTab };
