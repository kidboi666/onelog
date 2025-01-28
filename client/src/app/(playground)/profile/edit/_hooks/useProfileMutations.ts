import useDeleteAvatarImage from '@/src/services/mutates/auth/use-delete-avatar-image'
import useUpdateUserInfo from '@/src/services/mutates/auth/use-update-user-info'
import useUploadAvatarImage from '@/src/services/mutates/auth/use-upload-avatar-image'

export default function useProfileMutations() {
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
