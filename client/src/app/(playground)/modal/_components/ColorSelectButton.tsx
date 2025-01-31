import cn from '@/src/lib/cn/index'
import { FolderColor } from '@/src/types/enums/index'
import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'

interface Props {
  selectedColor: FolderColor
  color: FolderColor
  onColorClick: (color: FolderColor) => void
}

export default function ColorSelectButton({
  selectedColor,
  color,
  onColorClick,
}: Props) {
  return (
    <Button
      key={selectedColor}
      variant="none"
      onClick={() => onColorClick(selectedColor)}
      className={cn(
        'relative size-4 rounded-full',
        selectedColor === FolderColor.YELLOW && 'bg-var-yellow',
        selectedColor === FolderColor.ORANGE && 'bg-var-orange',
        selectedColor === FolderColor.BLACK && 'bg-var-black',
        selectedColor === FolderColor.BLUE && 'bg-var-blue',
        selectedColor === FolderColor.GREEN && 'bg-var-green',
        selectedColor === FolderColor.RED && 'bg-red-500',
        selectedColor === FolderColor.PURPLE && 'bg-purple-500',
      )}
    >
      {selectedColor === color && (
        <Icon size={18} view={20} className="absolute text-white">
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
