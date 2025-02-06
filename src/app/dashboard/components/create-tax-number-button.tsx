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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { InputMask } from "@react-input/mask";
import { toast } from "sonner";
import CustomMaskedInput from "@/components/ui/custom-masked-input";
import { IService } from "@/services/interfaces";
import { Cpf } from "@/entities/cpf";
import { Cnpj } from "@/entities/cnpj";

CustomMaskedInput.displayName = "CustomMaskedInput";

export interface CreteTaxNumberButtonProps {
  onCreate: () => void;
  service: IService<Cpf | Cnpj>;
  label: string;
}

export default function CreteTaxNumberButton({
  onCreate,
  service,
  label,
}: CreteTaxNumberButtonProps) {
  const [open, setOpen] = useState(false);
  const [taxNumberValue, setTaxNumberValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // remove all non-digit characters from the input value
    setTaxNumberValue(e.target.value.replace(/\D/g, ""));
  };

  const handleCreateTaxNumber = async () => {
    try {
      setLoading(true);
      await service.create(taxNumberValue);
      await onCreate();
      toast.success(`${label} "${taxNumberValue}" was created successfully.`);
      setOpen(false);
    } catch (error) {
      console.log(error); // This is expected.
      toast.error(
        `Error creating ${label} "${taxNumberValue}": ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(state) => !state && setTaxNumberValue("")}
    >
      <Button onClick={() => setOpen(true)}>Add {label}</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new {label}</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the {label} you want to add.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor={label}>{label}</Label>
          <InputMask
            component={CustomMaskedInput}
            mask={service.mask}
            replacement={{ _: /\d/ }}
            onChange={handleOnChange}
            id={label}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateTaxNumber} disabled={loading}>
            {loading ? "Processing..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
