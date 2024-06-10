import { Switch } from "../Switch/Switch";
import "./SettingsItem.scss";

interface SettingsItemProps {
  labelText: string;
  value: boolean;
  onColor: string;
  handleToggle: (value: boolean) => void;
}

const SettingsItem = ({ labelText, value, onColor, handleToggle }: SettingsItemProps) => {
  return (
    <div className="settings-item">
      <p>{`${labelText}:`}</p>
      <Switch isOn={value} onColor={onColor} handleToggle={() => handleToggle(!value)} htmlFor={labelText} />
    </div>
  );
};

export { SettingsItem };
