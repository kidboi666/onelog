import Button from '@/components/shared/Button'
import Text from '@/components/shared/Text'
import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import { colorizeOpacity, formatBlockColor } from '@/utils/formatColor'

interface Props {
  level: number
}

export default function Emotion({ level }: Props) {
  const { color } = useTheme()
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="emptyStyle"
        size="emptyStyle"
        className="size-3 overflow-hidden rounded-[4px] border-[1.4px] border-gray-400 dark:border-gray-400"
      >
        <div
          className={cn(
            'size-full opacity-0 hover:opacity-55',
            formatBlockColor(color),
            level && `${colorizeOpacity(level, [25, 50, 75])}`,
          )}
        />
      </Button>
      <Text type="caption" size="xs">
        {level.toString().padStart(2, '0')}%
      </Text>
    </div>
  )
}
