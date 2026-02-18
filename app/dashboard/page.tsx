import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/serverClient";
import RealtimeBookmarks from "@/components/RealtimeBookmarks";

export default async function Dashboard() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/");

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6 px-4">
      <RealtimeBookmarks initialBookmarks={bookmarks || []} />
    </div>
  );
}
