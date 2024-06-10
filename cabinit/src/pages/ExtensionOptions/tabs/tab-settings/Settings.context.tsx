import { Context, createContext, useContext, PropsWithChildren, useEffect, useState } from "react";
import { ChromeStorageKeys } from "../../../../enum";
import { useRouter } from "../Router/router";

interface SettingsContext {
  advanceSettings: {
    skinColorTransfer: boolean;
    headOrientation: boolean;
    hairTransfer: boolean;
    imageSizeFilter: {
      width: number;
      height: number;
    };
    showResetButton: boolean;
  };
  handleSaveAdvanceSettings: () => void;
  setSkinColorTransfer: (value: boolean) => void;
  setHeadOrientation: (value: boolean) => void;
  setHairTransfer: (value: boolean) => void;
  setImageSizeFilter: (value: { width: number; height: number }) => void;
  setShowResetButton: (value: boolean) => void;
  showExtensionOptionsOnboarding: boolean;
  showSettingsTab: boolean;
}

const defaultSettingsContext: SettingsContext = {
  advanceSettings: {
    skinColorTransfer: false,
    headOrientation: true,
    hairTransfer: false,
    imageSizeFilter: {
      width: 512,
      height: 512,
    },
    showResetButton: false,
  },
  handleSaveAdvanceSettings: () => {},
  setSkinColorTransfer: () => {},
  setHeadOrientation: () => {},
  setHairTransfer: () => {},
  setImageSizeFilter: () => {},
  setShowResetButton: () => {},
  showExtensionOptionsOnboarding: false,
  showSettingsTab: false,
};

const SettingsContext: Context<SettingsContext> = createContext(defaultSettingsContext);

const useSettings = () => useContext(SettingsContext);

const SettingsProvider = ({ children }: PropsWithChildren<{}>) => {
  const { activeTab } = useRouter();
  const [skinColorTransfer, setSkinColorTransfer] = useState(false);
  const [headOrientation, setHeadOrientation] = useState(true);
  const [hairTransfer, setHairTransfer] = useState(false);
  const [imageSizeFilter, setImageSizeFilter] = useState({
    width: 512,
    height: 512,
  });
  const [showResetButton, setShowResetButton] = useState(false);
  const [showExtensionOptionsOnboarding, setShowExtensionOptionsOnboarding] = useState(false);
  const [showSettingsTab, setShowSettingsTab] = useState(false);

  const advanceSettings = {
    skinColorTransfer,
    headOrientation,
    hairTransfer,
    imageSizeFilter,
    showResetButton,
  };

  const handleSaveAdvanceSettings = async () => {
    await chrome.storage.local.set({
      advanceSettings,
    });
  };

  useEffect(() => {
    chrome.storage.local.get(["advanceSettings"], function (result) {
      setSkinColorTransfer(result.advanceSettings.skinColorTransfer);
      setHeadOrientation(result.advanceSettings.headOrientation);
      setHairTransfer(result.advanceSettings.hairTransfer);
      setImageSizeFilter(result.advanceSettings.imageSizeFilter);
      setShowResetButton(result.advanceSettings.showResetButton);
    });

    chrome.storage.local.get([ChromeStorageKeys.ExtensionOptionsOnboardingIsActive], function (result) {
      console.log(
        "Value ExtensionOptionsOnboardingIsActive currently is " +
          result[ChromeStorageKeys.ExtensionOptionsOnboardingIsActive]
      );
      setShowExtensionOptionsOnboarding(result[ChromeStorageKeys.ExtensionOptionsOnboardingIsActive]);
    });

    // read local storage to show settings tab
    const _showSettingsTab = localStorage.getItem("showSettingsTab") === "true";
    setShowSettingsTab(_showSettingsTab);
  }, [activeTab]);

  return (
    <SettingsContext.Provider
      value={{
        handleSaveAdvanceSettings,
        advanceSettings,
        setSkinColorTransfer,
        setHeadOrientation,
        setHairTransfer,
        setImageSizeFilter,
        setShowResetButton,
        showExtensionOptionsOnboarding,
        showSettingsTab,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsProvider, useSettings, SettingsContext, defaultSettingsContext };
