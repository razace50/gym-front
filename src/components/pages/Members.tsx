import { MessageCircleQuestionIcon, Search } from 'lucide-react'
import React from 'react'

export default function Members() {
  return (
    <div>
        <div className='w-full h-[70px] bg-slate-950 rounded-2xl flex items-center  justify-between px-6 border-[3px] border-pink-600 p-4'>
            <input className='w-64 h-6 bg-slate-800 ml-auto text-center text-white placeholder-white font-2xl rounded-md font-2xl outline-none px-2 py-4'
            placeholder='Search'/>
                
            <Search />
        
        <MessageCircleQuestionIcon className='ml-auto' size={30}
        />
        </div>
    </div>
  )
};
