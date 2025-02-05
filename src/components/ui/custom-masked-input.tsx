import { ChangeEventHandler, forwardRef } from "react";
import { Input } from "./input";

export interface CustomInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  id: string;
}

const CustomMaskedInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ onChange, ...props }, ref) => (
    <Input ref={ref} {...props} onChange={onChange} />
  )
);

CustomMaskedInput.displayName = "CustomMaskedInput";

export default CustomMaskedInput;
