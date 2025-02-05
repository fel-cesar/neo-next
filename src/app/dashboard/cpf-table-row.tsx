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
import { cpfService } from "@/services/cpf-service";
import { toast } from "sonner";

export default function CpfTableRow({ cpf }: { cpf: Cpf }) {
  return (
    <TableRow key={cpf.value}>
      <BlockStatusTableCell cpf={cpf} />
      <TableCell>{cpf.value}</TableCell>
      <TableCell>John Doe</TableCell>
      <TableCell>
        <TableRowMenu cpf={cpf} />
      </TableCell>
    </TableRow>
  );
}

function TableRowMenu({ cpf }: { cpf: Cpf }) {
  async function handleDelete() {
    try {
      await cpfService.deleteCpf(cpf.id);
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
