'use client'

import cn from '@/src/lib/cn'
import { useTheme } from '@/src/store/hooks/useTheme'
import { Theme } from '@/src/types/enums/index'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import { XStack, YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme)
    localStorage.setItem('theme', theme)
    handleDocumentClass(theme)
  }

  const handleDocumentClass = (theme: Theme) => {
    if (theme === Theme.DARK) {
      document.documentElement.classList.add(Theme.DARK)
    } else {
      document.documentElement.classList.remove(Theme.DARK)
    }
  }

  return (
    <YStack>
      <Title>다크 모드 설정</Title>
      <XStack>
        <DarkModeBlock
          theme={Theme.DARK}
          selectedTheme={theme}
          onBlockClick={handleThemeChange}
        />
        <DarkModeBlock
          theme={Theme.LIGHT}
          selectedTheme={theme}
          onBlockClick={handleThemeChange}
        />
      </XStack>
    </YStack>
  )
}

interface DarkModeBlockProps {
  onBlockClick: (theme: Theme) => void
  theme: Theme
  selectedTheme: Theme
}

function DarkModeBlock({
  onBlockClick,
  theme,
  selectedTheme,
}: DarkModeBlockProps) {
  return (
    <Button
      onClick={() => onBlockClick(theme)}
      variant="none"
      size="sm"
      className={cn(
        'flex gap-2 rounded-md font-semibold ring-1',
        theme === 'light'
          ? 'bg-white text-sm text-black ring-1 ring-gray-400'
          : 'bg-var-black text-white ring-gray-500',
      )}
    >
      {theme === 'light' ? '밝은' : '어두운'} 화면
      {selectedTheme === theme && (
        <Icon view={20} size={20}>
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </Icon>
      )}
    </Button>
  )
}
