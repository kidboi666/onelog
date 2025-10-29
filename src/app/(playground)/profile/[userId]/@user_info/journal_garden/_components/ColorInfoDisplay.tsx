import Block from './Block'

export default function ColorInfoDisplay() {
  return (
    <div className="flex items-center gap-2 self-end">
      <span className="text-muted-foreground text-xs leading-none">
        아주나쁨
      </span>
      <Block disabled average={20} />
      <Block disabled average={40} />
      <Block disabled average={60} />
      <Block disabled average={80} />
      <Block disabled average={100} />
      <span className="text-muted-foreground text-xs leading-none">
        아주좋음
      </span>
    </div>
  )
}
