import { useEffect, useState } from "react";
import api from "../../api/api";

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchReports = async () => {
      const res = await api.get("/reports");
      setData(res.data);
    };

    fetchReports();
  }, []);

  if (!data) {
    return <div className="p-6 text-white">Loading reports...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Reports</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card title="Total Revenue" value={`$${data.totalRevenue}`} />
        <Card title="Total Members" value={data.totalMembers} />
        <Card title="Active Members" value={data.activeMembers} />
        <Card title="Expired Members" value={data.expiredMembers} />
        <Card title="Paid Payments" value={data.paidPayments} />
        <Card title="Pending Payments" value={data.pendingPayments} />
        <Card title="Today Attendance" value={data.todayAttendance} />
        <Card title="Total Expenses" value={`$${data.totalExpenses}`} />
<Card title="Net Profit" value={`$${data.netProfit}`} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <p className="text-gray-400">{title}</p>
      <h2 className="mt-2 text-3xl font-bold">{value}</h2>
    </div>
  );
}