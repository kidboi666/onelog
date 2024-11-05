import Icon from '@/components/shared/Icon'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import { MouseEvent } from 'react'
import { DropDown } from '@/components/shared/DropDown'
import { useRouter } from 'next/navigation'

interface Props {
  meId?: string | null
  sentenceUserId?: string
  sentenceId?: number
}

export default function OptionButtonWithDropDown({
  meId,
  sentenceUserId,
  sentenceId,
}: Props) {
  const router = useRouter()
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const optionButtonRef = useOutsideClick<HTMLButtonElement>(close)
  const isOwner = meId === sentenceUserId

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  const pushDeleteModal = (e: MouseEvent) => {
    e.stopPropagation()
    router.push(`/delete_sentence?sentence_id=${sentenceId}`)
  }

  const pushWritePage = (e: MouseEvent) => {
    e.stopPropagation()
    router.push(`/write/sentence/?sentence_id=${sentenceId}`)
  }

  return (
    <DropDown.Root>
      <DropDown.Trigger
        targetRef={optionButtonRef}
        size="icon"
        onClick={handleButtonClick}
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </Icon>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position="topLeft"
        onTransitionEnd={onTransitionEnd}
        className="p-0"
      >
        <DropDown.Button
          variant="list"
          size="sm"
          onClick={() => null}
          className="w-full gap-2"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
          </Icon>
          신고하기
        </DropDown.Button>
        {isOwner && (
          <>
            <DropDown.Button
              variant="list"
              size="sm"
              onClick={pushWritePage}
              className="w-full gap-2"
            >
              <Icon view="0 -960 960 960" size={18}>
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </Icon>
              수정하기
            </DropDown.Button>
            <DropDown.Button
              variant="list"
              size="sm"
              onClick={pushDeleteModal}
              className="w-full gap-2"
            >
              <Icon view="0 -960 960 960" size={18}>
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </Icon>
              삭제하기
            </DropDown.Button>
          </>
        )}
      </DropDown.Content>
    </DropDown.Root>
  )
}
