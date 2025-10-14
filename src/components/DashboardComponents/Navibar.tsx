import React from 'react'
import {  Menu, MessageCircleQuestionIcon, } from 'lucide-react';

interface NavibarProps{
  toggleSidebar?: () => void;
}

export default function Navibar({toggleSidebar}: NavibarProps) {
  return (
   <div>
    {/* Header Bar */}
    <div className='w-full h-[70px] bg-slate-950 rounded-2xl flex items-center  justify-between px-6 border-[3px] border-pink-600 p-4'>
        <Menu className='text-white cursor-pointer lg:hidden' size={30}
        onClick={toggleSidebar}/>
        <input className='w-64 h-6 bg-slate-800 ml-auto text-center text-white placeholder-white font-2xl rounded-md font-2xl outline-none px-2 py-4'
            placeholder='Search'/>
        <MessageCircleQuestionIcon className='text-white ml-auto' size={30}
        />
    </div>
     
   </div>
  );
};
