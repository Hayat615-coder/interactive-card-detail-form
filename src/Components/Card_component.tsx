import bg_card_back from "../assets/bg-card-back.png";
import bg_card_front from "../assets/bg-card-front.png";
import card_logo from "../assets/card-logo.svg";

type CardProps = {
  formValues: {
    cardholderName: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvc: string;
  };
};

const Card_component = ({ formValues }: CardProps) => {
  const cardNumber = formValues.cardNumber || "0000 0000 0000 0000";
  const cardholderName = formValues.cardholderName || "Jane Appleseed";
  const expiry = `${formValues.expMonth || "00"}/${formValues.expYear || "00"}`;

  return (
    <div
      className="relative min-h-130 w-full max-w-350  flex-1 max-[61.25rem]:min-h-90"
      aria-label="Credit card preview"
    >
      <div className="absolute left-0 top-20 z-2 h-[15.3125rem] w-[27.9375rem] overflow-hidden rounded-[1.125rem] shadow-[0_1.875rem_3.125rem_rgba(31,12,46,0.22)] max-[61.25rem]:left-[1.125rem] max-[61.25rem]:top-[3.625rem] max-[61.25rem]:h-[10.9375rem] max-[61.25rem]:w-[min(85vw,20rem)]">
        <img
          src={bg_card_front}
          alt="Credit card front background"
          className="block h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-between px-8 pb-6 pt-7 text-white max-[61.25rem]:px-[1.375rem] max-[61.25rem]:pb-[1.125rem] max-[61.25rem]:pt-5">
          <div className="flex items-center justify-start">
            <img
              src={card_logo}
              alt="Card logo"
              className="h-auto w-[5.375rem] max-[61.25rem]:w-16"
            />
          </div>
          <div className="text-[clamp(1.4rem,2vw,2rem)] uppercase leading-[1.4] tracking-[0.1em] max-[980px]:text-[1.3rem] max-[980px]:tracking-[0.12em]">
            {cardNumber}
          </div>
          <div className="flex items-center justify-between gap-6 text-[0.8rem] uppercase tracking-[0.15em] max-[980px]:text-[0.68rem] max-[980px]:tracking-[0.08em]">
            <span className="inline-block min-w-0">{cardholderName}</span>
            <span className="inline-block min-w-0">{expiry}</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[5.625rem] top-[21.875rem] -z-1 h-[15.3125rem] w-[27.9375rem] overflow-hidden rounded-[1.125rem] shadow-[0_1.875rem_3.125rem_rgba(31,12,46,0.22)] max-[61.25rem]:left-[4.5rem] max-[61.25rem]:top-40 max-[61.25rem]:h-[10.9375rem] max-[61.25rem]:w-[min(85vw,20rem)]">
        <img
          src={bg_card_back}
          alt="Credit card back background"
          className="block h-full w-full object-cover"
        />
        <span className="absolute right-[3.25rem] top-[6.75rem] text-base tracking-[0.1em] text-white max-[61.25rem]:right-[2.125rem] max-[61.25rem]:top-[4.875rem] max-[61.25rem]:text-[0.9rem]">
          {formValues.cvc || "000"}
        </span>
      </div>
    </div>
  );
};

export default Card_component;
