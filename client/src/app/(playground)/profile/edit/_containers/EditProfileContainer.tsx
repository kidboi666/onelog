'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import useDeleteAvatarImage from '@/src/services/mutates/auth/use-delete-avatar-image'
import useUpdateUserInfo from '@/src/services/mutates/auth/use-update-user-info'
import useUploadAvatarImage from '@/src/services/mutates/auth/use-upload-avatar-image'
import { meQuery } from '@/src/services/queries/auth/me-query'
import useInput from '@/src/hooks/useInput'
import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import AboutMeSection from '../_components/AboutMeSection'
import EmailSection from '../_components/EmailSection'
import ProfileImageSection from '../_components/ProfileImageSection'
import UserNameSection from '../_components/UserNameSection'

export default function EditProfileContainer() {
  const { data: me } = useSuspenseQuery(meQuery.getSession(supabase))
  const [userName, onChangeUserName, setUserName] = useInput<string | null>(
    null,
  )
  const [aboutMe, onChangeAboutMe, setAboutMe] = useInput<string | null>(null)
  const [avatarUrl, , setAvatarUrl] = useInput<string | null>(null)
  const [image, setImage] = useState<File | null>(null)
  const [prevAvatarUrl, , setPrevAvatarUrl] = useInput<string | null>(null)
  const {
    mutate: updateProfile,
    isPending: isPendingUpdateUserInfo,
    isSuccess: isSuccessUpdateUserInfo,
  } = useUpdateUserInfo()
  const { mutateAsync: uploadImage, isPending: isPendingImageUpload } =
    useUploadAvatarImage()
  const { mutate: deletePrevImage } = useDeleteAvatarImage()

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleProfileUpdateWithImage = () => {
    if (prevAvatarUrl) {
      deletePrevImage(prevAvatarUrl)
    }
    void uploadImage(
      { email: me?.email, image },
      {
        onSuccess: (data) => {
          updateProfile({
            aboutMe,
            avatarUrl: data,
            userName,
          })
        },
      },
    )
  }

  const handleProfileUpdateWithoutImage = () => {
    updateProfile({
      aboutMe,
      userName,
    })
  }

  const handleProfileUpdate = async (e: FormEvent) => {
    e.preventDefault()
    if (image) {
      handleProfileUpdateWithImage()
    } else {
      handleProfileUpdateWithoutImage()
    }
  }

  useEffect(() => {
    setUserName(me ? me.user_name : null)
    setAboutMe(me ? me.about_me : null)
    setAvatarUrl(me ? me.avatar_url : null)
    setPrevAvatarUrl(me ? me.avatar_url : null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.avatar_url, me?.user_name, me?.about_me])

  return (
    <form
      onSubmit={handleProfileUpdate}
      className="animate-fade-in rounded-md bg-white p-2 shadow-sm sm:p-8 dark:bg-var-darkgray"
    >
      <YStack gap={8}>
        <ProfileImageSection
          onChange={handleChangeImage}
          imagePreview={avatarUrl}
        />
        <EmailSection email={me?.email} provider={me?.provider} />
        <UserNameSection value={userName ?? ''} onChange={onChangeUserName} />
        <AboutMeSection value={aboutMe ?? ''} onChange={onChangeAboutMe} />
        <Button
          type="submit"
          isLoading={
            isPendingImageUpload ||
            isPendingUpdateUserInfo ||
            isSuccessUpdateUserInfo
          }
          disabled={
            (userName === me?.user_name &&
              aboutMe === me?.about_me &&
              avatarUrl === me?.avatar_url) ||
            userName?.length! > 10 ||
            aboutMe?.length! > 150
          }
        >
          수정하기
        </Button>
      </YStack>
    </form>
  )
}
