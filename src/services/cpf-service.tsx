import { cpfRepository } from "@repositories/cpf-repository";
import { Cpf } from "@entities/cpf";


export const cpfService = {
  async getCpf():Promise<Cpf> {
    const cpf = await cpfRepository.getCpf();
    // COMMENT: validation is made at the entity level
    // if (!cpf.getValue()) throw new Error("Invalid CPF data");
    return cpf;
  },


  // TODO: we should have parameters like paging, sorting, filtering, etc.
  async getCpfList(): Promise<Cpf[]> {
    const cpfList = await cpfRepository.getCpfList();
    // COMMENT: validation is made at the entity level
    // if (!cpfList.length) throw new Error("Invalid CPF data");
    return cpfList;
  },
};
