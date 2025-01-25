import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { AccessType, EmotionLevel, PostType } from '@/src/types/enums'
import {
  IPostDetail,
  IUpdatePostFormActions,
  IUpdatePostFormStates,
} from '@/src/types/post'

export default function usePostForm(initialPost: IPostDetail | null): {
  formState: IUpdatePostFormStates
  actions: IUpdatePostFormActions
} {
  const [formState, setFormState] = useState<
    Omit<IUpdatePostFormStates, 'content' | 'tags'>
  >({
    emotionLevel: null,
    accessType: AccessType.PUBLIC,
    postType: PostType.ARTICLE,
    title: initialPost?.title ?? null,
  })
  const [content, setContent] = useState(initialPost?.content ?? '')
  const [tags, setTags] = useState(initialPost?.tags ?? [])

  const handleChangeEmotion = useCallback(
    (emotionLevel: EmotionLevel | null) => {
      setFormState((prev) => ({ ...prev, emotionLevel }))
    },
    [],
  )

  const handleChangeAccessType = useCallback((accessType: AccessType) => {
    setFormState((prev) => ({ ...prev, accessType }))
  }, [])

  const handleChangePostType = useCallback((postType: PostType) => {
    setFormState((prev) => ({ ...prev, postType }))
  }, [])

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, title: e.target.value }))
  }, [])

  useEffect(() => {
    if (formState.postType === PostType.ARTICLE) {
      handleChangeEmotion(null)
    } else {
      handleChangeEmotion(EmotionLevel['50%'])
    }
  }, [formState.postType])

  return {
    formState: { ...formState, content, tags },
    actions: {
      onChangeEmotion: handleChangeEmotion,
      onChangeAccessType: handleChangeAccessType,
      onChangePostType: handleChangePostType,
      onChangeTitle: handleChangeTitle,
      setContent,
      setTags,
    },
  }
}
