import cn from '@/lib/cn'
import Icon from './Icon'

interface Props {
  size?: number
  className?: string
}

export default function Spinner({ size = 40, className }: Props) {
  return (
    <div
      className={cn(
        'flex justify-center text-zinc-800 dark:text-zinc-200',
        className,
      )}
    >
      <Icon size={size} view={100}>
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93485265729915 56.972477469788485"
          transform="rotate(360 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            dur="1s"
            repeatCount="indefinite"
            values="0 50 50;360 50 50"
          ></animateTransform>
        </circle>
      </Icon>
    </div>
  )
}
