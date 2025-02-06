import { Cpf } from "@/entities/cpf";
import { cpfRepository } from "@repositories/cpf-repository";
import { IService } from "./interfaces";
import { CpfValidator } from "@/entities/cpf.validator";

export const cpfService: IService<Cpf> = {
  name: "CPFService",
  mask: "___.___.___-__",
  async create(cpfValue: string): Promise<Cpf> {
    if (!CpfValidator.isValid(cpfValue)) throw new Error("Invalid CPF data");
    const createdObject = await cpfRepository.createCpf(cpfValue);

    return createdObject;
  },

  async delete(cpfId: string): Promise<void> {
    await cpfRepository.deleteCpf(cpfId);
  },

  async getList({
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

  async switchBlock({
    id,
    block,
  }: {
    id: string;
    block: boolean;
  }): Promise<boolean> {
    const blockStatus = await cpfRepository.blockCpf({
      cpfId: id,
      shouldBlock: block,
    });
    return blockStatus;
  },
};
