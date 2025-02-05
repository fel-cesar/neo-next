import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServerStatus } from "@/entities/server-status";
import { serverStatusRepository } from "@/repositories/server-status.repository";
import { useEffect, useState } from "react";

export default function ServerStatusCard() {
  const [status, setStatus] = useState<ServerStatus>();

  const fetchServerStatus = async () => {
    const data = await serverStatusRepository.getServerStatus();
    setStatus(data);
  };

  useEffect(() => {
    fetchServerStatus();
  }, []);

  return (
    <Card className="flex flex-col items-center justify-center max-w-60">
      <CardHeader>
        <CardTitle>Server Status</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Uptime: {status?.uptime} seconds</p>
        <p>Request Count: {status?.requestCount}</p>
        <p>Memory Usage: {status?.memoryUsage} MB</p>
        <p>Database Status: {status?.databaseStatus}</p>
      <Button onClick={fetchServerStatus}> Refresh status</Button>
      </CardContent>

    </Card>
  );
}
