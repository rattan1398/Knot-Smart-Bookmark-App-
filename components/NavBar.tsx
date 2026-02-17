import { supabaseServer } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function Navbar() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/");

  const user = session.user;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <h1 className="text-lg font-semibold">KNOT - Smart Bookmarks</h1>

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">{user.email}</span>

        <img
          src={user.user_metadata?.avatar_url || '/user-icon.svg'}
          alt="avatar"
          className="w-9 h-9 rounded-full border border-gray-700"
        />

        <LogoutButton />
      </div>
    </div>
  );
}
