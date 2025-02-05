// "use client";
import { Switch } from "@/components/ui/switch";
import { TableCell } from "@/components/ui/table";
import { Cnpj } from "@/entities/cnpj";
import { Cpf } from "@/entities/cpf";
import { IService } from "@/services/interfaces";
import { useState, useEffect } from "react";

export interface BlockStatusTableCellProps {
  cpf: Cpf;
  service: IService<Cpf | Cnpj>;
}
export default function BlockStatusTableCell(props: BlockStatusTableCellProps) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChecked(props.cpf.blocked);
  }, [props.cpf.blocked]);

  async function handleChange(checked: boolean) {
    setLoading(true);
    await props.service.switchBlock({ id: props.cpf.id, block: checked });
    setLoading(false);
    setChecked(checked);
  }

  return (
    <TableCell className="flex gap-4 font-medium">
      {checked ? "Blocked" : "Active"}
      <Switch
        className="data-[state=checked]:bg-red-700"
        checked={checked}
        onCheckedChange={handleChange}
        disabled={loading}
        aria-readonly
      />
    </TableCell>
  );
}
