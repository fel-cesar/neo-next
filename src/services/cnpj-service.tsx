import { Cnpj } from "@/entities/cnpj";
import { cnpjRepository } from "@repositories/cnpj-repository";
import { IService } from "./interfaces";
import { CnpjValidator } from "@/entities/cnpj.validator";

export const cnpjService: IService<Cnpj> = {
  name: "CNPJService",
  mask: "__.___.___/____-__",
  async create(cnpjValue: string): Promise<Cnpj> {
    if (!CnpjValidator.isValid(cnpjValue)) throw new Error("Invalid CNPJ data");

    const createdObject = await cnpjRepository.createCnpj(cnpjValue);
    return createdObject;
  },

  async delete(cnpjId: string): Promise<void> {
    await cnpjRepository.deleteCnpj(cnpjId);
  },

  async getList({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }): Promise<Cnpj[]> {
    const cnpjList = await cnpjRepository.getCnpjList({
      query,
      blocked,
      ordering,
    });
    return cnpjList;
  },

  async switchBlock({
    id,
    block,
  }: {
    id: string;
    block: boolean;
  }): Promise<boolean> {
    const blockStatus = await cnpjRepository.blockCnpj({
      cnpjId: id,
      shouldBlock: block,
    });
    return blockStatus;
  },
};
