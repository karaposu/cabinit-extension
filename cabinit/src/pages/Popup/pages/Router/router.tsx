import {
  Context,
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  useEffect,
} from "react";
import { FelixPopupTabs } from "../Navigation/Navigation.types";

interface RouterContext {
  activeTab: FelixPopupTabs;
  setActiveTab: Dispatch<SetStateAction<RouterContext["activeTab"]>>;
}

const defaultRouterContext: RouterContext = {
  activeTab: FelixPopupTabs.MainMenu,
  setActiveTab: () => {},
};

const RouterContext: Context<RouterContext> = createContext(defaultRouterContext);

const useRouter = () => useContext(RouterContext);

interface RouterProviderProps {}

const RouterProvider = ({ children }: PropsWithChildren<RouterProviderProps>) => {
  const [activeTab, setActiveTab] = useState(FelixPopupTabs.MainMenu);

  useEffect(() => {
    chrome.storage.local.get(["isIntroSeen"], (result) => {
      const isIntroSeen = result.isIntroSeen;
      if (!isIntroSeen) setActiveTab(FelixPopupTabs.Intro);
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

export { RouterProvider, useRouter, RouterContext, defaultRouterContext };
