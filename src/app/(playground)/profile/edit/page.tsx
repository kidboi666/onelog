'use client'

import { useMe } from '@/src/store/hooks/useMe'
import ProfileForm from '@/src/app/(playground)/profile/edit/_components/ProfileForm'
import useProfileForm from '@/src/app/(playground)/profile/edit/_hooks/useProfileForm'
import useProfileMutations from '@/src/app/(playground)/profile/edit/_hooks/useProfileMutations'

export default function ProfileEditPage() {
  const { me } = useMe()
  const { states, actions } = useProfileForm(me)
  const { updateProfile, uploadImage, deletePrevImage, isLoading } =
    useProfileMutations()

  if (!me) return null

  return (
    <ProfileForm
      me={me}
      states={states}
      actions={actions}
      isLoading={isLoading}
      updateProfile={updateProfile}
      uploadImage={uploadImage}
      deletePrevImage={deletePrevImage}
    />
  )
}
