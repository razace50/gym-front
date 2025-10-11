import React from 'react'
import StatCard from '../DashboardComponents/StatCard';
import { AlertTriangle, BarChart2, Clock, Menu, MessageCircleQuestionIcon, User, XCircle } from 'lucide-react';

interface DashboardProps{
  toggleSidebar?: () => void;
}

export default function Dashboard({toggleSidebar}: DashboardProps) {
  return (
   <div>
    {/* Header Bar */}
    <div className='w-full h-[70px] bg-slate-950 rounded-2xl flex items-center  justify-between px-6 border-[3px] border-pink-600 p-4'>
        <Menu className='text-white cursor-pointer lg:hidden' size={30}
        onClick={toggleSidebar}/>
        <MessageCircleQuestionIcon className='text-white ml-auto' size={30}
        />
    </div>
     <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 '>
        <StatCard title='Joined Members' value={120} icon={<User size={40}/>} color='text-green-600'/>
        <StatCard title='Monthly Joined' value={15} icon={<BarChart2 className='border-[4px] border-black rounded-lg' size={40}/>} color='text-purple-800'/>
        <StatCard title='Expiring Within 3 days' value={5} icon={<Clock size={40}/>} color='text-red-600'/>
        <StatCard title='Expiring within 4-7 days' value={8} icon={<Clock size={40}/>} color='text-red-600'/>
        <StatCard title='Expired' value={3} icon={<XCircle size={40}/>} color='text-red-500'/>
        <StatCard title='Inactive Members' value={10} icon={<AlertTriangle size={40}/>} color='text-yellow-500'/>
    </div>
   </div>
  );
};
