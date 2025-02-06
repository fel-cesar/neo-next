import { Switch } from "@/components/ui/switch";
import { TableCell } from "@/components/ui/table";
import { Cnpj } from "@/entities/cnpj";
import { Cpf } from "@/entities/cpf";
import { IService } from "@/services/interfaces";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export interface BlockStatusTableCellProps {
  cpf: Cpf;
  service: IService<Cpf | Cnpj>;
  onSwitch: () => void;
}

export default function BlockStatusTableCell({
  cpf,
  service,
  onSwitch,
}: BlockStatusTableCellProps) {
  const [checked, setChecked] = useState(cpf.blocked);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setChecked(cpf.blocked);
  }, [cpf.blocked]);

  const handleChange = useCallback(
    async (newChecked: boolean) => {
      setLoading(true);
      try {
        await service.switchBlock({ id: cpf.id, block: newChecked });
        await onSwitch();
        setChecked(newChecked);
      } catch (error) {
        console.log("Error blocking/unblocking CPF:", error);
        toast.error(`Error ${newChecked ? "blocking" : "unblocking"} CPF.`);
      } finally {
        setLoading(false);
      }
    },
    [cpf.id, service, onSwitch]
  );

  return (
    <TableCell className="bg-black flex items-center justify-between px-2 py-2 gap-4">
      <span className="text-white">{checked ? "Blocked" : "Active"}</span>
      <Switch
        className="transition-colors duration-200 data-[state=checked]:bg-red-700"
        checked={checked}
        onCheckedChange={handleChange}
        disabled={loading}
        aria-disabled={loading}
      />
    </TableCell>
  );
}
