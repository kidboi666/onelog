import { router } from 'next/client'
import { FormEvent } from 'react'
import useCreatePost from '@/src/services/mutates/post/use-create-post'
import useUpdatePost from '@/src/services/mutates/post/use-update-post'
import { IUpdatePostFormStates } from '@/src/types/post'
import { ROUTES } from '@/src/routes'

export default function usePostSubmit({
  meId,
  postId,
  formState,
}: {
  meId: string
  postId: number
  formState: IUpdatePostFormStates
}) {
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
