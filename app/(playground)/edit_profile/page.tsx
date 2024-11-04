'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { meQuery } from '@/services/queries/auth/meQuery'
import useUploadAvatarImage from '@/services/mutates/auth/useUploadAvatarImage'
import useUpdateUserInfo from '@/services/mutates/auth/useUpdateUserInfo'
import { useInput } from '@/hooks/useInput'

import useDeleteAvatarImage from '@/services/mutates/auth/useDeleteAvatarImage'
import UserNameSection from './_components/UserNameSection'
import ProfileImageSection from './_components/ProfileImageSection'
import Button from '@/components/shared/Button'
import AboutMeSection from './_components/AboutMeSection'

export default function EditProfilePage() {
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, data?.userId),
  )
  const [userName, onChangeUserName, setUserName] = useInput<string | null>('')
  const [aboutMe, onChangeAboutMe, setAboutMe] = useInput<string | null>('')
  const [avatarUrl, , setAvatarUrl] = useInput<string | null>('')
  const [image, setImage] = useState<File | null>(null)
  const [prevAvatarUrl, , setPrevAvatarUrl] = useInput<string | null>('')
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
    uploadImage(
      { email: me.email, image },
      {
        onSuccess: (data) => {
          updateProfile({
            userId: me.id,
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
      userId: me.id,
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
    setUserName(me?.user_name)
    setAboutMe(me?.about_me)
    setAvatarUrl(me?.avatar_url)
    setPrevAvatarUrl(me?.avatar_url)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.avatar_url, me?.user_name, me?.about_me])

  return (
    <form
      onSubmit={handleProfileUpdate}
      className="flex w-full animate-fade-in flex-col justify-center gap-12 md:max-w-[768px]"
    >
      <ProfileImageSection
        email={me?.email}
        onChange={handleChangeImage}
        imagePreview={avatarUrl}
      />
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
    </form>
  )
}
