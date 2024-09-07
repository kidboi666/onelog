'use client'

import { useTheme } from '@/store/useTheme'
import Icon from './Icon'
import { formatColor } from '@/utils/formatColor'
import Button from './Button'

interface Props {
  size?: 20 | 40 | 60
}

export default function Spinner({ size = 40 }: Props) {
  const { color } = useTheme()
  return (
    <Button
      disabled
      variant="emptyStyle"
      size="emptyStyle"
      className={formatColor(color)}
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
    </Button>
  )
}
