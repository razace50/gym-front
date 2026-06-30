import { useEffect, useState } from "react";
import api from "../../api/api";

type ActivityLog = {
  id: number;
  action: string;
  entityType: string;
  entityId?: number;
  description: string;
  createdAt: string;
  performedBy?: {
    fullName: string;
    email: string;
    role: string;
  } | null;
};

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/activity-logs");
        setLogs(res.data);
      } catch (error) {
        console.error("Failed to fetch activity logs", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="p-6 text-white">Loading activity logs...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Activity Logs</h1>

      <div className="overflow-x-auto rounded-xl bg-slate-800">
        <table className="w-full border-collapse text-left">
          <thead className="bg-slate-900 text-gray-300">
            <tr>
              <th className="p-4">Action</th>
              <th className="p-4">Entity</th>
              <th className="p-4">Description</th>
              <th className="p-4">Performed By</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-700">
                  <td className="p-4 font-semibold">{log.action}</td>
                  <td className="p-4">{log.entityType}</td>
                  <td className="p-4">{log.description}</td>
                  <td className="p-4">
                    {log.performedBy
                      ? `${log.performedBy.fullName} (${log.performedBy.role})`
                      : "System"}
                  </td>
                  <td className="p-4">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-400">
                  No activity logs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}