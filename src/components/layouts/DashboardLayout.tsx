import React, { useState } from 'react';
import Sidebar from '../DashboardComponents/Sidebar';

interface DashboardLayoutProps {
  // ✅ ReactElement instead of ReactNode
  children: React.ReactElement<{ toggleSidebar: () => void }>;
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className='flex bg-slate-900 justify-center min-h-screen'>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <main className='p-6 bg-slate-900 min-h-screen w-5/6'>
        {React.cloneElement(children, { toggleSidebar })} {/* ✅ fixed spelling + type */}
      </main>
    </div>
  );
}

export default DashboardLayout;
