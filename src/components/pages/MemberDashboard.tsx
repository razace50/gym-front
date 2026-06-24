import { useEffect, useState } from "react";
import api from "../../api/api";
type Payment = {
  id: number;
  amount: number;
  status: string;
};

type Attendance = {
  id: number;
  checkIn: string;
  checkOut: string | null;
};

type Membership = {
  id: number;
  name: string;
};

type MemberDashboardData = {
  status: string;
  membershipEnd: string | null;
  membership: Membership | null;
  payments: Payment[];
  attendance: Attendance[];
};

export default function MemberDashboard() {
  const [member, setMember] = useState<MemberDashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await api.get("/member-dashboard");
      setMember(res.data);
    };

    fetchDashboard();
  }, []);

  if (!member) {
    return <div className="p-6 text-white">Loading member dashboard...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">My Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Box title="Membership" value={member.membership?.name || "No Plan"} />
        <Box title="Status" value={member.status} />
        <Box
          title="Expiry Date"
          value={
            member.membershipEnd
              ? new Date(member.membershipEnd).toLocaleDateString()
              : "N/A"
          }
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">My Payments</h2>
          {member.payments.map((payment: Payment) => (
            <div key={payment.id} className="mb-2 rounded bg-slate-900 p-3">
              ${payment.amount} - {payment.status}
            </div>
          ))}
        </section>

        <section className="rounded-xl bg-slate-800 p-5">
          <h2 className="mb-4 text-xl font-bold">My Attendance</h2>
          {member.attendance.map((item: Attendance) => (
            <div key={item.id} className="mb-2 rounded bg-slate-900 p-3">
              In: {new Date(item.checkIn).toLocaleString()}
              <br />
              Out:{" "}
              {item.checkOut
                ? new Date(item.checkOut).toLocaleString()
                : "Not checked out"}
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

function Box({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}