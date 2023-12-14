import { useState } from "react";
import { Input } from "../pages/bookingPages/RegisterPage";

type InputRegisterProp = Input & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  key: number;
};

function InputRegister(props: InputRegisterProp) {
  const [focused, serFocused] = useState(false);
  const { label, errorMessage, onChange, ...inputProps } = props;
  const handleFocus = () => {
    serFocused(true);
  };

  return (
    <div className="flex flex-col">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        required
        className="w-full border border-solid border-neutral-300 rounded-md h-10 pl-2 "
        onBlur={handleFocus}
        focused={focused.toString()}
      />

      <span className="text-red-500 text-xs hidden">{errorMessage}</span>
    </div>
  );
}

export default InputRegister;
