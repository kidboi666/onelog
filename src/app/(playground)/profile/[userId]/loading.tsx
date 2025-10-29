import { Loader2 } from 'lucide-react'

export default function Loading() {
  return (
    <div className="flex min-h-[400px] items-center justify-center">
      <Loader2 className="size-8 animate-spin text-muted-foreground" />
    </div>
  )
}
