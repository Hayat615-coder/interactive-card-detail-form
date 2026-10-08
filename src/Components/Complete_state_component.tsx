import icon_complete from "../assets/icon-complete.svg";

type CompleteStateProps = {
  onReset: () => void;
};

const Complete_state_component = ({ onReset }: CompleteStateProps) => {
  return (
    <div
      className="flex w-full max-w-md flex-col items-center justify-center gap-6 text-center"
      aria-live="polite"
    >
      <img src={icon_complete} alt="Success icon" className="h-20 w-20" />
      <div className="space-y-2">
        <h2 className="text-3xl font-medium uppercase tracking-[0.14em] text-[#21092f]">
          Thank you!
        </h2>
        <p className="text-[#8e8593]">We’ve added your card details</p>
      </div>
      <button
        type="button"
        onClick={onReset}
        className="w-full rounded-xl bg-[#21092f] px-4 py-4 text-base font-semibold text-white transition hover:opacity-90"
      >
        Continue
      </button>
    </div>
  );
};

export default Complete_state_component;
