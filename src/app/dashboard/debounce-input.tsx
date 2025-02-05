import { Input } from "@/components/ui/input";
import { Cpf } from "@/entities/cpf";
import { cpfService } from "@/services/cpf-service";
import React, { useState, useEffect } from "react";

export default function DebounceInput({
  setCpfList,
}: {
  setCpfList: React.Dispatch<React.SetStateAction<Cpf[]>>;
}) {
  const [query, setQuery] = useState(""); // The search query typed by user

  useEffect(() => {
    const fetchCpfList = async () => {
      const data = await cpfService.getList({
        query,
      });
      setCpfList(data);
    };

    // Set a timeout to update debounced value after 500ms
    const handler = setTimeout(async () => {
      await fetchCpfList();
    }, 500);

    // Cleanup the timeout if `query` changes before 500ms
    return () => {
      clearTimeout(handler);
    };
  }, [query, setCpfList]);

  return (
    <Input
      className="w-80"
      type="text"
      placeholder="type here the CPF to filter results"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
