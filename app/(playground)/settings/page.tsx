import ColorPicker from './_components/ColorPicker'
import PasswordResetForm from './_components/PasswordResetForm'
import DarkModeSwitch from './_components/DarkModeSwitch'
import LogoutButton from './_components/LogoutButton'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { meQuery } from '@/services/queries/auth/meQuery'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import Spinner from '@/components/shared/Spinner'

export default function SettingsPage() {
  const queryClient = getQueryClient()
  const supabase = createServerClient()

  queryClient.prefetchQuery(meQuery.getUserSession(supabase))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Spinner size={60} />}>
        <PasswordResetForm />
      </Suspense>
      <ColorPicker />
      <DarkModeSwitch />
      <LogoutButton />
    </HydrationBoundary>
  )
}
