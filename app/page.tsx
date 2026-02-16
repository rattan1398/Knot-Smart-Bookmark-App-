'use client'

import { supabaseBrowser } from '@/lib/supabase/browserClient'

export default function LoginPage() {
  const supabase = supabaseBrowser()

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={loginWithGoogle}
        className="bg-black text-white px-6 py-3 rounded-xl"
      >
        Continue with Google
      </button>
    </div>
  )
}
