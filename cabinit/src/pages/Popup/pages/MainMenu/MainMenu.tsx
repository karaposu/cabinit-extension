import { useEffect, useState } from "react";
import { Switch } from "../../../ExtensionOptions/tabs/tab-settings/_components/Switch/Switch";
import { FelixPopupTabs } from "../Navigation/Navigation.types";
import { useRouter } from "../Router/router";
import { FelixTabs } from "../../../ExtensionOptions/tabs/Router/NavigationSection-types";
import { CoolButton } from "../../../../common/components/CoolButton/CoolButton";
import "./MainMenu.scss";
import { setExtensionOptionsActiveTab } from "../../../ExtensionOptions/tabs/Router/router";
import { ChromeStorageKeys } from "../../../../enum";

const MainMenu = () => {
  const { activeTab, setActiveTab } = useRouter();
  const [isWildFelix, setIsWildFelix] = useState(false);
  const [isExtensionActive, setIsExtensionActive] = useState(false);

  const handleWildFelixButton = () => {
    chrome.tabs.reload();
    setIsWildFelix(!isWildFelix);
    chrome.storage.local.set({ isWildFelix: !isWildFelix });
  };

  const handleDeactiveFelixButton = () => {
    setIsExtensionActive(!isExtensionActive);
    chrome.storage.local.set({ [ChromeStorageKeys.isExtensionActive]: !isExtensionActive });
    chrome.tabs.reload();
  };

  useEffect(() => {
    chrome.storage.local.get("isWildFelix", (result) => {
      if (result.isWildFelix) {
        setIsWildFelix(true);
      }
    });

    chrome.storage.local.get([ChromeStorageKeys.isExtensionActive], (result) => {
      if (result[ChromeStorageKeys.isExtensionActive]) {
        setIsExtensionActive(true);
      }
    });
  }, []);

  const handleMyImagesButton = () => {
    setActiveTab(FelixPopupTabs.Navigation);
  };

  const handleFelixEnabledPagesButton = () => {
    setExtensionOptionsActiveTab({ tab: FelixTabs.FelixSites });
  };

  if (activeTab !== FelixPopupTabs.MainMenu) {
    return null;
  }

  return (
    <div className="popup-main-menu">
      <p>Cabinit automatically detects felix-enabled websites and stays passive otherwise</p>

      <div className="deactive-felix">
        <h3>Deactive Cabinit</h3>

        <Switch
          handleToggle={handleDeactiveFelixButton}
          htmlFor="isDeactiveFelix"
          onColor="#F6635C"
          key={1}
          isOn={!isExtensionActive}
        />
      </div>

      <div className="buttons">
        <CoolButton handleAction={handleMyImagesButton} text="My Images & Settings" />
        <CoolButton handleAction={handleFelixEnabledPagesButton} text="cabinit-enabled Pages" />
      </div>

      <div className="wild-felix">
        <p>To use cabinit with non cabinit-enabled sites you can activate:</p>
        <h1>Wild Cabinit</h1>

        <Switch
          handleToggle={handleWildFelixButton}
          htmlFor="isWildFelix"
          onColor="#A8DF8E"
          key={1}
          isOn={isWildFelix}
        />
      </div>

      <footer>Buy me a coffee & Contact us</footer>

      {!isExtensionActive && <div className="deactive-backdrop" />}
    </div>
  );
};

export { MainMenu };
