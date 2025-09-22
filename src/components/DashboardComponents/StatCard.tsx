import React from 'react'

interface StatCardProps {
    title: string;
    value: string | number;
    icon?: React.ReactNode;
    color?: string;
}

export default function StatCard({title, value, icon, color}: StatCardProps) {
  return (
    <div className='bg-white shadow rounded p-6 flex flex-col items-center justify-center border'>
      <div className={`text-4xl mb-3 ${color}`}>{icon}</div>
        <h3 className='text-gray-600 font medium'>{title}</h3>
        <p className='text-2xl font-bold'>{value}</p>
    </div>
  );
}
