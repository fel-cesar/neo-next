import { ServerStatus } from "@/entities/server-status";
import { IServerStatusRepository } from "./interfaces";

export const serverStatusRepository: IServerStatusRepository = {
  /**
   * @description Fetches server status data from the backend.
   * @returns {Promise<ServerStatus>} Server statistics including uptime, request count, and database health.
   * @throws {Error} Throws an error if the API request fails.
   */
  async getServerStatus(): Promise<ServerStatus> {
    try {
      const response = await fetch(`http://localhost:3000/api/stats`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch server status: ${response.statusText}`
        );
      }
      return response.json();
    } catch (error) {
      console.error("Error fetching server status:", error);
      throw error;
    }
  },
};
