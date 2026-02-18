import { supabaseServer } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage";

export default async function Page() {
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LandingPage />;
}
