import { supabaseServer } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import NavContent from "./NavContent";

export default async function Navbar() {
  const supabase = await supabaseServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/");

  const user = session.user;

  return <NavContent user={user} />;
}
