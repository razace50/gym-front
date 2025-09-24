import React from 'react'

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
}

export default function StatCard({title, value, icon, color}: StatCardProps) {
  return (
    <div className='bg-gray-300 shadow rounded p-6 flex flex-col items-center justify-center border-[6px] border-purple-500 rounded-2xl h-60 transition-transform duration-300 hover:scale-110 cursor-pointer'>
      <div className={`text-4xl mb-3 ${color}`}>{icon}</div>
        <h3 className='text-gray-600 font-medium text-xl'>{title}</h3>
        <p className='text-2xl font-bold'>{value}</p>
    </div>
  );
}
