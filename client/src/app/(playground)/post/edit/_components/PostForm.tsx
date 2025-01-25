import { BubbleMenu, Editor, EditorContent } from '@tiptap/react'
import { IUpdatePostFormActions, IUpdatePostFormStates } from '@/src/types/post'
import useBlockEditor from '@/src/hooks/useBlockEditor'
import { formatDateToMDY } from '@/src/utils/client-utils'
import Avatar from '@/src/components/Avatar'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Line from '@/src/components/Line'
import { XStack, YStack } from '@/src/components/Stack'
import { TagsInput } from '@/src/components/TagsInput'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'
import EmotionGauge from '@/src/app/(playground)/(home)/_components/EmotionGauge'
import BubbleMenuBar from '@/src/app/(playground)/post/edit/_components/BubbleMenuBar'
import MobileOptionSection from '@/src/app/(playground)/post/edit/_components/MobileOptionSection'
import usePostSubmit from '@/src/app/(playground)/post/edit/_hooks/usePostSubmit'

interface Props {
  postId: number
  avatarUrl: string | null
  userName: string | null
  email: string
  formState: IUpdatePostFormStates
  actions: IUpdatePostFormActions
  meId: string
}

export default function PostForm({
  postId,
  avatarUrl,
  userName,
  email,
  formState,
  actions,
  meId,
}: Props) {
  const { editor } = useBlockEditor({
    setContent: actions.setContent,
    content: formState.content,
    editable: true,
    placeholder: '오늘 당신의 생각과 감정을 기록하세요.',
  })
  const { onSubmitPost, isPending, isSuccess } = usePostSubmit({
    meId,
    postId,
    formState,
  })

  const handleInputFocus = (editor: Editor | null) => {
    editor?.commands.focus('end')
  }

  return (
    <form
      onSubmit={onSubmitPost}
      className="h-fit w-full rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray"
    >
      <YStack gap={0}>
        <XStack gap={4}>
          <Avatar src={avatarUrl} size="sm" ring />
          <YStack gap={0} className="self-end">
            <XStack gap={1} className="items-end">
              <Title size="xs" type="sub">
                {userName}
              </Title>
              <TextDisplay as="span" type="caption" size="sm">
                · @{email?.split('@')[0]}
              </TextDisplay>
            </XStack>
            <TextDisplay type="caption" size="sm">
              {formatDateToMDY(new Date().getTime())}
            </TextDisplay>
          </YStack>
          <XStack className="flex-1 justify-end">
            <EmotionGauge
              emotionLevel={formState.emotionLevel}
              onClick={actions.onChangeEmotion}
            />
          </XStack>
        </XStack>
        <Line className="my-4" />
        <Input
          value={formState.title || ''}
          onChange={actions.onChangeTitle}
          disabled={meId === null}
          variant="secondary"
          dimension="none"
          className="my-4 w-full overflow-x-auto text-3xl"
          placeholder="제목을 입력해 주세요."
        />
        <YStack gap={0} className="max-h-full cursor-text">
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <BubbleMenuBar editor={editor} />
            </BubbleMenu>
          )}
          <EditorContent editor={editor} disabled={meId === null} />
          <div
            onClick={() => handleInputFocus(editor)}
            className="h-20 max-h-full w-full"
          />
        </YStack>
        <YStack>
          <TagsInput
            tags={formState.tags}
            setTags={actions.setTags}
            disabled={meId === null}
          />
          <XStack className="justify-between">
            <MobileOptionSection
              postType={formState.postType}
              accessType={formState.accessType}
              emotionLevel={formState.emotionLevel}
              onChangePostType={actions.onChangePostType}
              onChangeAccessType={actions.onChangeAccessType}
              onChangeEmotion={actions.onChangeEmotion}
            />

            <XStack className="flex-1 justify-end">
              <Button
                isLoading={isPending}
                disabled={
                  editor?.storage.characterCount.characters() === 0 ||
                  formState.tags.length > 10 ||
                  isSuccess
                }
                type="submit"
                size="sm"
              >
                등록하기
              </Button>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </form>
  )
}
