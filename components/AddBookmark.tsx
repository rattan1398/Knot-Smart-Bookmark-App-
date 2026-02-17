'use client'

import { useState } from 'react'
import { addBookmark } from '@/app/actions/bookmark'
import { Bookmark } from '@/types/bookmark'

export default function AddBookmark({
  onAdd,
}: {
  onAdd: (bookmark: Bookmark) => void
}) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const optimisticBookmark: Bookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      created_at: new Date().toISOString(),
    }

    onAdd(optimisticBookmark)

    setTitle('')
    setUrl('')

    try {
      await addBookmark(new FormData(e.target as HTMLFormElement))
    } catch {
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="border p-2 rounded"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
        required
        className="border p-2 rounded flex-1"
      />
      <button className="bg-indigo-500 text-white px-4 rounded">
        Add
      </button>
    </form>
  )
}
