import { Cnpj } from "@/entities/cnpj";
import { Cpf } from "@/entities/cpf";
import { ServerStatus } from "@/entities/server-status";

export interface IServerStatusRepository {
  getServerStatus(): Promise<ServerStatus>;
}

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

export interface ICpfRepository {
  createCpf(value: string): Promise<Cpf>;
  deleteCpf(cpfId: string): Promise<void>;
  getCpfList({
    query,
    blocked,
    ordering,
  }: {
    query?: string;
    blocked?: boolean;
    ordering?: "asc" | "desc";
  }): Promise<Cpf[]>;
  blockCpf({
    cpfId,
    shouldBlock,
  }: {
    cpfId: string;
    shouldBlock: boolean;
  }): Promise<boolean>;
}

