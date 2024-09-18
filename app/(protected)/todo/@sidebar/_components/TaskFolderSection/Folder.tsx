import { useState } from 'react'
import cn from '@/lib/cn'
import { useTodo } from '@/store/useTodo'
import useOutsideClick from '@/hooks/useOutsideClick'
import useStateChange from '@/hooks/useStateChange'
import { INIT_TODO_FOLDER } from '../../default'

import Box from '@/components/shared/Box'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import FolderDropDown from './FolderDropDown'
import Dot from './Dot'
import Icon from '@/components/shared/Icon'

interface Props {
  isOpenSide: boolean
  folder: typeof INIT_TODO_FOLDER
}

export default function Folder({ isOpenSide, folder }: Props) {
  const { selectedFolder } = useTodo()
  const [showKebabButton, setShowKebabButton] = useState(false)
  const { setSelectFolder } = useTodo()
  const {
    ref: dropdownRef,
    close,
    onClick,
    onTransitionEnd,
  } = useStateChange<HTMLDivElement>()
  const dropdownButtonRef = useOutsideClick<HTMLButtonElement>(close)
  const isSelected = folder.id === selectedFolder?.id

  const handleFolderClick = () => {
    setSelectFolder(folder)
  }

  return (
    <Button
      onMouseEnter={() => setShowKebabButton(true)}
      onMouseLeave={() => setShowKebabButton(false)}
      variant="list"
      onClick={handleFolderClick}
      ref={dropdownButtonRef}
      className={cn('relative h-10', isOpenSide ? 'gap-4' : 'justify-center')}
    >
      <Dot color={folder.dotColor} isSelected={isSelected} />
      {isOpenSide && (
        <Box row className="flex-1 items-center justify-between">
          <Text
            type="caption"
            className={cn(
              'transition',
              isSelected ? 'text-zinc-600 dark:text-zinc-200' : '',
            )}
          >
            {folder?.name}
          </Text>
          {showKebabButton && (
            <Button
              variant="icon"
              size="none"
              onClick={onClick}
              className="ring-0 hover:bg-zinc-400 dark:hover:bg-zinc-600"
            >
              <Icon view="0 -960 960 960" size={20}>
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </Icon>
            </Button>
          )}
        </Box>
      )}
      <FolderDropDown
        targetRef={dropdownRef}
        onTransitionEnd={onTransitionEnd}
        folderId={folder.id}
      />
    </Button>
  )
}
