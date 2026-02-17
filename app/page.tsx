'use client'

import { supabaseBrowser } from '@/lib/supabase/browserClient'


export default function LandingPage() {
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-gray-900 dark:text-gray-100 transition-colors">
      
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-zinc-900 sticky top-0 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
            <img 
              src="https://ik.imagekit.io/rattankartik708/favicon.ico" 
              alt="Knot Logo" 
              className="w-8 h-8"
            />
            <span className="text-xl font-bold tracking-tight">Knot</span>
        </div>
        <div>
          <button 
            onClick={loginWithGoogle}
            className="text-sm font-medium hover:text-indigo-500 transition-colors cursor-pointer"
          >
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-white to-white dark:from-indigo-950/20 dark:via-zinc-950 dark:to-zinc-950"></div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900 dark:from-white dark:via-indigo-200 dark:to-white">
          Tying the Web Together
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
          Knot is your smart, minimalist bookmark manager. Organize your digital life with ease, sync across devices, and never lose a link again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={loginWithGoogle}
            className="px-8 py-3.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Get Started with Google
          </button>
          <a 
            href="#features"
            className="px-8 py-3.5 rounded-full border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">Why verify your links with Knot?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 text-2xl">
                ⚡
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-time Sync</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your bookmarks follow you everywhere. Updates are pushed instantly across all your devices via Supabase Realtime.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-6 text-pink-600 dark:text-pink-400 text-2xl">
                🔍
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Search</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Find exactly what you're looking for in seconds with our lightning-fast search functionality.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center mb-6 text-emerald-600 dark:text-emerald-400 text-2xl">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Authenticated via Google, your data is yours alone. We prioritize security and privacy above all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-4 border-t border-gray-100 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-8">Built with modern technologies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
             <div className="flex flex-col items-center gap-2 group">
                <span className="text-4xl group-hover:scale-110 transition-transform">▲</span>
                <span className="font-semibold text-sm">Next.js 15</span>
             </div>
             <div className="flex flex-col items-center gap-2 group">
                <span className="text-4xl group-hover:scale-110 transition-transform">🎨</span>
                <span className="font-semibold text-sm">Tailwind CSS</span>
             </div>
             <div className="flex flex-col items-center gap-2 group">
                <span className="text-4xl group-hover:scale-110 transition-transform">⚡</span>
                <span className="font-semibold text-sm">Supabase</span>
             </div>
             <div className="flex flex-col items-center gap-2 group">
                <span className="text-4xl group-hover:scale-110 transition-transform">📘</span>
                <span className="font-semibold text-sm">TypeScript</span>
             </div>
             <div className="flex flex-col items-center gap-2 group">
                <span className="text-4xl group-hover:scale-110 transition-transform">☁️</span>
                <span className="font-semibold text-sm">ImageKit</span>
             </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-zinc-950 py-12 border-t border-gray-200 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <img 
              src="https://ik.imagekit.io/rattankartik708/favicon.ico" 
              alt="Knot Logo" 
              className="w-6 h-6 grayscale opacity-50"
            />
            <span className="font-semibold text-gray-500">Knot © {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex gap-8 text-sm text-gray-500">
            <a href="mailto:rattankartik708@gmail.com" className="hover:text-gray-900 dark:hover:text-gray-300 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
