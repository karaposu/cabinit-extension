import { setExtensionOptionsActiveTab, useRouter } from "./router";
import { FelixTabs } from "./NavigationSection-types";
import cn from "classnames";
import "./NavigationSection.scss";
import { useSettings } from "../tab-settings/Settings.context";
import { DemoPageUrl } from "../../../../configs/configs";

const NavigationSectionItems = [FelixTabs.Settings, FelixTabs.MyHeadDrops, FelixTabs.DemoPage, FelixTabs.FelixSites];

interface NavigationSectionItemProps {
  tab: FelixTabs;
  activeTab: FelixTabs;
  setActiveTab: (tab: FelixTabs) => void;
}

const NavigationSectionItem = ({ tab, activeTab, setActiveTab }: NavigationSectionItemProps) => {
  const { showSettingsTab } = useSettings();

  if (!showSettingsTab && tab === FelixTabs.Settings) {
    return null;
  }

  const handleActiveTab = () => {
    if (tab === FelixTabs.DemoPage) {
      window.location.href = `${DemoPageUrl}?extensionId=${chrome.runtime.id}&showSettingsTab=${showSettingsTab}`;
    }

    setActiveTab(tab);
    setExtensionOptionsActiveTab({ tab, redirectExtensionOptionPage: false });
  };

  return (
    <div
      className={cn("navigation-section__item", activeTab === tab && "navigation-section__item--active")}
      onClick={handleActiveTab}
    >
      <span>{tab}</span>
    </div>
  );
};

const NavigationSections = () => {
  const { setActiveTab, activeTab } = useRouter();
  return (
    <div className="navigation-section">
      {NavigationSectionItems.map((item, index) => {
        return (
          <NavigationSectionItem
            key={index}
            tab={item as FelixTabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        );
      })}
    </div>
  );
};

export { NavigationSections };
