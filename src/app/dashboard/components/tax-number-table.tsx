import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cnpj } from "@/entities/cnpj";
import { Cpf } from "@/entities/cpf";
import { IService } from "@/services/interfaces";
import CustomTableRow from "./custom-table-row";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TaxNumberTable({
  list,
  service,
  label,
  onRowChange,
}: {
  list: Cpf[] | Cnpj[];
  service: IService<Cnpj | Cpf>;
  label: string;
  onRowChange: () => void;
}) {
  return (
    <ScrollArea
      // className=" rounded-md border h-"
      // containerClassname="h-fit max-h-80 overflow-y-auto relative"
      // className=""
      type="scroll"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <div className="text-black font-bold">Block Status</div>
            </TableHead>
            <TableHead className="text-black font-bold">{label}</TableHead>
            <TableHead className="text-black font-bold">Name</TableHead>
            <TableHead className="text-black font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((cpf) => {
            return (
              <CustomTableRow
                key={cpf.value}
                cpf={cpf}
                service={service}
                onChange={onRowChange}
              />
            );
          })}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
