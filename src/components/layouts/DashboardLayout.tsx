// DashboardLayout.tsx
import React, { useState } from 'react';
import Sidebar from '../DashboardComponents/Sidebar';
import Navibar from '../DashboardComponents/Navibar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className='flex bg-slate-900 justify-center min-h-screen'>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className='w-5/6 pt-4'>
        <div className='px-4 '>{/* ✅ Pass toggleSidebar here */}
        <Navibar toggleSidebar={toggleSidebar} /></div>

        <main className='px-6  bg-slate-900 min-h-screen'>
          {children}
        </main>
      </div>
    </div>
  );
}
