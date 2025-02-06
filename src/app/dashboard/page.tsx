"use client";
import { Card } from "@/components/ui/card";
import { Cnpj } from "@/entities/cnpj";
import { Cpf } from "@/entities/cpf";
import { cnpjService } from "@/services/cnpj-service";
import { cpfService } from "@/services/cpf-service";
import { useEffect, useState } from "react";
import DynamicTabs from "./components/dynamic-tab";
import ServerStatusCard from "./components/server-status-card";
import TaxNumberSection from "./components/tax-number-section";

export default function Dashboard() {
  const [cpfList, setCpfList] = useState<Cpf[]>([]);
  const [cnpjList, setCnpjList] = useState<Cnpj[]>([]);

  async function refresh() {
    await fetchCpfList();
    await fetchCnpjList();
  }

  const fetchCpfList = async () => {
    const data = await cpfService.getList({});
    setCpfList(data);
  };

  const fetchCnpjList = async () => {
    const data = await cnpjService.getList({});
    setCnpjList(data);
  };

  useEffect(() => {
    fetchCpfList();
    fetchCnpjList();
  }, []);

  return (
    <div className="flex flex-col bg-gray-200 h-screen">
      <div className="flex justify-center h-full pb-8">
        <Card className="p-4">
          <DynamicTabs
            tabs={[
              {
                label: "CPF",
                value: "cpf",
                content: (
                  <TaxNumberSection
                    list={cpfList}
                    setList={setCpfList}
                    service={cpfService}
                    onRowChange={refresh}
                    label="CPF"
                  />
                ),
              },
              {
                label: "CNPJ",
                value: "cnpj",
                content: (
                  <TaxNumberSection
                    list={cnpjList}
                    setList={setCnpjList}
                    service={cnpjService}
                    onRowChange={refresh}
                    label="CNPJ"
                  />
                ),
              },
              {
                label: "Server",
                value: "server",
                content: <ServerStatusCard />,
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}

