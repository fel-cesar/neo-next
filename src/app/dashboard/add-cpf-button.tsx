import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEventHandler, forwardRef, useState } from "react";
import { InputMask } from "@react-input/mask";
import { cpfService } from "@/services/cpf-service";
import { toast } from "sonner";

interface CustomInputProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
}

// eslint-disable-next-line react/display-name
const customMaskedInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ onChange }, forwardedRef) => {
    return <Input ref={forwardedRef} id="custom-input" onChange={onChange} />;
  }
);

export default function AddCpfButton() {
  const [open, setOpen] = useState(false);
  const [cpfValue, setCpfValue] = useState("");
  const [loading, setLoading] = useState(false);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCpfValue(e.target.value.replace(/\D/g, ""));
  }

  async function handleCreateCpf() {
    try {
      setLoading(true);
      await cpfService.create(cpfValue);
      setLoading(false);
      setOpen(false);
      toast.success(`CPF "${cpfValue} was created successfully`);
    } catch (error) {
      console.log(error);
      toast.error(`There was an error creating the CPF "${cpfValue}"`);
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open}>
      <Button onClick={() => setOpen(true)}>Add CPF</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new CPF</AlertDialogTitle>
          <AlertDialogDescription>
            Please enter the CPF you want to add.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">CPF</Label>
          <InputMask
            component={customMaskedInput}
            mask="___.___.___-__"
            replacement={{ _: /\d/ }}
            onChange={handleOnChange}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCreateCpf}
            disabled={loading || cpfValue?.length !== 11}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
