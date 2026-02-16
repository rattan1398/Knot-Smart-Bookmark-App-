import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/serverClient";
import { addBookmark, deleteBookmark } from "../actions/bookmark";
import RealtimeBookmarks from "@/components/RealtimeBookmarks";

export default async function Dashboard() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6">
      {/* Add Form */}
      <form action={addBookmark} className="flex gap-2">
        <input
          name="title"
          placeholder="Bookmark title"
          required
          className="border p-2 rounded w-1/3"
        />
        <input
          name="url"
          placeholder="https://example.com"
          required
          className="border p-2 rounded flex-1"
        />
        <button className="bg-black text-white px-4 rounded">Add</button>
      </form>

      {/* List */}
      <RealtimeBookmarks initialBookmarks={bookmarks || []} />
    </div>
  );
}
