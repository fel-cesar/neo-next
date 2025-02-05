// "use client";
import { Switch } from "@/components/ui/switch";
import { Cpf } from "@/entities/cpf";
import { cpfService } from "@/services/cpf-service";
import { useState, useEffect } from "react";

export interface BlockCpfCheckboxProps {
  cpf: Cpf;
}
export default function BlockCpfCheckbox(props: BlockCpfCheckboxProps) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChecked(props.cpf.blocked);
  }, [props.cpf.blocked]);

  async function handleChange(checked: boolean) {
    setLoading(true);
    await cpfService.switchBlockCpf({cpfId: props.cpf.id , block: checked });
    setLoading(false);
    setChecked(checked);
  }

  return <Switch className="data-[state=checked]:bg-red-700" checked={checked} onCheckedChange={handleChange}  disabled={loading} aria-readonly/>;
}
