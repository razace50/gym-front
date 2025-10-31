import React, { useState, useEffect } from "react";
import { Home, Users, LogOut, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SideBarProps {
  open: boolean;
  setOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SideBarProps> = ({ open, setOpen }) => {
  const location = useLocation();
  const [active, setActive] = useState<string>("");

  // 👇 Set active menu based on current URL
  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Members", icon: <Users size={20} />, path: "/members" },
  ];

  return (
    <>
      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-opacity-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed top-0 left-0 bottom-0 lg:w-1/6 w-64 bg-black text-white p-4 transform transition-transform duration-300 z-50 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button (mobile only) */}
        <button
          className="lg:hidden absolute top-5 right-4 text-white"
          onClick={() => setOpen(false)}
        >
          <X size={30} />
        </button>

        {/* Logo */}
        <h1 className="text-2xl font-bold mb-6 text-center">Hamro Gym</h1>

        {/* Profile Section */}
        <div className="flex flex-row gap-10 items-center mb-8">
          <img
            src="/public/images/logoDash.jpg"
            alt="Profile"
            className="lg:w-30 lg:h-20 w-16 h-16 rounded-full border-2 border-gray-700 object-cover"
          />
          <div>
            <p className="mt-2 text-gray-300 font-bold">
              Good Evening <span className="text-yellow-400">●</span>
            </p>
            <p className="font-semibold">Admin</p>
          </div>
        </div>

        <hr className="lg:w-80 border-t border-gray-500 my-10" />

        {/* Navigation Links */}
        <nav className="flex flex-col gap-3 w-full">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => { setActive(item.path);
                setOpen(false);
              }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-300 ${
                active === item.path
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                  : "bg-[#0f172a] hover:bg-[#1e293b]"
              }`}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

          <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] transition">
            <LogOut size={20} /> Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
