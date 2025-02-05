import { Cnpj, CnpjEntity } from "@/entities/cnpj";

export interface ICnpjRepository {
  createCnpj(value: string): Promise<Cnpj>;
  deleteCnpj(cnpjId: string): Promise<void>;
  getCnpjList({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }): Promise<Cnpj[]>;
  blockCnpj({
    cnpjId,
    shouldBlock,
  }: {
    cnpjId: string;
    shouldBlock: boolean;
  }): Promise<boolean>;
}

export const cnpjRepository: ICnpjRepository = {
  async createCnpj(value: string): Promise<Cnpj> {
    const res = await fetch(`http://localhost:3000/api/cnpj`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cnpj: value }),
    });
    if (res.status !== 201) {
      throw new Error("Error creating CNPJ");
    }
    return new CnpjEntity(await res.json()).toJsonObject();
  },

  async deleteCnpj(cnpjId: string) {
    const res = await fetch(`http://localhost:3000/api/cnpj/${cnpjId}`, {
      method: "DELETE",
    });

    if (res.status !== 204) {
      throw new Error("Error deleting CNPJ");
    }
  },

  async getCnpjList({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }) {
    try {
      const url = new URL("http://localhost:3000/api/cnpj");
      if (query) {
        url.searchParams.append("query", query);
      }
      if (blocked) {
        url.searchParams.append("blocked", blocked.toString());
      }
      if (ordering) {
        url.searchParams.append("ordering", ordering);
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.status !== 200) {
        throw new Error("Error fetching CNPJs");
      }

      return data.map((cnpj: Cnpj) => new CnpjEntity(cnpj).toJsonObject());
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  },

  async blockCnpj({
    cnpjId,
    shouldBlock,
  }: {
    cnpjId: string;
    shouldBlock: boolean;
  }): Promise<boolean> {
    const res = await fetch(`http://localhost:3000/api/cnpj/${cnpjId}`, {
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
