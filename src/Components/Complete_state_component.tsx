import icon_complete from "../assets/icon-complete.svg";
import bg_desktop_main from "../assets/bg-main-desktop.png";

type CompleteStateProps = {
  onReset: () => void;
};

const Complete_state_component = ({ onReset }: CompleteStateProps) => {
  return (
    <div className="flex flex-row " aria-live="polite">
      <img src={bg_desktop_main} alt="Background illustration" />
      <div className="flex flex-col p-14 items-center justify-center">
        <img src={icon_complete} alt="Success icon" className="success-icon" />
        <h2>Thank you!</h2>
        <p>We’ve added your card details</p>
        <button type="button" className="submit-button" onClick={onReset}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Complete_state_component;
