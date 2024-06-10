import "./Switch.scss";

interface SwitchProps {
  isOn: boolean;
  handleToggle: () => void;
  onColor: string;
  htmlFor: string;
}

const Switch = ({ isOn, handleToggle, onColor, htmlFor }: SwitchProps) => {
  return (
    <>
      <input
        checked={isOn}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={htmlFor}
        type="checkbox"
      />
      <label style={{ background: isOn ? onColor : "" }} className="react-switch-label" htmlFor={htmlFor}>
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export { Switch };
