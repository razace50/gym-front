import React from "react";
import { Home, Users, LogOut, X } from "lucide-react";
import { Link } from "react-router-dom";

interface SideBarProps {
open: boolean;
setOpen: (val: boolean) => void;
}

const Sidebar: React.FC<SideBarProps> = ({open, setOpen}) => {
  return (
    <div className={`fixed top-0 left-0 w-1/6 bg-black text-white p-4 transform transition-transform duration-300 z-50 lg:static lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full" }`}>
      {/* CLose button (only on mobile) */}
      <button className="lg:hidden absolute top-4 right-4 text-white"
      onClick={()=> setOpen(false)}
      >
        <X size={24}/>

      </button>
      {/* Logo / Header */}
      <h1 className="text-2xl font-bold mb-6 text-center">Hamro Gym</h1>

      {/* Profile Section */}
      <div className="flex flex-row gap-10 items-center mb-8">
        <img
          src="/public/images/logoDash.jpg" 
          alt="Profile"
          className="w-30 h-20 rounded-full border-2 border-gray-700 object-cover"
        />
        <div><p className="mt-2 text-gray-300 text-2x; font-bold">
          Good Evening <span className="text-yellow-400">●</span>
        </p>
        <p className="font-semibold">admin</p></div>
      </div>
       <hr className="w-80 border-t border-gray-500 my-10" />

      {/* Menu Items */}
      <nav className="flex flex-col gap-3 w-full">
        <Link to="/dashboard" className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
          <Home size={20} /> Dashboard
        </Link>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] transition">
          <Users size={20} /> Members
        </button>

        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-[#0f172a] hover:bg-[#1e293b] transition">
          <LogOut size={20} /> Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
