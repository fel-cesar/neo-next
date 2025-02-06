// import { Button } from "@/components/ui/button";
// import { Cnpj } from "@/entities/cnpj";
// import { Cpf } from "@/entities/cpf";
// import { IService } from "@/services/interfaces";

// export default function createRandomNumberButton({label, service}: {label: string, service: IService<Cpf | Cnpj>}) {

//     return <Button> Random </Button>

// }

import { Button } from "@/components/ui/button";
import { IService } from "@/services/interfaces";
import { Cpf } from "@/entities/cpf";
import { Cnpj } from "@/entities/cnpj";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Props for the GenerateCpfCnpjButton component.
 */
interface GenerateCpfCnpjButtonProps {
  service: IService<Cpf | Cnpj>;
  onSuccess?: () => void;
}

/**
 * Button component to generate and create a CPF/CNPJ using the service.
 */
export default function CreateRandomNumberButton({
  service,
  onSuccess,
}: GenerateCpfCnpjButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const createdEntry = await service.createRandom();
      await onSuccess?.();
      toast.success(`${service.name} created: ${createdEntry.value}`);
    } catch (error) {
      console.error("Error generating CPF/CNPJ:", error);
      toast.error(`Failed to create ${service.name}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleGenerate} disabled={loading}>
      {loading ? "Generating..." : `Generate ${service.name}`}
    </Button>
  );
}
