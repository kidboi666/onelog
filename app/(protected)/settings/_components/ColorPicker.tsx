'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import Title from '@/components/shared/Title'
import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import { TColor } from '@/types/theme'

const colors: TColor[] = ['gray', 'green', 'yellow', 'blue', 'orange']

export default function ColorPicker() {
  const { color: currentColor, setColor } = useTheme()

  const handleColorChange = (selectedColor: TColor) => {
    setColor(selectedColor)
    // 색상 테마 설정 로직
  }
  console.log(currentColor)

  return (
    <div className="flex flex-col gap-2">
      <Title>색상 설정</Title>
      <List className="flex gap-2">
        {colors.map((color) => (
          <List.Row key={color}>
            <ColorBlock
              color={color}
              onClick={() => handleColorChange(color)}
              selectedColor={currentColor}
            />
          </List.Row>
        ))}
      </List>
    </div>
  )
}

interface ColorBlockProps {
  color: TColor
  onClick: (color: TColor) => void
  selectedColor: TColor
}

function ColorBlock({ color, onClick, selectedColor }: ColorBlockProps) {
  return (
    <Button
      variant="secondary"
      onClick={() => onClick(color)}
      className={cn(
        'size-20 rounded-md text-white ring-0',
        color === 'yellow' && 'bg-var-yellow',
        color === 'orange' && 'bg-var-orange',
        color === 'gray' && 'bg-var-gray',
        color === 'blue' && 'bg-var-blue',
        color === 'green' && 'bg-var-green',
      )}
    >
      {selectedColor === color && (
        <Icon view={20} size={34}>
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
