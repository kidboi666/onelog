import {
  useDeleteAvatarImage,
  useUpdateUserInfo,
  useUploadAvatarImage,
} from '@/entities/auth/api/mutates'

export function useProfileMutations() {
  const {
    mutate: updateProfile,
    isPending: isPendingUpdateUserInfo,
    isSuccess: isSuccessUpdateUserInfo,
  } = useUpdateUserInfo()
  const { mutateAsync: uploadImage, isPending: isPendingImageUpload } =
    useUploadAvatarImage()
  const { mutate: deletePrevImage } = useDeleteAvatarImage()

  const isLoading =
    isPendingImageUpload || isPendingUpdateUserInfo || isSuccessUpdateUserInfo

  return {
    updateProfile,
    uploadImage,
    deletePrevImage,
    isLoading,
  }
}
