'use client'

import { useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase/browserClient'
import { Bookmark } from '@/types/bookmark'
import { deleteBookmark } from '@/app/actions/bookmark'

export default function RealtimeBookmarks({
  initialBookmarks,
}: {
  initialBookmarks: Bookmark[]
}) {
  const [bookmarks, setBookmarks] = useState(initialBookmarks)

  useEffect(() => {
    setBookmarks(initialBookmarks)
  }, [initialBookmarks])

  useEffect(() => {
    const supabase = supabaseBrowser()

    const channel = supabase
      .channel('bookmarks-channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        async (payload) => {
          console.log('Realtime Event:', payload)
          
          // Fetch fresh data
          const { data, error } = await supabase
            .from('bookmarks')
            .select('*')
            .order('created_at', { ascending: false })

          if (error) console.error('Error fetching bookmarks:', error)
          if (data) setBookmarks(data)
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="space-y-3">
      {bookmarks.map((bm) => (
        <div
          key={bm.id}
          className="flex justify-between border p-3 rounded"
        >
          <a href={bm.url} target="_blank">
            {bm.title}
          </a>

          <form action={deleteBookmark.bind(null, bm.id)}>
            <button className="text-red-500">
              Delete
            </button>
          </form>
        </div>
      ))}
    </div>
  )
}
