import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import Image from 'next/image'
import profileImage from '@/public/profile.svg'
import { ringTheme, useTheme } from '@/store/useTheme'

interface Props {
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl'
  ring?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  hoverEffect?: 'none' | 'ring'
  className?: string
  onClick?: () => void
}

const avatarVariants = cva(
  'relative flex-shrink-0 overflow-hidden rounded-full bg-zinc-400 dark:bg-var-darkgray',
  {
    variants: {
      size: {
        xs: 'size-8',
        sm: 'size-9',
        base: 'size-12',
        md: 'size-20',
        lg: 'size-40',
        xl: 'size-52',
      },
      ring: {
        none: '',
        xs: 'border border-zinc-200',
        sm: 'border-2 border-zinc-200',
        md: 'border-4 border-zinc-200',
        lg: 'border-8 border-zinc-200',
      },
      shadow: {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
      },
      hoverEffect: {
        none: '',
        ring: 'transition duration-300 ease-in-out hover:ring-4 group-hover:ring-4',
      },
    },
  },
)

export default function Avatar({
  src,
  size = 'md',
  ring = 'none',
  shadow = 'none',
  hoverEffect = 'ring',
  onClick,
  className,
}: Props) {
  const { color } = useTheme()
  return (
    <div
      onClick={onClick}
      className={cn(
        avatarVariants({ size, ring, shadow, hoverEffect }),
        ringTheme({ color }),
        className,
      )}
    >
      {src ? (
        <Image src={src} fill className="object-cover" alt="프로필 이미지" />
      ) : (
        <Image
          src={profileImage}
          fill
          alt="프로필 이미지 없음"
          className="object-cover"
        />
      )}
    </div>
  )
}
