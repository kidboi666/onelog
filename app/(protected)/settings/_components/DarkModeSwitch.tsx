'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import { TTheme } from '@/types/theme'

export default function DarkModeSwitch() {
  const { theme, setTheme } = useTheme()
  const handleThemeClick = (selectedTheme: TTheme) => {
    setTheme(selectedTheme)
    // 다크 모드 테마 설정 로직
  }

  return (
    <div className="flex flex-col gap-2">
      <Title>다크 모드 설정</Title>
      <div className="flex gap-2">
        <DarkModeBlock
          theme="dark"
          selectedTheme={theme}
          onBlockClick={handleThemeClick}
        />
        <DarkModeBlock
          theme="light"
          selectedTheme={theme}
          onBlockClick={handleThemeClick}
        />
      </div>
    </div>
  )
}

interface DarkModeBlockProps {
  onBlockClick: (theme: TTheme) => void
  theme: TTheme
  selectedTheme: TTheme
}

function DarkModeBlock({
  onBlockClick,
  theme,
  selectedTheme,
}: DarkModeBlockProps) {
  return (
    <Button
      onClick={() => onBlockClick(theme)}
      variant={theme === 'light' ? 'secondary' : 'primary'}
      className={cn(
        'size-20 flex-col font-semibold',
        theme === 'light' ? 'text-sm' : 'text-xs',
      )}
    >
      {theme === 'light' ? '밝은' : '어두운'} 화면
      {selectedTheme === theme && (
        <Icon view={20} size={24}>
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          ></path>
        </Icon>
      )}
    </Button>
  )
}
