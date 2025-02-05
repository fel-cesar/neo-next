export interface ServerStatus {
  uptime: number; // Uptime in seconds
  requestCount: number; // Total API requests since startup
  memoryUsage: number; // Memory usage in MB
  databaseStatus: "healthy" | "unreachable" | "unknown"; // Database connection status
}
