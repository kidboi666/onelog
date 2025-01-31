import { RefObject } from 'react'
import { ITodoFolder } from '@/src/types/dtos/todo'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import { XStack, ZStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'
import TaskOptionDropDown from '@/src/app/(playground)/todo/_components/TaskOptionDropDown'

interface Props {
  currentFolder?: ITodoFolder
  dropdownRef: RefObject<HTMLButtonElement>
  targetRef: RefObject<HTMLDivElement>
  onTransitionEnd: () => void
  onClick: () => void
}

export default function TaskHeader({
  currentFolder,
  dropdownRef,
  targetRef,
  onTransitionEnd,
  onClick,
}: Props) {
  return (
    <XStack className="items-center justify-between">
      <Title className="text-nowrap">{currentFolder?.name}</Title>
      <ZStack>
        <Button ref={dropdownRef} variant="icon" size="none" onClick={onClick}>
          <Icon view="0 -960 960 960" size={20}>
            <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
          </Icon>
        </Button>
        <TaskOptionDropDown
          folderId={currentFolder?.id}
          targetRef={targetRef}
          onTransitionEnd={onTransitionEnd}
        />
      </ZStack>
    </XStack>
  )
}
