import { useEffect, useState } from "react";
import api from "../../api/api";
type Member = {
  id: number;
  status: string;
  user: {
    fullName: string;
    email: string;
  };
  membership?: {
    name: string;
  } | null;
};

export default function TrainerDashboard() {
  const [data, setData] = useState<{ totalAssignedMembers: number; activeMembers: number; expiredMembers: number; members: Member[] } | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await api.get("/trainer-dashboard");
      setData(res.data);
    };

    fetchDashboard();
  }, []);

  if (!data) {
    return <div className="p-6 text-white">Loading trainer dashboard...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Trainer Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Assigned Members" value={data.totalAssignedMembers} />
        <Card title="Active Members" value={data.activeMembers} />
        <Card title="Expired Members" value={data.expiredMembers} />
      </div>

      <div className="mt-8 rounded-xl bg-slate-800 p-5">
        <h2 className="mb-4 text-xl font-bold">My Members</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Membership</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.members.map((member: Member) => (
                <tr key={member.id} className="border-t border-slate-700">
                  <td className="p-3">{member.user.fullName}</td>
                  <td className="p-3">{member.user.email}</td>
                  <td className="p-3">{member.membership?.name || "No Plan"}</td>
                  <td className="p-3">{member.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}