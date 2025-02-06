import { Cpf } from "@/entities/cpf";
import { cpfRepository } from "@repositories/cpf-repository";
import { IService } from "./interfaces";
import { CpfValidator } from "@/entities/cpf.validator";
import { generateRandomCpf } from "@/lib/utils";

export const cpfService: IService<Cpf> = {
  name: "CPF",
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

  /**
   * Generates and adds a new valid CPF to the database.
   * @returns {Promise<Cpf>} The created CPF object.
   */
  async createRandom(): Promise<Cpf> {
    const generatedCpf = generateRandomCpf();

    if (!CpfValidator.isValid(generatedCpf)) {
      throw new Error("Generated CPF is invalid (unexpected).");
    }

    return await cpfRepository.createCpf(generatedCpf);
  },
};
