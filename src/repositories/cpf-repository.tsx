import { Cpf, CpfEntity } from "@/entities/cpf";

// COMMENT: The responsibility of the repository is to fetch the data from the data source (decide the data source),  in this case, we merged the repository and the data sources for simplicity.

export interface ICpfRepository {
  createCpf(value: string): Promise<Cpf>;
  deleteCpf(cpfId: string): Promise<void>;
  getCpfList(): Promise<Cpf[]>;
  blockCpf({
    cpfId,
    shouldBlock,
  }: {
    cpfId: string;
    shouldBlock: boolean;
  }): Promise<boolean>;
}

export const cpfRepository: ICpfRepository = {
  async createCpf(value: string): Promise<Cpf> {
    const res = await fetch(`http://localhost:3000/api/cpf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cpf: value }),
    });
    if (res.status !== 201) {
      throw new Error("Error creating CPF");
    }
    return new CpfEntity(await res.json()).toJsonObject();
  },

  async deleteCpf(cpfId: string) {
    const res = await fetch(`http://localhost:3000/api/cpf/${cpfId}`, {
      method: "DELETE",
    });

    if (res.status !== 204) {
      throw new Error("Error deleting CPF");
    }
  },
  async getCpfList() {
    try {
      const res = await fetch("http://localhost:3000/api/cpf");
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error("Error creating CPF");
      }

      return data.map((cpf: Cpf) => new CpfEntity(cpf).toJsonObject());
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  },

  async blockCpf({
    cpfId,
    shouldBlock,
  }: {
    cpfId: string;
    shouldBlock: boolean;
  }): Promise<boolean> {
    const res = await fetch(`http://localhost:3000/api/cpf/${cpfId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ blocked: shouldBlock }),
    });
    const blocked = (await res.json()).blocked;
    return blocked;
  },
};
