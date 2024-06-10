import { FelixTabs } from "../Router/NavigationSection-types";
import { setExtensionOptionsActiveTab, useRouter } from "../Router/router";
import { HeadDropControlCenterItem } from "./Components/HeadDropControlCenterItem/HeadDropControlCenterItem";
import { HeadDropControlCenterItemFavorited } from "./Components/HeadDropControlCenterItemFavorited/HeadDropControlCenterItemFavorited";
import { useHeadDropsControlCenter } from "./HeadDropsControlCenter.context";
import useHeadDropItemOperations from "./Hooks/useHeadDropItemOperations";
import "./HeadDropsControlCenter.scss";
import { useSettings } from "../tab-settings/Settings.context";
import { CoolButton } from "../../../../common/components/CoolButton/CoolButton";
import { ChromeStorageKeys } from "../../../../enum";
import { DemoPageUrl } from "../../../../configs/configs";

export const HeadDropsControlCenter = () => {
  const { activeTab } = useRouter();
  const { myHeadDrops, favoritedHeadDrops, favoritedHeadDropNameList } = useHeadDropsControlCenter();
  const { resetHeadDropContext } = useHeadDropItemOperations();
  const { advanceSettings, showExtensionOptionsOnboarding, showSettingsTab } = useSettings();

  const showResetButton = advanceSettings.showResetButton;

  if (activeTab !== FelixTabs.MyHeadDrops) {
    return null;
  }

  return (
    <div className="my-head-drops">
      {favoritedHeadDropNameList.length > 0 && (
        <div className="favorited-headdrops headdrop-section">
          <h1 className="head-drop-title">Favorited HeadDrops</h1>
          <div className="head-drop-group">
            {favoritedHeadDrops.map((headDrop, index) => (
              <HeadDropControlCenterItemFavorited key={headDrop.name} index={index} headDrop={headDrop} />
            ))}
          </div>
        </div>
      )}

      <hr />

      <div className="my-headdrops headdrop-section">
        <h1 className="head-drop-title">My Head Drops</h1>
        <div className="head-drop-group">
          {myHeadDrops?.map((headDrop, index) => (
            <HeadDropControlCenterItem key={headDrop.name} index={index} headDrop={headDrop} type={"myHeadDrops"} />
          ))}
        </div>
      </div>

      {/* <h1 className="head-drop-title">Friend's Head Drops</h1>
      <div className="head-drop-group">
        {friendsHeadDrops.map((headDrop, index) => (
          <HeadDropControlCenterItem key={headDrop.name} index={index} headDrop={headDrop} type={"friendsHeadDrops"} />
        ))}
      </div> */}

      {showResetButton && (
        <button
          className="reset-head-drops-button"
          style={{ marginTop: "20px", position: "absolute", bottom: "20px" }}
          onClick={() => {
            resetHeadDropContext();
          }}
        >
          Reset HeadDrops
        </button>
      )}

      {showResetButton && (
        <button
          className="reset-extension-option-onboarding-button"
          style={{ marginTop: "20px", position: "absolute", bottom: "60px" }}
          onClick={() => {
            chrome.storage.local.set({ [ChromeStorageKeys.ExtensionOptionsOnboardingIsActive]: true });
          }}
        >
          Reset Extension Options Onboarding
        </button>
      )}

      {showExtensionOptionsOnboarding && (
        <div className="onboarding-next-button">
          <CoolButton
            handleAction={() => {
              chrome.storage.local.set({ [ChromeStorageKeys.ExtensionOptionsOnboardingIsActive]: false });
              setExtensionOptionsActiveTab({ tab: FelixTabs.FelixSites, redirectExtensionOptionPage: false });

              window.location.href = `${DemoPageUrl}?onboarding=true&extensionId=${chrome.runtime.id}&showSettingsTab=${showSettingsTab}`;
            }}
            text="Next"
          />
          <p>Continue to demo page!</p>
        </div>
      )}
    </div>
  );
};
