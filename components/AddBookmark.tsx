'use client'

import { useState } from 'react'
import { addBookmark } from '@/app/actions/bookmark'
import { Bookmark } from '@/types/bookmark'

export default function AddBookmark({
  onAdd,
  onRemove,
}: {
  onAdd: (bookmark: Bookmark) => void
  onRemove: (id: string) => void
}) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const isValidUrl = (urlString: string) => {
    try {
      const urlObject = new URL(urlString);
      return urlObject.protocol === "http:" || urlObject.protocol === "https:";
    } catch {
      return false;
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isValidUrl(url)) {
      alert('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    const optimisticBookmark: Bookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      created_at: new Date().toISOString(),
    }

    onAdd(optimisticBookmark)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('url', url)

    setTitle('')
    setUrl('')

    try {
      await addBookmark(formData)
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      } else {
        alert('Failed to add bookmark')
      }
      onRemove(optimisticBookmark.id)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="border p-2 rounded"
      />
      <input
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://..."
        required
        className="border p-2 rounded flex-1"
      />
      <button className="bg-indigo-500 text-white px-4 rounded cursor-pointer">
        Add
      </button>
    </form>
  )
}
