import { ServerStatus } from "@/entities/server-status";
import { IServerStatusRepository } from "@/repositories/interfaces";


export const cpfService= {
  async getStatus(repository: IServerStatusRepository): Promise<ServerStatus> {
    const statusObject = await repository.getServerStatus();
    return statusObject;
  },

 
};
