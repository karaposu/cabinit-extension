import { CoolButton } from "../../../../common/components/CoolButton/CoolButton";
import { ChromeStorageKeys } from "../../../../enum";
import { FelixTabs } from "../Router/NavigationSection-types";
import { useRouter, setExtensionOptionsActiveTab } from "../Router/router";
import { useSettings } from "../tab-settings/Settings.context";
import { demoImages } from "./DemoPage.constans";
import "./DemoPage.scss";

const DemoPage = () => {
  const useExternalDemoPage = true;
  if (useExternalDemoPage) {
    return null;
  }
  // ----------------------------------------------------------

  const { activeTab, setActiveTab } = useRouter();
  const { showExtensionOptionsOnboarding } = useSettings();

  if (activeTab !== FelixTabs.DemoPage) {
    return null;
  }

  const completeExtensionOptionsOnboarding = () => {
    chrome.storage.local.set({ [ChromeStorageKeys.ExtensionOptionsOnboardingIsActive]: false });
    setActiveTab(FelixTabs.FelixSites);
    setExtensionOptionsActiveTab({ tab: FelixTabs.FelixSites, redirectExtensionOptionPage: false });
  };

  return (
    <div className="demo-page">
      <h1 className="section-name">Demo Page</h1>
      <p>
        Please give Cabinit a try with these demo pictures. Check the results and upload different photos if you like.
      </p>
      <div className="images">
        {demoImages.map((image) => (
          <img className="image" src={image.src} alt={image.alt} key={image.alt} />
        ))}
      </div>

      {showExtensionOptionsOnboarding && (
        <div className="onboarding-next-button">
          <CoolButton handleAction={completeExtensionOptionsOnboarding} text="Next" />
          <p>Continue to Supported page!</p>
        </div>
      )}
    </div>
  );
};

export { DemoPage };
