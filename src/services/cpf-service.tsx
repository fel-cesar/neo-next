import { Cpf } from "@/entities/cpf";
import { cpfRepository } from "@repositories/cpf-repository";

export const cpfService = {
  async createCpf(cpfValue: string): Promise<Cpf> {
    const createdObject = await cpfRepository.createCpf(cpfValue);
    // COMMENT: validation is made at the entity level
    // if (!cpf.getValue()) throw new Error("Invalid CPF data");
    return createdObject;
  },

  async deleteCpf(cpfId: string): Promise<void> {
    await cpfRepository.deleteCpf(cpfId);
  },

  async getCpfList({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }): Promise<Cpf[]> {
    const cpfList = await cpfRepository.getCpfList({
      query,
      blocked,
      ordering,
    });
    return cpfList;
  },

  async switchBlockCpf({
    cpfId,
    block,
  }: {
    cpfId: string;
    block: boolean;
  }): Promise<boolean> {
    const blockStatus = await cpfRepository.blockCpf({
      cpfId,
      shouldBlock: block,
    });
    return blockStatus;
  },
};
