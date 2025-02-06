import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableRow, TableCell } from "@/components/ui/table";
import BlockStatusTableCell from "./block-status-table-cell";
import { Cpf } from "@/entities/cpf";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IService } from "@/services/interfaces";
import { Cnpj } from "@/entities/cnpj";

export default function CustomTableRow({
  cpf,
  service,
  onChange,
}: {
  cpf: Cpf;
  service: IService<Cpf | Cnpj>;
  onChange: () => void;
}) {
  return (
    <TableRow key={cpf.value}>
      <BlockStatusTableCell cpf={cpf} service={service} onSwitch={onChange} />
      <TableCell>{cpf.value}</TableCell>
      <TableCell>John Doe</TableCell>
      <TableCell>
        <TableRowMenu cpf={cpf} service={service} onSuccess={onChange} />
      </TableCell>
    </TableRow>
  );
}

function TableRowMenu({
  cpf,
  service,
  onSuccess,
}: {
  cpf: Cpf;
  service: IService<Cpf | Cnpj>;
  onSuccess: () => void;
}) {
  async function handleDelete() {
    try {
      await service.delete(cpf.id);
      await onSuccess();
    } catch (error) {
      console.error(error);
      toast.error(`There was an error deleting the tax number "${cpf.value}"`);
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
