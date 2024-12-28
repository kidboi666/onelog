'use client'

import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import { useQuery } from '@tanstack/react-query'

interface Props {
  className?: string
}

export default function DataAccess({ className }: Props) {
  const { data } = useQuery(postQuery.getPost(supabase, 5))
  return <div className={className}>{data?.content ?? 'asdfasdf'}</div>
}
