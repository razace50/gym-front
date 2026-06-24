import React, { useEffect, useState } from "react";
import StatCard from "../DashboardComponents/StatCard";
import {
  AlertTriangle,
  BarChart2,
  Clock,
  CreditCard,
  Dumbbell,
  User,
  XCircle,
} from "lucide-react";
import api from "../../api/api";

type DashboardStats = {
  totalMembers: number;
  totalTrainers: number;
  totalMemberships: number;
  totalRevenue: number;
  monthlyJoined: number;
  expiringIn3Days: number;
  expiringIn7Days: number;
  expiredMembers: number;
  inactiveMembers: number;
  recentMembers: any[];
  recentPayments: any[];
  expiringMembers: any[];
  todayCheckIns: any[];
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/dashboard/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <div className="p-6 text-white">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Members" value={stats.totalMembers} icon={<User size={40} />} color="text-green-600" />
        <StatCard title="Total Trainers" value={stats.totalTrainers} icon={<Dumbbell size={40} />} color="text-blue-600" />
        <StatCard title="Membership Plans" value={stats.totalMemberships} icon={<User size={40} />} color="text-indigo-600" />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon={<CreditCard size={40} />} color="text-green-600" />
        <StatCard title="Monthly Joined" value={stats.monthlyJoined} icon={<BarChart2 size={40} />} color="text-purple-800" />
        <StatCard title="Expiring 3 Days" value={stats.expiringIn3Days} icon={<Clock size={40} />} color="text-red-600" />
        <StatCard title="Expiring 4-7 Days" value={stats.expiringIn7Days} icon={<Clock size={40} />} color="text-orange-600" />
        <StatCard title="Expired Members" value={stats.expiredMembers} icon={<XCircle size={40} />} color="text-red-500" />
        <StatCard title="Inactive Members" value={stats.inactiveMembers} icon={<AlertTriangle size={40} />} color="text-yellow-500" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Section title="Recent Joined Members">
          {stats.recentMembers.map((member) => (
            <Row key={member.id} left={member.user.fullName} right={member.membership?.name || "No Plan"} />
          ))}
        </Section>

        <Section title="Recent Payments">
          {stats.recentPayments.map((payment) => (
            <Row key={payment.id} left={payment.member.user.fullName} right={`$${payment.amount} - ${payment.status}`} />
          ))}
        </Section>

        <Section title="Expiring Soon">
          {stats.expiringMembers.map((member) => (
            <Row
              key={member.id}
              left={member.user.fullName}
              right={member.membershipEnd ? new Date(member.membershipEnd).toLocaleDateString() : "N/A"}
            />
          ))}
        </Section>

        <Section title="Currently Checked In">
          {stats.todayCheckIns.map((attendance) => (
            <Row
              key={attendance.id}
              left={attendance.member.user.fullName}
              right={new Date(attendance.checkIn).toLocaleTimeString()}
            />
          ))}
        </Section>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-slate-800 p-5">
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Row({ left, right }: { left: string; right: string }) {
  return (
    <div className="flex justify-between rounded-lg bg-slate-900 p-3">
      <span>{left}</span>
      <span className="text-gray-300">{right}</span>
    </div>
  );
}