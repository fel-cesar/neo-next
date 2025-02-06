import { Input } from "@/components/ui/input";
import { Cnpj } from "@/entities/cnpj";
import { Cpf } from "@/entities/cpf";
import { IService } from "@/services/interfaces";
import React, { useState, useEffect } from "react";

export default function DebounceInput({
  setList,
  placeholder,
  service,
}: {
  setList: React.Dispatch<React.SetStateAction<Cpf[]>>;
  placeholder: string;
  service: IService<Cpf | Cnpj>;
}) {
  const [query, setQuery] = useState(""); // The search query typed by user

  useEffect(() => {
    const fetchCpfList = async () => {
      const data = await service.getList({
        query,
      });
      setList(data);
    };

    // Set a timeout to update debounced value after 500ms
    const handler = setTimeout(async () => {
      await fetchCpfList();
    }, 500);

    // Cleanup the timeout if `query` changes before 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [query, setList, service]);

  return (
    <Input
      className="w-80"
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
