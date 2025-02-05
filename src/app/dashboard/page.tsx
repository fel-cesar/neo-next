"use client";
import { cpfService } from "@/services/cpf-service";
import { cnpjService } from "@/services/cnpj-service";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Cpf } from "@/entities/cpf";
import AddCpfButton from "./add-cpf-button";
import { Label } from "@/components/ui/label";
import DebounceInput from "./debounce-input";
import { Cnpj } from "@/entities/cnpj";
import CustomTableRow from "./custom-table-row";
import { IService } from "@/services/interfaces";

export default function Dashboard() {
  const [cpfList, setCpfList] = useState<Cpf[]>([]);
  const [cnpjList, setCnpjList] = useState<Cnpj[]>([]);

  useEffect(() => {
    const fetchCpfList = async () => {
      const data = await cpfService.getList({});
      setCpfList(data);
    };
    const fetchCnpjList = async () => {
      const data = await cnpjService.getList({});
      setCnpjList(data);
    };

    fetchCpfList();
    fetchCnpjList();
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      <div className="flex justify-end p-4">
        <AddCpfButton />
      </div>
      <div className="flex justify-center p-4 max-w-screen-sm">
        <Label> Filter by CPF: </Label>
        <DebounceInput setCpfList={setCpfList} />
      </div>
      <div className="flex">
        <CustomList list={cpfList} service={cpfService} />
        <CustomList list={cnpjList} service={cnpjService} />
      </div>
    </div>
  );
}

function CustomList({ list, service}: { list: Cpf[] | Cnpj[], service: IService<Cnpj | Cpf> }) {
  return (
    <Table className="min-w-screen-sm max-w-screen-sm items-center bg-slate-300 justify-self-center">
      <TableCaption>A list of Cpf`s</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">
            <div className="text-black font-bold">Block Status</div>
          </TableHead>
          <TableHead className="text-black font-bold">CPF</TableHead>
          <TableHead className="text-black font-bold">Name</TableHead>
          <TableHead className="text-black font-bold">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((cpf) => {
          return <CustomTableRow key={cpf.value} cpf={cpf} service={service} />;
        })}
      </TableBody>
    </Table>
  );
}
