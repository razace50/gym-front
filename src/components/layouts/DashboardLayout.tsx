import React, { useState } from 'react'
import Sidebar from '../DashboardComponents/Sidebar';

function DashboardLayout({children}: {children:React.ReactNode}) {
  const [sidebarOpen, setSidebarOpen]=useState(false);

  return (
    <div className='flex flex-row'>
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}/>
      {/* Main Content  */}
      <main className='p-6 bg-slate-900 min-h-screen w-5/6'>{children}</main>
    </div>
  )
}

export default DashboardLayout;