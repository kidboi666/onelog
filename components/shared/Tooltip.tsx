import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import { colorTheme, useTheme } from '@/store/useTheme'
import { useEffect } from 'react'

interface Props {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  size?: 'sm' | 'md' | 'lg'
  isHover?: boolean
  className?: string
}

const toolTipBox = cva(
  'absolute hidden transition duration-300 data-[status=closed]:-translate-x-1 data-[status=closed]:opacity-0',
  {
    variants: {
      position: {
        top: '-top-full',
        bottom: '-bottom-full',
        left: '-left-full',
        right: '-right-[calc(100%*2+4px)] top-1/2 -translate-y-1/2',
      },
      size: {
        sm: 'w-20',
        md: 'w-40',
        lg: 'w-60',
      },
    },
  },
)

const toolTipArrow = cva('absolute size-2 rotate-45', {
  variants: {
    position: {
      bottom: '-top-1 left-1/2 -translate-x-1/2',
      top: '-bottom-1 left-1/2 -translate-x-1/2',
      right: '-left-1 top-1/2 -translate-y-1/2',
      left: '-right-1 top-1/2 -translate-y-1/2',
    },
  },
})

export default function ToolTip({
  text,
  position = 'bottom',
  size = 'sm',
  isHover,
  className,
}: Props) {
  const { ref, open, close, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const { color } = useTheme()

  useEffect(() => {
    isHover ? open() : close()
  }, [isHover])

  return (
    <div
      ref={ref}
      data-status="closed"
      onTransitionEnd={onTransitionEnd}
      className={cn(toolTipBox({ position, size }), className)}
    >
      <div
        className={cn(
          'relative flex size-fit items-center justify-center rounded-md px-2 py-2 shadow-md',
          colorTheme({ color }),
        )}
      >
        <div
          className={cn(toolTipArrow({ position }), colorTheme({ color }))}
        />
        <span className="text-xs text-white">{text}</span>
      </div>
    </div>
  )
}
