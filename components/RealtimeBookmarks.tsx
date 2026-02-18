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
    <div className="space-y-3">
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
          <div key={bm.id} className="flex justify-between border p-3 rounded">
            <a href={bm.url} target="_blank">
              {bm.title}
            </a>

            <form action={async () => {
              removeOptimistic(bm.id);
              await deleteBookmark(bm.id);
            }}>
              <button className="text-red-500 cursor-pointer">Delete</button>
            </form>
          </div>
        ))
      )}
    </div>
  );
}
