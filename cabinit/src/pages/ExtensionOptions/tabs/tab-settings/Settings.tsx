import { useLayoutEffect, useState } from "react";
import { setExtensionOptionsActiveTab, useRouter } from "../Router/router";
import { AdvanceSettings } from "./AdvanceSettings/AdvanceSettings";
import { ShareSettings } from "./ShareSettings/ShareSettings";
import cn from "classnames";
import "./Settings.scss";
import { FelixTabs } from "../Router/NavigationSection-types";
import { ChromeStorageKeys } from "../../../../enum";

export enum SettingsTabs {
  AdvanceSettings = "advance-settings",
  ShareSettings = "share-settings",
}

const Settings = () => {
  const { activeTab } = useRouter();

  if (activeTab !== FelixTabs.Settings) {
    return null;
  }

  const [activeSettingsTab, setActiveSettingsTab] = useState(SettingsTabs.ShareSettings);

  useLayoutEffect(() => {
    // Read the ExtensionOptionsSettingsActiveTab from the storage
    chrome.storage.local.get(ChromeStorageKeys.ExtensionOptionsSettingsActiveTab, (result) => {
      if (result[ChromeStorageKeys.ExtensionOptionsSettingsActiveTab]) {
        setActiveSettingsTab(result[ChromeStorageKeys.ExtensionOptionsSettingsActiveTab]);
      }
    });
  }, []);

  const setExtensionOptionsSettingsActiveTab = (activeSettingsTab: SettingsTabs) => {
    setActiveSettingsTab(activeSettingsTab);

    setExtensionOptionsActiveTab({
      tab: FelixTabs.Settings,
      settingsTab: activeSettingsTab,
      redirectExtensionOptionPage: false,
    });
  };

  return (
    <div className="settings">
      <div className="navigation-section">
        <div
          className={cn(
            "navigation-section__item",
            activeSettingsTab === SettingsTabs.AdvanceSettings && "navigation-section__item--active"
          )}
          onClick={() => setExtensionOptionsSettingsActiveTab(SettingsTabs.AdvanceSettings)}
        >
          <span>Advance Settings</span>
        </div>
        <div
          className={cn(
            "navigation-section__item",
            activeSettingsTab === SettingsTabs.ShareSettings && "navigation-section__item--active"
          )}
          onClick={() => setExtensionOptionsSettingsActiveTab(SettingsTabs.ShareSettings)}
        >
          <span>Share Settings</span>
        </div>
      </div>

      <AdvanceSettings activeSettingsTab={activeSettingsTab} />
      <ShareSettings activeSettingsTab={activeSettingsTab} />
    </div>
  );
};

export { Settings };
