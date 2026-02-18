"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = (term: string) => {
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 200);
    setTimer(newTimer);
  };

  return (
    <div className="relative flex items-center">
      <img
        src="https://ik.imagekit.io/rattankartik708/search.png"
        alt="search"
        className="absolute left-3 w-4 h-4 opacity-50"
      />
      <input
        className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-zinc-800 border-none rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
        placeholder="Search bookmarks..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
