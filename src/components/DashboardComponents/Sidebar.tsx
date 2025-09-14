import React from "react";
import { Home, Users, LogOut } from "lucide-react";

const Sidebar: React.FC = () => {
  return (
    <div className="w-1/5 h-screen bg-black text-white flex flex-col items-center p-4">
      {/* Logo / Header */}
      <h1 className="text-2xl font-bold mb-6 text-center">Power Zone</h1>

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
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
          <Home size={20} /> Dashboard
        </button>

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
