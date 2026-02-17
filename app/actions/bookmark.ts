'use server'

import { supabaseServer } from '@/lib/supabase/serverClient'
import { revalidatePath } from 'next/cache'

export async function addBookmark(formData: FormData) {
  const title = formData.get('title') as string
  const url = formData.get('url') as string

  const supabase = await supabaseServer()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  const { data: existingBookmark } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', user.id)
    .eq('title', title)
    .single()

  if (existingBookmark) {
    throw new Error('A bookmark with this title already exists.')
  }

  const { error } = await supabase
    .from('bookmarks')
    .insert([{ title, url, user_id: user.id }])

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
}

export async function deleteBookmark(id: string) {
  const supabase = await supabaseServer()

  const { error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/dashboard')
}
