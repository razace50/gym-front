import React, { useEffect, useState } from "react";
import StatCard from "../DashboardComponents/StatCard";
import {
  AlertTriangle,
  BarChart2,
  Clock,
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
};

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalMembers: 0,
    totalTrainers: 0,
    totalMemberships: 0,
    totalRevenue: 0,
    monthlyJoined: 0,
    expiringIn3Days: 0,
    expiringIn7Days: 0,
    expiredMembers: 0,
    inactiveMembers: 0,
  });

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

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        <StatCard
          title="Joined Members"
          value={stats.totalMembers}
          icon={<User size={40} />}
          color="text-green-600"
        />

        <StatCard
          title="Total Trainers"
          value={stats.totalTrainers}
          icon={<User size={40} />}
          color="text-blue-600"
        />

        <StatCard
          title="Total Memberships"
          value={stats.totalMemberships}
          icon={<User size={40} />}
          color="text-indigo-600"
        />

        <StatCard
          title="Total Revenue"
          value={stats.totalRevenue}
          icon={<BarChart2 size={40} />}
          color="text-green-600"
        />

        <StatCard
          title="Monthly Joined"
          value={stats.monthlyJoined}
          icon={
            <BarChart2
              className="border-[4px] border-black rounded-lg"
              size={40}
            />
          }
          color="text-purple-800"
        />

        <StatCard
          title="Expiring Within 3 days"
          value={stats.expiringIn3Days}
          icon={<Clock size={40} />}
          color="text-red-600"
        />

        <StatCard
          title="Expiring within 4-7 days"
          value={stats.expiringIn7Days}
          icon={<Clock size={40} />}
          color="text-red-600"
        />

        <StatCard
          title="Expired"
          value={stats.expiredMembers}
          icon={<XCircle size={40} />}
          color="text-red-500"
        />

        <StatCard
          title="Inactive Members"
          value={stats.inactiveMembers}
          icon={<AlertTriangle size={40} />}
          color="text-yellow-500"
        />
      </div>
    </div>
  );
}