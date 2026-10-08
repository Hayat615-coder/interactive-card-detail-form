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
      className="relative min-h-[520px] w-full max-w-[600px] flex-1 max-[980px]:min-h-[360px]"
      aria-label="Credit card preview"
    >
      <div className="absolute left-0 top-20 z-[2] h-[245px] w-[447px] overflow-hidden rounded-[18px] shadow-[0_30px_50px_rgba(31,12,46,0.22)] max-[980px]:left-[18px] max-[980px]:top-[58px] max-[980px]:h-[175px] max-[980px]:w-[min(85vw,320px)]">
        <img
          src={bg_card_front}
          alt="Credit card front background"
          className="block h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-between px-8 pb-6 pt-7 text-white max-[980px]:px-[22px] max-[980px]:pb-[18px] max-[980px]:pt-5">
          <div className="flex items-center justify-start">
            <img src={card_logo} alt="Card logo" className="h-auto w-[86px] max-[980px]:w-16" />
          </div>
          <div className="text-[clamp(1.4rem,2vw,2rem)] uppercase leading-[1.4] tracking-[0.22em] max-[980px]:text-[1.3rem] max-[980px]:tracking-[0.12em]">
            {cardNumber}
          </div>
          <div className="flex items-center justify-between gap-6 text-[0.8rem] uppercase tracking-[0.15em] max-[980px]:text-[0.68rem] max-[980px]:tracking-[0.08em]">
            <span className="inline-block min-w-0">{cardholderName}</span>
            <span className="inline-block min-w-0">{expiry}</span>
          </div>
        </div>
      </div>

      <div className="absolute left-[90px] top-[270px] z-[1] h-[245px] w-[447px] overflow-hidden rounded-[18px] shadow-[0_30px_50px_rgba(31,12,46,0.22)] max-[980px]:left-[72px] max-[980px]:top-40 max-[980px]:h-[175px] max-[980px]:w-[min(85vw,320px)]">
        <img
          src={bg_card_back}
          alt="Credit card back background"
          className="block h-full w-full object-cover"
        />
        <span className="absolute right-[52px] top-[108px] text-base tracking-[0.1em] text-white max-[980px]:right-[34px] max-[980px]:top-[78px] max-[980px]:text-[0.9rem]">
          {formValues.cvc || "000"}
        </span>
      </div>
    </div>
  );
};

export default Card_component;
