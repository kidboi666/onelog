'use client'

import cn from '@/src/lib/cn'
import { colorTheme, useTheme } from '@/src/store/hooks/useTheme'
import { ColorScheme } from '@/src/types/enums'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import { List } from '@/src/components/List'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function ColorPicker() {
  const { color: currentColor, setColor } = useTheme()

  const handleColorChange = (selectedColor: ColorScheme) => {
    setColor(selectedColor)
    localStorage.setItem('color-theme', selectedColor)
  }

  return (
    <YStack>
      <Title>색상 설정</Title>
      <List className="flex gap-4 overflow-y-auto">
        {Object.values(ColorScheme).map((color) => (
          <List.Row key={color}>
            <ColorBlock
              color={color}
              onClick={() => handleColorChange(color)}
              selectedColor={currentColor}
            />
          </List.Row>
        ))}
      </List>
    </YStack>
  )
}

interface ColorBlockProps {
  color: ColorScheme
  onClick: (color: ColorScheme) => void
  selectedColor: ColorScheme
}

function ColorBlock({ color, onClick, selectedColor }: ColorBlockProps) {
  return (
    <Button
      variant="secondary"
      onClick={() => onClick(color)}
      className={cn(
        colorTheme({ color }),
        'size-14 rounded-full border text-white ring-0 dark:border-gray-500',
      )}
    >
      {selectedColor === color && (
        <Icon view={20} size={34}>
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
