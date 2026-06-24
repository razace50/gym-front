import React, { useEffect, useState } from "react";
import {
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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Members", icon: <Users size={20} />, path: "/members" },
    { name: "Trainers", icon: <Dumbbell size={20} />, path: "/dashboard-trainers" },
    { name: "Memberships", icon: <Ticket size={20} />, path: "/dashboard-memberships" },
    { name: "Attendance", icon: <CalendarCheck size={20} />, path: "/attendance" },
    { name: "Admins", icon: <Shield size={20} />, path: "/admins" },
    { name: "Payments", icon: <CreditCard size={20} />, path: "/payments" },
    { name: "Settings", icon: <Settings size={20} />, path: "/settings" },
    {
      name: "Trainer Dashboard",
      path: "/trainer-dashboard",
      roles: ["TRAINER"],
    },
    {
      name: "My Dashboard",
      path: "/member-dashboard",
      roles: ["MEMBER"],
    },
  ];

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
        className={`fixed top-0 left-0 bottom-0 z-50 w-64 bg-black text-white p-4 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-4 text-white lg:hidden"
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
              Good Evening <span className="text-yellow-400">●</span>
            </p>
            <p className="font-semibold">Admin</p>
          </div>
        </div>

        <hr className="my-8 border-t border-gray-500" />

        <nav className="flex w-full flex-col gap-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => {
                setActive(item.path);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-300 ${
                active === item.path
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                  : "bg-[#0f172a] hover:bg-[#1e293b]"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

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
