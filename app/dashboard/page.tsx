import { redirect } from 'next/navigation'
import { supabaseServer } from '@/lib/supabase/serverClient'

export default async function Dashboard() {
  const supabase = await supabaseServer()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) redirect('/login')

  return <div>Welcome 🚀</div>
}
