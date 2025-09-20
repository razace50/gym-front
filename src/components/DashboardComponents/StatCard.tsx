import React from 'react'

interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({title, value}: StatCardProps) {
  return (
    <div className='bg-white shadow rounded p-4'>
        <h3 className='text-gray-600'>{title}</h3>
        <p className='text-2xl font-bold'>{value}</p>
    </div>
  );
}
