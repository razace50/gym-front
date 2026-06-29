import React from "react";
import {
  Bell,
  CalendarCheck,
  CreditCard,
  Dumbbell,
  Home,
  LogOut,
  Settings,
  Shield,
  Ticket,
  Users,
  X,
  BarChart3,
  ClipboardList,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

type User = {
  fullName?: string;
  email?: string;
  role: string;
};

const Sidebar: React.FC<SideBarProps> = ({ open, setOpen }) => {
  const location = useLocation();

  const userData = localStorage.getItem("user");
  const user: User | null = userData ? JSON.parse(userData) : null;
  const role = user?.role || "";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <Home size={20} />,
      path: "/dashboard",
      roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"],
    },
    {
      name: "Trainer Dashboard",
      icon: <Dumbbell size={20} />,
      path: "/trainer-dashboard",
      roles: ["TRAINER"],
    },
    {
      name: "My Dashboard",
      icon: <Home size={20} />,
      path: "/member-dashboard",
      roles: ["MEMBER"],
    },
    {
      name: "Members",
      icon: <Users size={20} />,
      path: "/members",
      roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER"],
    },
    {
      name: "Trainers",
      icon: <Dumbbell size={20} />,
      path: "/dashboard-trainers",
      roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"],
    },
    {
      name: "Memberships",
      icon: <Ticket size={20} />,
      path: "/dashboard-memberships",
      roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"],
    },
    {
      name: "Attendance",
      icon: <CalendarCheck size={20} />,
      path: "/attendance",
      roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER"],
    },
    {
      name: "Admins",
      icon: <Shield size={20} />,
      path: "/admins",
      roles: ["SUPER_ADMIN"],
    },
    {
      name: "Payments",
      icon: <CreditCard size={20} />,
      path: "/payments",
      roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"],
    },
    {
      name: "Notifications",
      icon: <Bell size={20} />,
      path: "/notifications",
      roles: ["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"],
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
  name: "Reports",
  icon: <BarChart3 size={20} />,
  path: "/reports",
  roles: ["SUPER_ADMIN", "ADMIN"],
},
    {
      name: "Progress",
      icon: <TrendingUp size={20} />,
      path: "/progress",
      roles: ["SUPER_ADMIN", "ADMIN", "TRAINER", "MEMBER"],
    },
    {
      name: "Workout Plans",
      icon: <ClipboardList size={20} />,
      path: "/workout-plans",
      roles: ["SUPER_ADMIN", "ADMIN", "TRAINER", "MEMBER"],
    },
    {
  name: "Expenses",
  icon: <Wallet size={20} />,
  path: "/expenses",
  roles: ["SUPER_ADMIN", "ADMIN"],
},
  ];

  const allowedMenuItems = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 w-64 bg-black p-4 text-white transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute right-4 top-5 text-white lg:hidden"
          onClick={() => setOpen(false)}
        >
          <X size={30} />
        </button>

        <h1 className="mb-6 text-center text-2xl font-bold">Hamro Gym</h1>

        <div className="mb-8 flex items-center gap-4">
          <img
            src="/images/logoDash.jpg"
            alt="Profile"
            className="h-16 w-16 rounded-full border-2 border-gray-700 object-cover"
          />

          <div>
            <p className="font-bold text-gray-300">
              Welcome <span className="text-yellow-400">●</span>
            </p>
            <p className="font-semibold">{user?.fullName || user?.email}</p>
            <p className="text-xs text-gray-400">{role}</p>
          </div>
        </div>

        <hr className="my-8 border-t border-gray-500" />

        <nav className="flex w-full flex-col gap-3">
          {allowedMenuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                    : "bg-[#0f172a] hover:bg-[#1e293b]"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg bg-[#0f172a] px-4 py-3 transition hover:bg-[#1e293b]"
          >
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;