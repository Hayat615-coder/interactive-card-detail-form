import { type ChangeEvent, type FormEvent, useState } from "react";

type FormValues = {
  cardholderName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

type FormComponentProps = {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
  onSubmitSuccess: () => void;
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
const FormComponent = ({
  formValues,
  setFormValues,
  onSubmitSuccess,
}: FormComponentProps) => {
  const [errors, setErrors] = useState<FormErrors>({});

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

    setFormValues((prev) => ({ ...prev, [name]: formattedValue }));

    if (errors[name as keyof FormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    onSubmitSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-[380px] rounded-2xl bg-transparent p-2"
    >
      <div className="flex flex-col gap-5">
        <label
          htmlFor="cardholderName"
          className="flex flex-col gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#21092f]"
        >
          Cardholder Name
          <input
            type="text"
            id="cardholderName"
            name="cardholderName"
            placeholder="e.g. Jane Appleseed"
            value={formValues.cardholderName}
            onChange={handleChange}
            className={`h-[52px] w-full rounded-[10px] border bg-white px-4 text-[1.05rem] text-[#21092f] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(33,9,47,0.5)] ${errors.cardholderName ? "border-[#ff5252] shadow-[0_0_0_3px_rgba(255,82,82,0.09)]" : "border-[#d5cfe1] focus:border-[#6448fe] focus:shadow-[0_0_0_3px_rgba(100,72,254,0.12)]"}`}
          />
          {errors.cardholderName && (
            <span className="text-xs text-[#ff5252]">
              {errors.cardholderName}
            </span>
          )}
        </label>

        <label
          htmlFor="cardNumber"
          className="flex flex-col gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#21092f]"
        >
          Card Number
          <input
            type="text"
            id="cardNumber"
            inputMode="numeric"
            name="cardNumber"
            placeholder="e.g. 1234 5678 9123 0000"
            value={formValues.cardNumber}
            onChange={handleChange}
            className={`h-[52px] w-full rounded-[10px] border bg-white px-4 text-[1.05rem] text-[#21092f] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(33,9,47,0.5)] ${errors.cardNumber ? "border-[#ff5252] shadow-[0_0_0_3px_rgba(255,82,82,0.09)]" : "border-[#d5cfe1] focus:border-[#6448fe] focus:shadow-[0_0_0_3px_rgba(100,72,254,0.12)]"}`}
          />
          {errors.cardNumber && (
            <span className="text-xs text-[#ff5252]">{errors.cardNumber}</span>
          )}
        </label>

        <div className="grid grid-cols-[1.2fr_1fr] gap-4 max-[420px]:grid-cols-1">
          <label className="flex min-w-0 flex-col gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#21092f]">
            Exp. Date
            <div className="grid grid-cols-2 gap-[10px]">
              <input
                type="text"
                inputMode="numeric"
                name="expMonth"
                placeholder="MM"
                maxLength={2}
                value={formValues.expMonth}
                onChange={handleChange}
                className={`h-[52px] w-full rounded-[10px] border bg-white px-3 text-[1.05rem] text-[#21092f] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(33,9,47,0.5)] ${errors.expMonth ? "border-[#ff5252] shadow-[0_0_0_3px_rgba(255,82,82,0.09)]" : "border-[#d5cfe1] focus:border-[#6448fe] focus:shadow-[0_0_0_3px_rgba(100,72,254,0.12)]"}`}
              />
              <input
                type="text"
                inputMode="numeric"
                name="expYear"
                placeholder="YY"
                maxLength={2}
                value={formValues.expYear}
                onChange={handleChange}
                className={`h-[52px] w-full rounded-[10px] border bg-white px-3 text-[1.05rem] text-[#21092f] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(33,9,47,0.5)] ${errors.expYear ? "border-[#ff5252] shadow-[0_0_0_3px_rgba(255,82,82,0.09)]" : "border-[#d5cfe1] focus:border-[#6448fe] focus:shadow-[0_0_0_3px_rgba(100,72,254,0.12)]"}`}
              />
            </div>
            {(errors.expMonth || errors.expYear) && (
              <span className="text-xs text-[#ff5252]">
                {errors.expMonth || errors.expYear}
              </span>
            )}
          </label>

          <label
            htmlFor="cvc"
            className="flex min-w-0 flex-col gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-[#21092f]"
          >
            CVC
            <input
              type="text"
              id="cvc"
              inputMode="numeric"
              name="cvc"
              placeholder="e.g. 123"
              maxLength={3}
              value={formValues.cvc}
              onChange={handleChange}
              className={`h-[52px] w-full rounded-[10px] border bg-white px-3 text-[1.05rem] text-[#21092f] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[rgba(33,9,47,0.5)] ${errors.cvc ? "border-[#ff5252] shadow-[0_0_0_3px_rgba(255,82,82,0.09)]" : "border-[#d5cfe1] focus:border-[#6448fe] focus:shadow-[0_0_0_3px_rgba(100,72,254,0.12)]"}`}
            />
            {errors.cvc && (
              <span className="text-xs text-[#ff5252]">{errors.cvc}</span>
            )}
          </label>
        </div>

        <button
          type="submit"
          className="mt-1 h-[52px] w-full cursor-pointer rounded-[10px] border-0 bg-[#21092f] text-base font-semibold text-white transition-[transform,opacity] duration-200 hover:-translate-y-px hover:opacity-[0.96]"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default FormComponent;
