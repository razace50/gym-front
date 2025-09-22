import React from 'react'
import Sidebar from '../DashboardComponents/Sidebar';

function DashboardLayout({children}: {children:React.ReactNode}) {
  return (
    <div className='flex flex-row'>
      <Sidebar/>
      <main className='p-6 bg-slate-900 min-h-screen w-4/5'>{children}</main>
    </div>
  )
}

export default DashboardLayout;