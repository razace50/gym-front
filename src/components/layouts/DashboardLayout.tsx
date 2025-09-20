import React from 'react'
import Sidebar from '../DashboardComponents/Sidebar';

function DashboardLayout({children}: {children:React.ReactNode}) {
  return (
    <div>
      <Sidebar/>
      <main className='p-6 bg-gray-100 min-h-screen'>{children}</main>
    </div>
  )
}

export default DashboardLayout;