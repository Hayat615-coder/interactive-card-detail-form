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
    <div className="card-stack" aria-label="Credit card preview">
      <div className="card card-front">
        <img
          src={bg_card_front}
          alt="Credit card front background"
          className="card-image"
        />
        <div className="card-overlay">
          <div className="card-top-row">
            <img src={card_logo} alt="Card logo" className="card-logo" />
          </div>
          <div className="card-number">{cardNumber}</div>
          <div className="card-meta">
            <span className="card-name">{cardholderName}</span>
            <span className="card-expiry">{expiry}</span>
          </div>
        </div>
      </div>

      <div className="card card-back">
        <img
          src={bg_card_back}
          alt="Credit card back background"
          className="card-image"
        />
        <span className="card-back-cvc">{formValues.cvc || "000"}</span>
      </div>
    </div>
  );
};

export default Card_component;
