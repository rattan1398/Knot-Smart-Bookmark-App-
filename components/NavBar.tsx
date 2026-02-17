import { supabaseServer } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import UserProfile from "./UserProfile";
import ThemeToggle from "./ThemeToggle";
import SearchBar from "./SearchBar";

export default async function Navbar() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/");

  const user = session.user;

  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <img
          src="https://ik.imagekit.io/rattankartik708/favicon.ico"
          alt="logo"
          className="w-10 h-10"
        />
        <h1 className="text-lg font-semibold">KNOT - Smart Bookmarks</h1>
      </div>
      
      <SearchBar />

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <UserProfile user={user} />
      </div>
    </div>
  );
}
