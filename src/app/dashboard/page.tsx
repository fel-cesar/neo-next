"use client";
// import { Button } from "@/components/ui/button";
import { cpfService } from "@/services/cpf-service";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Cpf } from "@/entities/cpf";
import BlockCpfCheckbox from "./checkbox";
import AddCpfButton from "./add-cpf-button";

export default function Dashboard() {
  return (
    <div>
      <AddCpfButton />
      <CpfList></CpfList>
    </div>
  );
}

function CpfList() {
  const [cpfList, setCpfList] = useState<Cpf[]>([]);

  useEffect(() => {
    const fetchCpfList = async () => {
      const data = await cpfService.getCpfList();
      setCpfList(data);
    };

    fetchCpfList();
  }, []);

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
        {cpfList.map((cpf) => {
          return (
            <TableRow key={cpf.value}>
              <TableCell className="font-medium">
                <BlockCpfCheckbox cpf={cpf} />
              </TableCell>
              <TableCell>{cpf.value}</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell className="text-right">
                {cpf.blocked ? "Blocked" : "Active"}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
