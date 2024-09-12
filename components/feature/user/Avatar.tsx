import Box from '@/components/shared/Box'
import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import Image from 'next/image'

interface Props {
  src?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  ring?: 'none' | 'xs' | 'sm' | 'md' | 'lg'
  className?: string
}

const avatarVariants = cva('', {
  variants: {
    size: {
      sm: 'size-10',
      md: 'size-20',
      lg: 'size-40',
      xl: 'size-52',
    },
    ring: {
      none: '',
      xs: 'border border-white ring-1 ring-gray-400',
      sm: 'border-2 border-white ring-1 ring-gray-400',
      md: 'border-4 border-white ring-1 ring-gray-400',
      lg: 'border-8 border-white ring-1 ring-gray-400',
    },
  },
})

export default function Avatar({
  src,
  size = 'md',
  ring = 'none',
  className,
}: Props) {
  return (
    <Box
      className={cn(
        avatarVariants({ size, ring }),
        'relative flex-shrink-0 overflow-hidden rounded-full bg-gray-400',
        className,
      )}
    >
      {src ? (
        <Image src={src} fill className="object-cover" alt="프로필 이미지" />
      ) : (
        <Image src="profile.svg" fill className="" alt="프로필 이미지 없음" />
      )}
    </Box>
  )
}
