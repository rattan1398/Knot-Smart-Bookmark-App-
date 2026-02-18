"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/browserClient";
import { Bookmark } from "@/types/bookmark";
import { deleteBookmark } from "@/app/actions/bookmark";
import AddBookmark from "./AddBookmark";

export default function RealtimeBookmarks({
  initialBookmarks,
}: {
  initialBookmarks: Bookmark[];
}) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks);
  const searchParams = useSearchParams();
  const query = searchParams.get('query')?.toLowerCase() || '';

  const filteredBookmarks = bookmarks.filter(b => 
    b.title.toLowerCase().includes(query) || 
    b.url.toLowerCase().includes(query)
  );
  const addOptimistic = (bookmark: Bookmark) => {
    setBookmarks((prev) => [bookmark, ...prev]);
  };

  const removeOptimistic = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const [pendingDeletion, setPendingDeletion] = useState<{ 
    id: string; 
    bookmark: Bookmark; 
    timeoutId: NodeJS.Timeout 
  } | null>(null);

  const handleDelete = (id: string) => {
    const bookmarkToDelete = bookmarks.find(b => b.id === id);
    if (!bookmarkToDelete) return;

    // Keep the filtered list logic consistent
    if (pendingDeletion) {
      clearTimeout(pendingDeletion.timeoutId);
      deleteBookmark(pendingDeletion.id);
    }

    removeOptimistic(id);

    const timeoutId = setTimeout(async () => {
      await deleteBookmark(id);
      setPendingDeletion(null);
    }, 3000);

    setPendingDeletion({
      id,
      bookmark: bookmarkToDelete,
      timeoutId
    });
  };

  const handleUndo = () => {
    if (!pendingDeletion) return;
    clearTimeout(pendingDeletion.timeoutId);
    
    setBookmarks((prev) => {
      const newBookmarks = [pendingDeletion.bookmark, ...prev];
      return newBookmarks.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });
    
    setPendingDeletion(null);
  };

  useEffect(() => {
    setBookmarks(initialBookmarks);
  }, [initialBookmarks]);

  useEffect(() => {
    const supabase = supabaseBrowser();

    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
        },
        async (payload) => {
          console.log("Realtime Event:", payload);

          // Fetch fresh data
          const { data, error } = await supabase
            .from("bookmarks")
            .select("*")
            .order("created_at", { ascending: false });

          if (error) console.error("Error fetching bookmarks:", error);
          if (data) setBookmarks(data);
        },
      )
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-3 relative">
      <AddBookmark onAdd={addOptimistic} onRemove={removeOptimistic} />
      {filteredBookmarks.length === 0 ? (
        <div className="text-center mt-24 text-gray-400">
          <p className="text-xl font-medium">
            {query ? 'No bookmarks found' : 'No bookmarks yet'}
          </p>
          {!query && (
            <p className="text-sm mt-2">
              Add your first bookmark to get started 🚀
            </p>
          )}
        </div>
      ) : (
        filteredBookmarks.map((bm) => (
          <div key={bm.id} className="flex items-center justify-between border p-3 rounded gap-3 bg-white dark:bg-zinc-900 shadow-sm relative overflow-hidden">
            <a href={bm.url} target="_blank" className="truncate hover:text-indigo-500 transition-colors flex-1 text-sm sm:text-base mr-2">
              {bm.title}
            </a>

            <button 
              onClick={() => handleDelete(bm.id)}
              className="text-red-500 cursor-pointer hover:text-red-600 transition-colors text-xs sm:text-base flex-shrink-0"
            >
              Delete
            </button>
          </div>
        ))
      )}

      {pendingDeletion && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 shadow-xl rounded-lg overflow-hidden z-50 w-[90%] max-w-[350px]">
          <div className="p-4 flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600 dark:text-gray-300">Bookmark deleted</span>
            <button 
              onClick={handleUndo}
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 cursor-pointer"
            >
              Undo
            </button>
          </div>
          <div className="h-1 bg-gray-100 dark:bg-zinc-700 w-full">
            <div 
              className="h-full bg-indigo-500 transition-all ease-linear"
              style={{ 
                width: '0%',
                animation: 'progress 3s linear forwards'
              }}
            />
          </div>
        </div>
      )}
      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
