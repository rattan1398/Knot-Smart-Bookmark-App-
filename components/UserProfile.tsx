"use client";

import { User } from "@supabase/supabase-js";
import LogoutButton from "./LogoutButton";
import { useState } from "react";
import userIcon from "../public/user-icon.svg";

export default function UserProfile({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onClick={() => setIsOpen(true)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <img
        src={user.user_metadata?.avatar_url || userIcon}
        alt="avatar"
        className="w-9 h-9 rounded-full border border-gray-700 cursor-pointer"
      />

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800 break-words">
            {user.email}
          </div>
          <div className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            <div className="w-full flex justify-start">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
