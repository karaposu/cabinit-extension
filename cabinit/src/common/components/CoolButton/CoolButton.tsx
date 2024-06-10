import "./CoolButton.scss";

interface CoolButtonProps {
  handleAction: () => void;
  text: string;
}

const CoolButton = ({ handleAction, text }: CoolButtonProps) => {
  return (
    <button className="cool-button-pushable" role="button" onClick={handleAction}>
      <span className="cool-button-shadow"></span>
      <span className="cool-button-edge"></span>
      <span className="cool-button-front text">{text}</span>
    </button>
  );
};

export { CoolButton };
