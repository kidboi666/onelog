'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { postQuery } from '@/src/services/queries/post/post-query'

interface Props {
  className?: string
}

export default function DataAccess({ className }: Props) {
  const { data } = useQuery(postQuery.getPost(supabase, 5))
  return <div className={className}>{data?.content ?? 'asdfasdf'}</div>
}
