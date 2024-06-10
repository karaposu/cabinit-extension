import { useRouter } from "../Router/router";
import { FelixPopupTabs } from "./Navigation.types";
import "./Navigation.scss";
import { CoolButton } from "../../../../common/components/CoolButton/CoolButton";
import { FelixTabs } from "../../../ExtensionOptions/tabs/Router/NavigationSection-types";
import { SettingsTabs } from "../../../ExtensionOptions/tabs/tab-settings/Settings";
import { setExtensionOptionsActiveTab } from "../../../ExtensionOptions/tabs/Router/router";

const Navigation = () => {
  const { setActiveTab, activeTab } = useRouter();

  const openMyHeadDrops = () => {
    setExtensionOptionsActiveTab({ tab: FelixTabs.MyHeadDrops });
  };

  const openAdvancedSettings = () => {
    setExtensionOptionsActiveTab({
      tab: FelixTabs.Settings,
      settingsTab: SettingsTabs.AdvanceSettings,
    });
  };

  const openShareSettings = () => {
    setExtensionOptionsActiveTab({
      tab: FelixTabs.Settings,
      settingsTab: SettingsTabs.ShareSettings,
    });
  };

  if (activeTab !== FelixPopupTabs.Navigation) {
    return null;
  }

  const showSettingsTab = localStorage.getItem("showSettingsTab") === "true";

  return (
    <>
      <img
        className="back-button"
        style={{
          maskImage: `url(${"https://cdn.dsmcdn.com/sfint/production/m-account-menu-back-button_1668535948888.svg"})`,
          WebkitMaskImage: `url(${"https://cdn.dsmcdn.com/sfint/production/m-account-menu-back-button_1668535948888.svg"})`,
        }}
        onClick={() => setActiveTab(FelixPopupTabs.MainMenu)}
      />

      <div className="popup-navigations">
        <CoolButton handleAction={openMyHeadDrops} text="Re-upload Images" />
        <CoolButton handleAction={openMyHeadDrops} text="My HeadDrops" />

        {showSettingsTab && (
          <>
            <CoolButton handleAction={openShareSettings} text="Cabinit-Share Settings" />
            <CoolButton handleAction={openAdvancedSettings} text="Advanced Settings" />
          </>
        )}
      </div>
    </>
  );
};

export { Navigation };
