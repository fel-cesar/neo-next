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
import { cpfService } from "@/services/cpf-service";
import { toast } from "sonner";
import CustomMaskedInput from "@/components/ui/custom-masked-input";

CustomMaskedInput.displayName = "CustomMaskedInput";

export default function AddCpfButton({ onCreate }: { onCreate: () => void }) {
  const [open, setOpen] = useState(false);
  const [cpfValue, setCpfValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCpfValue(e.target.value.replace(/\D/g, ""));
  };

  const handleCreateCpf = async () => {
    if (cpfValue.length !== 11) return;

    try {
      setLoading(true);
      await cpfService.create(cpfValue);
      await onCreate();
      toast.success(`CPF "${cpfValue}" was created successfully.`);
      setOpen(false);
    } catch (error) {
      console.log(error); // This is expected.
      toast.error(
        `Error creating CPF "${cpfValue}": ${
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
      onOpenChange={(state) => !state && setCpfValue("")}
    >
      <Button onClick={() => setOpen(true)}>Add CPF</Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add new CPF</AlertDialogTitle>
          <AlertDialogDescription>
            Enter the CPF you want to add.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="cpf">CPF</Label>
          <InputMask
            component={CustomMaskedInput}
            mask="___.___.___-__"
            replacement={{ _: /\d/ }}
            onChange={handleOnChange}
            id="cpf"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleCreateCpf}
            disabled={loading || cpfValue.length !== 11}
          >
            {loading ? "Processing..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
