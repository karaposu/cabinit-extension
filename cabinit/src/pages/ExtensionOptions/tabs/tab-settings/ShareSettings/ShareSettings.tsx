import { useEffect, useState } from "react";
import { SettingsTabs } from "../Settings";
import { SettingsItem } from "../_components/SettingsItem/SettingsItem";
import "./ShareSettings.scss";

interface ShareSettingsProps {
  activeSettingsTab: SettingsTabs;
}

const ShareSettings = ({ activeSettingsTab }: ShareSettingsProps) => {
  if (activeSettingsTab !== SettingsTabs.ShareSettings) {
    return null;
  }

  const [isIncludeOriginalImage, setIsIncludeOriginalImage] = useState(false);
  const [isIncludeOroductQRCode, setIsIncludeOroductQRCode] = useState(false);
  const [isIncludeHeaddropeQRCode, setIsIncludeHeaddropeQRCode] = useState(false);

  const shareSettings = {
    isIncludeOriginalImage,
    isIncludeOroductQRCode,
    isIncludeHeaddropeQRCode,
  };

  const handleSaveShareSettings = async () => {
    await chrome.storage.local.set({
      shareSettings,
    });
  };

  useEffect(() => {
    chrome.storage.local.get(["shareSettings"], function (result) {
      console.log("Value currently is " + result.shareSettings);
      setIsIncludeOriginalImage(result.shareSettings.isIncludeOriginalImage);
      setIsIncludeOroductQRCode(result.shareSettings.isIncludeOroductQRCode);
      setIsIncludeHeaddropeQRCode(result.shareSettings.isIncludeHeaddropeQRCode);
    });
  }, []);

  return (
    <div className="share-settings">
      <h1 className="section-name">Share Settings</h1>

      <p>You can customize how your shared felix-images look</p>

      <div className="share-settings-context">
        <img src="/images/Share-settings.png" alt="share-settings" />
        <div className="setting-items">
          <SettingsItem
            labelText="Include-Original-Image"
            value={isIncludeOriginalImage}
            onColor="#8DDFCB"
            handleToggle={setIsIncludeOriginalImage}
          />

          <SettingsItem
            labelText="Include-QR-code-of-the-product"
            value={isIncludeOroductQRCode}
            onColor="#8DDFCB"
            handleToggle={setIsIncludeOroductQRCode}
          />

          <SettingsItem
            labelText="Include-QR-code-of-your-headdrope"
            value={isIncludeHeaddropeQRCode}
            onColor="#8DDFCB"
            handleToggle={setIsIncludeHeaddropeQRCode}
          />

          <button className="save-button" onClick={handleSaveShareSettings}>
            <p>Save</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export { ShareSettings };
