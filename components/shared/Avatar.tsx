import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import Image from 'next/image'
import profileImage from '@/public/profile.svg'

interface Props {
  src?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  ring?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  shadow?: 'none' | 'sm' | 'md' | 'lg'
  hoverEffect?: 'none' | 'ring'
  className?: string
  onClick?: () => void
}

const avatarVariants = cva('', {
  variants: {
    size: {
      xs: 'size-8',
      sm: 'size-10',
      md: 'size-20',
      lg: 'size-40',
      xl: 'size-52',
    },
    ring: {
      none: '',
      xs: 'border border-zinc-200 ring-1 ring-zinc-400',
      sm: 'border-2 border-zinc-200 ring-1 ring-zinc-400',
      md: 'border-4 border-zinc-200 ring-1 ring-zinc-400',
      lg: 'border-8 border-zinc-200 ring-1 ring-zinc-400',
    },
    shadow: {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    },
    hoverEffect: {
      none: '',
      ring: 'ring-zinc-400 transition duration-300 ease-in-out hover:ring-4 group-hover:ring-4',
    },
  },
})

export default function Avatar({
  src,
  size = 'md',
  ring = 'none',
  shadow = 'none',
  hoverEffect = 'ring',
  onClick,
  className,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={cn(
        avatarVariants({ size, ring, shadow, hoverEffect }),
        'relative flex-shrink-0 overflow-hidden rounded-full bg-zinc-400 dark:bg-var-darkgray',
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
