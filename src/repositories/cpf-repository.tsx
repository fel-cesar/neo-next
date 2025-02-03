import { Cpf } from "@entities/cpf";



// COMMENT: The responsibility of the repository is to fetch the data from the data source (decide the data source),  in this case, we merged the repository and the data sources for simplicity.

export interface ICpfRepository {
  getCpf(): Promise<Cpf>;
  getCpfList(): Promise<Cpf[]>;
}


// example of repository mocked locally
export const cpfRepository: ICpfRepository = {
  async getCpf() {
    return new Cpf("02894283199");
  },

  async getCpfList() {
    return [new Cpf("02894283199"), new Cpf("02894283199")];
  },
};

// example of async repository mocked locally
export const testAsyncCpfRepository: ICpfRepository = {
  async getCpf() {
    const promise = new Promise<Cpf>((resolve) => {
      setTimeout(() => {
        resolve(new Cpf("02894283199"));
      }, 1000);
    });

    return promise;
  },

  async getCpfList() {
    const promise = new Promise<Cpf[]>((resolve) => {
      setTimeout(() => {
        resolve([new Cpf("02894283199"), new Cpf("02894283199")]);
      }, 1000);
    });

    return promise;
  },
};
