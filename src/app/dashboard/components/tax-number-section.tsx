import { Cpf } from "@/entities/cpf";
import { Label } from "@/components/ui/label";
import DebounceInput from "./debounce-input";
import TaxNumberTable from "./tax-number-table";
import { IService } from "@/services/interfaces";
import { Cnpj } from "@/entities/cnpj";
import CreateTaxNumberButton from "./create-tax-number-button";
import CreateRandomNumberButton from "./create-random-number-button";

interface TaxNumberSectionArgs {
  setList: React.Dispatch<React.SetStateAction<Cpf[]>>;
  list: Cpf[];
  onRowChange: () => void;
  label: string;
  service: IService<Cpf | Cnpj>;
}

export default function TaxNumberSection({
  setList,
  list,
  onRowChange,
  label,
  service,
}: TaxNumberSectionArgs) {
  return (
    <div className="flex flex-col gap-4">
      <CreateTaxNumberButton
        onCreate={onRowChange}
        service={service}
        label={label}
      />
      <CreateRandomNumberButton service={service} onSuccess={onRowChange} />
      <div className="flex flex-col gap-1 bold">
        <Label>Filter by {label} </Label>
        <DebounceInput
          setList={setList}
          placeholder={label}
          service={service}
        />
      </div>
        <TaxNumberTable
          list={list}
          service={service}
          onRowChange={onRowChange}
          label={label}
        />
    </div>
  );
}
