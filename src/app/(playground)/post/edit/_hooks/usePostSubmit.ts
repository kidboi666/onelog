import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import useCreatePost from '@/features/post/api/use-create-post'
import useUpdatePost from '@/features/post/api/use-update-post'
import { IUpdatePostFormStates } from '@/shared/types/dtos/post'
import { ROUTES } from '@/app/_routes/constants'

export default function usePostSubmit({
  meId,
  postId,
  formState,
}: {
  meId: string
  postId: number
  formState: IUpdatePostFormStates
}) {
  const router = useRouter()
  const { mutate: addPost, isPending, isSuccess } = useCreatePost()
  const { mutate: updatePost } = useUpdatePost()

  const handleSubmitPost = (e: FormEvent) => {
    e.preventDefault()
    if (!meId) return

    const postData = { ...formState, meId }

    if (postId) {
      updatePost(
        { ...postData, id: postId },
        { onSuccess: () => router.replace(ROUTES.MODAL.SUCCESS) },
      )
    } else {
      addPost(postData, {
        onSuccess: () => router.replace(ROUTES.MODAL.SUCCESS),
      })
    }
  }

  return { onSubmitPost: handleSubmitPost, isPending, isSuccess }
}
