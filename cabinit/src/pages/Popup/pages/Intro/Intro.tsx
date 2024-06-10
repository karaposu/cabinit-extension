import "./Intro.scss";
import { useRouter } from "../Router/router";
import { FelixPopupTabs } from "../Navigation/Navigation.types";
import { FelixTabs } from "../../../ExtensionOptions/tabs/Router/NavigationSection-types";
import { setExtensionOptionsActiveTab } from "../../../ExtensionOptions/tabs/Router/router";

const Intro = () => {
  const { setActiveTab, activeTab } = useRouter();

  const handleClickNextButton = () => {
    chrome.storage.local.set({ isIntroSeen: true }, () => {
      setActiveTab(FelixPopupTabs.MainMenu);
    });

    setExtensionOptionsActiveTab({ tab: FelixTabs.MyHeadDrops });
  };

  if (activeTab !== FelixPopupTabs.Intro) {
    return null;
  }

  return (
    <div className="popup-intro">
      <p className="popup-text p-1">Hello, thanks for downloading Cabinit!</p>
      <p className="popup-text p-2">
      Cabinit is here to help you with your online shopping experience with it's innovative but simple try-on
        technology.
      </p>

      <img src="/images/Intro.png" alt="abbas" />

      <p className="popup-text p-3">
        All you need to do is complete a small setup process. After that Cabinit will recognize when you are in one of the
        Cabinit- enabled shopping websites and it will activate automatically.
      </p>

      <div className="button-wrapper">
        <button className="button-37" role="button" onClick={handleClickNextButton}>
          Next
        </button>
      </div>
    </div>
  );
};

export { Intro };
