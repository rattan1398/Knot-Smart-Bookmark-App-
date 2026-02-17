"use client";

import { supabaseBrowser } from "@/lib/supabase/browserClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = supabaseBrowser();

    await supabase.auth.signOut();

    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-red-400 hover:text-red-300"
    >
      Logout
    </button>
  );
}
