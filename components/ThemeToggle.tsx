'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <button
      onClick={() =>
        setTheme(theme === 'dark' ? 'light' : 'dark')
      }
      className="p-2 dark:bg-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-300 transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <img 
        src={theme === 'dark' ? 'https://ik.imagekit.io/rattankartik708/light.png' : 'https://ik.imagekit.io/rattankartik708/dark.png'}
        alt="Toggle Theme"
        width={24}
        height={24}
        className="w-6 h-6 object-contain"
      />
    </button>
  )
}
