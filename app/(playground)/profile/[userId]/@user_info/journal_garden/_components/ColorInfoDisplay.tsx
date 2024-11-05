import Text from '@/components/shared/Text'
import Block from './Block'

export default function ColorInfoDisplay() {
  return (
    <div className="flex items-center gap-2 self-end">
      <Text type="caption" size="sm" className="leading-none">
        아주나쁨
      </Text>
      <Block disabled average={20} />
      <Block disabled average={40} />
      <Block disabled average={60} />
      <Block disabled average={80} />
      <Block disabled average={100} />
      <Text type="caption" size="sm">
        아주좋음
      </Text>
    </div>
  )
}
