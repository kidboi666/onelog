import cn from '@/lib/cn'

interface Props {
  className?: string
}

export default function Line({ className }: Props) {
  return <hr className={cn(className)} />
}
