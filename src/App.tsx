import { useState } from "react";

import Form_component from "./Components/Form_component";
import Complete_state_component from "./Components/Complete_state_component";
import Card_component from "./Components/Card_component";
import bg_desktop_main from "./assets/bg-main-desktop.png";
import bg_mobile_main from "./assets/bg-main-mobile.png";

type FormValues = {
  cardholderName: string;
  cardNumber: string;
  expMonth: string;
  expYear: string;
  cvc: string;
};

const initialFormValues: FormValues = {
  cardholderName: "Jane Appleseed",
  cardNumber: "0000 0000 0000 0000",
  expMonth: "00",
  expYear: "00",
  cvc: "000",
};

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);

  const handleReset = () => {
    setIsSubmitted(false);
    setFormValues(initialFormValues);
  };

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-[#f3f3f7] font-['Space_Grotesk',_'Segoe_UI',_sans-serif] text-[#21092f] antialiased">
      <img
        src={bg_desktop_main}
        alt="Background"
        className="pointer-events-none absolute left-0 top-0 h-full w-[32%] object-cover max-[980px]:hidden"
      />
      <img
        src={bg_mobile_main}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 hidden h-[240px] w-full object-cover max-[980px]:block"
      />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10 lg:px-12">
        {isSubmitted ? (
          <div className="flex min-h-[760px] w-[calc(100%-48px)] max-w-[1120px] items-center justify-center gap-20 max-[980px]:min-h-0 max-[980px]:w-full max-[980px]:max-w-[520px] max-[980px]:flex-col max-[980px]:gap-6 max-[980px]:px-4 max-[980px]:py-8 max-[420px]:px-3 max-[420px]:py-[18px]">
            <Card_component formValues={formValues} />
            <Complete_state_component onReset={handleReset} />
          </div>
        ) : (
          <div className="flex min-h-[760px] w-[calc(100%-48px)] max-w-[1120px] items-center justify-center gap-20 max-[980px]:min-h-0 max-[980px]:w-full max-[980px]:max-w-[520px] max-[980px]:flex-col max-[980px]:gap-6 max-[980px]:px-4 max-[980px]:py-8 max-[420px]:px-3 max-[420px]:py-[18px]">
            <Card_component formValues={formValues} />
            <Form_component
              formValues={formValues}
              setFormValues={setFormValues}
              onSubmitSuccess={() => setIsSubmitted(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
