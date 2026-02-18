'use client';

import { useState } from "react";
import UserProfile from "./UserProfile";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";
import { User } from "@supabase/supabase-js";

interface NavContentProps {
  user: User;
}

export default function NavContent({ user }: NavContentProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="relative flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-white dark:bg-zinc-950 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <img
            src="https://ik.imagekit.io/rattankartik708/favicon.ico"
            alt="logo"
            className="w-10 h-10"
          />
          <h1 className="text-lg font-semibold">KNOT</h1>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:flex flex-1 justify-center px-8">
           <SearchBar />
        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-4">
           {/* Mobile Search Icon */}
           <button 
             onClick={() => setIsSearchOpen(true)}
             className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
           >
             <img 
               src="https://ik.imagekit.io/rattankartik708/search.png" 
               alt="search" 
               className="w-5 h-5"
             />
           </button>

           <ThemeToggle />
           <UserProfile user={user} />
        </div>
      </div>

       {/* Mobile Search Overlay */}
       {isSearchOpen && (
        <div className="absolute top-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm z-50 px-6 py-4 md:hidden border-b border-gray-100 dark:border-zinc-800 shadow-lg">
          <div className="flex items-center gap-4">
             <div className="flex-1">
                <SearchBar autoFocus />
             </div>
             <button 
               onClick={() => setIsSearchOpen(false)}
               className="text-sm font-medium text-gray-500"
             >
               Cancel
             </button>
          </div>
        </div>
      )}
    </>
  );
}
