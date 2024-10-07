import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import { RefObject } from 'react'
import Avatar from '../../user/Avatar'
import Title from '@/components/shared/Title'

interface Props {
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  avatarUrl: string | null
  userName: string | null
}

export default function SentenceOwnerInfoDropDown({
  targetRef,
  onTransitionEnd,
  avatarUrl,
  userName,
}: Props) {
  return (
    <div
      ref={targetRef}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className="absolute left-1/2 top-full z-30 hidden size-fit origin-top -translate-x-1/2 transition data-[status=closed]:scale-95 data-[status=closed]:opacity-0"
    >
      <div className="flex flex-col gap-2 text-nowrap bg-white p-2 shadow-md dark:bg-var-darkgray">
        <div className="flex flex-col items-center gap-2">
          <Avatar src={avatarUrl} size="sm" hoverEffect="none" />
          <Title type="sub" size="sm">
            {userName}
          </Title>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <Text size="sm" type="caption">
              팔로잉
              <Text as="span" size="sm">
                4명
              </Text>
            </Text>
            <Text size="sm" type="caption">
              팔로워
              <Text as="span" size="sm">
                24명
              </Text>
            </Text>
          </div>
          <Button size="sm">팔로우 하기</Button>
        </div>
      </div>
    </div>
  )
}
