import Icon from './Icon'

interface Props {
  size?: number
  className?: string
}

export default function Spinner({ size = 40 }: Props) {
  return (
    <div className="flex size-full items-center justify-center">
      <Icon
        size={size}
        view={100}
        className="animate-spin text-zinc-800 dark:text-zinc-200"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          r="35"
          strokeDasharray="164.93485265729915 56.972477469788485"
        ></circle>
      </Icon>
    </div>
  )
}
