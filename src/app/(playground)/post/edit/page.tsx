'use client';

import { useCallback, useState } from 'react';



import { XStack } from '@/src/components/Stack';



import PostContainer from './_containers/PostContainer';
import SideOptionsContainer from './_containers/SideOptionsContainer';





export type TAccess = 'public' | 'private'
export type TPost = 'journal' | 'article'
export type TEmotion = '0%' | '25%' | '50%' | '75%' | '100%' | null

interface Props {
  searchParams: { post_id: string }
}

export default function Default({ searchParams }: Props) {
  const [selectedEmotion, setSelectedEmotion] = useState<TEmotion | null>('50%')
  const [accessType, setAccessType] = useState<TAccess>('public')
  const [postType, setPostType] = useState<TPost>('journal')

  const handleChangeEmotion = useCallback((emotion: TEmotion) => {
    setSelectedEmotion(emotion)
  }, [])

  const handleChangeAccessType = useCallback((accessType: TAccess) => {
    setAccessType(accessType)
  }, [])

  const handleChangePostType = useCallback((postType: TPost) => {
    setPostType(postType)
  }, [])

  return (
    <XStack gap={8} className="flex-1 animate-fade-in">
      <PostContainer
        searchParams={searchParams}
        selectedEmotion={selectedEmotion}
        onChangeEmotion={handleChangeEmotion}
        accessType={accessType}
        onChangeAccessType={handleChangeAccessType}
        postType={postType}
        onChangePostType={handleChangePostType}
      />
      <SideOptionsContainer
        searchParams={searchParams}
        selectedEmotion={selectedEmotion}
        onChangeEmotion={handleChangeEmotion}
        accessType={accessType}
        onChangeAccessType={handleChangeAccessType}
        postType={postType}
        onChangePostType={handleChangePostType}
      />
    </XStack>
  )
}
