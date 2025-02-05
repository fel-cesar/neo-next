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

export default function CustomTableRow({ cpf, service }: { cpf: Cpf, service: IService<Cpf | Cnpj> }) {
  return (
    <TableRow key={cpf.value}>
      <BlockStatusTableCell cpf={cpf} service={service} />
      <TableCell>{cpf.value}</TableCell>
      <TableCell>John Doe</TableCell>
      <TableCell>
        <TableRowMenu cpf={cpf} service={service} />
      </TableCell>
    </TableRow>
  );
}

function TableRowMenu({ cpf, service }: { cpf: Cpf, service: IService<Cpf | Cnpj> }) {
  async function handleDelete() {
    try {
      await service.delete(cpf.id);
      console.log("delete");
    } catch (error) {
      console.log(error);
      toast.error(`There was an error deleting the CPF "${cpf.value}"`);
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
