import React, { useState, useRef, useEffect } from 'react';
import { Menu, MessageCircleQuestionIcon, Search } from 'lucide-react';

interface NavibarProps {
  toggleSidebar?: () => void;
}

export default function Navibar({ toggleSidebar }: NavibarProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);

  // 👇 Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearch(false);
        setSearchQuery('');
      }
    };
    if (showSearch) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  // 👇 Simulated “search” action (replace with API/filter logic)
  useEffect(() => {
    if (searchQuery.trim() !== '') {
      console.log('Searching for:', searchQuery);
    }
  }, [searchQuery]);

  return (
    <div>
      {/* Header Bar */}
      <div className="w-full h-[70px] bg-slate-950 rounded-2xl flex items-center justify-between px-6 border-[3px] border-pink-600 p-4">
        
        {/* Menu Icon (mobile only) */}
        <Menu
          className="text-white cursor-pointer lg:hidden"
          size={30}
          onClick={toggleSidebar}
        />

        {/* Mobile Search Section */}
        <div className="relative ml-auto " ref={searchRef}>
          {/* Search Icon (when closed) */}
          {!showSearch && (
            <Search
              className="text-white cursor-pointer"
              size={26}
              onClick={() => setShowSearch(true)}
            />
          )}

          {/* Search Input (when open) */}
          {showSearch && (
            <div className="relative">
              {/* Input field */}
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                autoFocus
                className="lg:w-56 sm:w-auto h-9 bg-slate-800 text-white placeholder-white rounded-md pl-9 pr-3 outline-none border border-pink-500 transition-all duration-300"
              />
              {/* Search icon inside input */}
              <Search
                size={20}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              />
            </div>
          )}
        </div>

        {/* Message Icon (always visible) */}
        <MessageCircleQuestionIcon className="text-white ml-4" size={30} />
      </div>
    </div>
  );
}
