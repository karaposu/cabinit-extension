import { SettingsTabs } from "../Settings";
import { SettingsItem } from "../_components/SettingsItem/SettingsItem";
import { useSettings } from "../Settings.context";
import "./AdvanceSettings.scss";

interface AdvanceSettingsProps {
  activeSettingsTab: SettingsTabs;
}

const AdvanceSettings = ({ activeSettingsTab }: AdvanceSettingsProps) => {
  if (activeSettingsTab !== SettingsTabs.AdvanceSettings) {
    return null;
  }

  const {
    advanceSettings,
    handleSaveAdvanceSettings,
    setSkinColorTransfer,
    setHeadOrientation,
    setHairTransfer,
    setImageSizeFilter,
    setShowResetButton,
  } = useSettings();
  const { skinColorTransfer, headOrientation, hairTransfer, imageSizeFilter, showResetButton } = advanceSettings;

  return (
    <div className="advance-settings">
      <h1 className="section-name">Advance Settings</h1>
      <SettingsItem
        labelText="Skin-Color-Transfer"
        value={skinColorTransfer}
        onColor="#A8DF8E"
        handleToggle={setSkinColorTransfer}
      />
      <SettingsItem
        labelText="Head-Orientation"
        value={headOrientation}
        onColor="#A8DF8E"
        handleToggle={setHeadOrientation}
      />
      <SettingsItem labelText="Hair-Transfer" value={hairTransfer} onColor="#A8DF8E" handleToggle={setHairTransfer} />

      <div className="image-size-filter">
        <p>Image Size Filter Height </p>
        <input
          type="number"
          value={imageSizeFilter.height}
          onChange={(e) =>
            setImageSizeFilter({
              ...imageSizeFilter,
              height: parseInt(e.target.value),
            })
          }
        />
      </div>

      <div className="image-size-filter">
        <p>Image Size Filter Width </p>
        <input
          type="number"
          value={imageSizeFilter.width}
          onChange={(e) =>
            setImageSizeFilter({
              ...imageSizeFilter,
              width: parseInt(e.target.value),
            })
          }
        />
      </div>

      <SettingsItem
        labelText="Show Reset Button"
        value={showResetButton}
        onColor="#A8DF8E"
        handleToggle={setShowResetButton}
      />

      <button className="save-button" onClick={handleSaveAdvanceSettings}>
        <p>Save</p>
      </button>
    </div>
  );
};

export { AdvanceSettings };
