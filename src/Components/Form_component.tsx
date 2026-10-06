import { useState } from "react";
import bg_desktop_main from "../assets/bg-main-desktop.png";
type FormValues = {
  cardholderName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
};
type FormErrors = Partial<Record<keyof FormValues, string>>;

const InitialFormValues: FormValues = {
  cardholderName: "Jane Appleseed",
  cardNumber: "0000 0000 0000 0000",
  expMonth: "00",
  expYear: "00",
  cvc: "000",
};
const validateForm = (formValues: FormValues) => {
  const nextErrors: FormErrors = {};

  if (!formValues.cardholderName.trim()) {
    nextErrors.cardholderName = "Cardholder name is required";
  } else if (
    !/^[a-zA-Z]+(\s[a-zA-Z]+)+$/.test(formValues.cardholderName.trim())
  ) {
    nextErrors.cardholderName = "Use first and last name";
  }

  if (!/^[0-9]{16}$/.test(formValues.cardNumber.replace(/\s/g, ""))) {
    nextErrors.cardNumber = "Card number must be 16 digits";
  }

  if (!/^(0?[1-9]|1[0-2])$/.test(formValues.expMonth)) {
    nextErrors.expMonth = "Invalid month";
  }

  if (!/^\d{2}$/.test(formValues.expYear)) {
    nextErrors.expYear = "Invalid year";
  } else {
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const enteredMonth = Number(formValues.expMonth || 0);
    const enteredYear = Number(formValues.expYear || 0);

    if (
      enteredYear < currentYear ||
      (enteredYear === currentYear && enteredMonth < currentMonth)
    ) {
      nextErrors.expYear = "Card has expired";
    }
  }

  if (!/^\d{3}$/.test(formValues.cvc)) {
    nextErrors.cvc = "CVC must be 3 digits";
  }

  return nextErrors;
};
const FormComponent = () => {
  const [formValue, setFormValue] = useState<FormValues>(InitialFormValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "cardNumber") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
        .slice(0, 19);
    }

    setFormValue((prev) => ({ ...prev, [name]: formattedValue }));

    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formValue);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
    } else {
      setErrors({});
      setIsSubmitted(true);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-y-14">
      <img src={bg_desktop_main} alt="Background illustration" />

      {isSubmitted ? (
        <div className="flex flex-col items-center p-6 gap-4">
          <h2 className="text-2xl font-bold uppercase tracking-widest">
            Thank You!
          </h2>
          <p className="text-gray-500">We've added your card details.</p>
          <button
            onClick={() => {
              setFormValue(InitialFormValues);
              setIsSubmitted(false);
            }}
            className="w-full rounded-lg bg-[hsl(278,68%,11%)] text-white p-4"
          >
            Continue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col p-6 gap-4 w-80">
          {/* Cardholder Name */}
          <label
            htmlFor="cardholderName"
            className="flex flex-col gap-1 text-xs font-semibold tracking-wider"
          >
            CARDHOLDER NAME
            <input
              type="text"
              id="cardholderName"
              name="cardholderName"
              placeholder="e.g. Jane Appleseed"
              value={formValue.cardholderName}
              onChange={handleChange}
              className={`border rounded-lg p-2 ${errors.cardholderName ? "border-red-500" : "border-gray-300"}`}
            />
          </label>
          {errors.cardholderName && (
            <span className="text-red-500 text-xs">
              {errors.cardholderName}
            </span>
          )}

          {/* Card Number */}
          <label
            htmlFor="cardNumber"
            className="flex flex-col gap-1 text-xs font-semibold tracking-wider"
          >
            CARD NUMBER
            <input
              type="text"
              id="cardNumber"
              inputMode="numeric"
              name="cardNumber"
              placeholder="e.g. 1234 5678 9123 0000"
              value={formValue.cardNumber}
              onChange={handleChange}
              className={`border rounded-lg p-2 ${errors.cardNumber ? "border-red-500" : "border-gray-300"}`}
            />
          </label>
          {errors.cardNumber && (
            <span className="text-red-500 text-xs">{errors.cardNumber}</span>
          )}

          {/* Expiry Date & CVC */}
          <div className="flex flex-row gap-4">
            <label className="flex flex-col gap-1 text-xs font-semibold tracking-wider flex-1">
              EXP. DATE (MM/YY)
              <div className="flex flex-row gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  name="expMonth"
                  placeholder="MM"
                  maxLength={2}
                  value={formValue.expMonth}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 w-1/2 ${errors.expMonth ? "border-red-500" : "border-gray-300"}`}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  name="expYear"
                  placeholder="YY"
                  maxLength={2}
                  value={formValue.expYear}
                  onChange={handleChange}
                  className={`border rounded-lg p-2 w-1/2 ${errors.expYear ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {(errors.expMonth || errors.expYear) && (
                <span className="text-red-500 text-xs mt-1">
                  {errors.expMonth || errors.expYear}
                </span>
              )}
            </label>

            <label
              htmlFor="cvc"
              className="flex flex-col gap-1 text-xs font-semibold tracking-wider flex-1"
            >
              CVC
              <input
                type="text"
                id="cvc"
                inputMode="numeric"
                name="cvc"
                placeholder="e.g. 123"
                maxLength={3}
                value={formValue.cvc}
                onChange={handleChange}
                className={`border rounded-lg p-2 ${errors.cvc ? "border-red-500" : "border-gray-300"}`}
              />
              {errors.cvc && (
                <span className="text-red-500 text-xs mt-1">{errors.cvc}</span>
              )}
            </label>
          </div>

          <button
            type="submit"
            className="border rounded-lg bg-[hsl(278,68%,11%)] text-white p-4 mt-2 hover:opacity-90 transition-opacity"
          >
            Confirm
          </button>
        </form>
      )}
    </div>
  );
};

export default FormComponent;
