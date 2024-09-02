interface Props {
  size?: Size
}

export enum Size {
  s = 20,
  m = 40,
  l = 60,
}

export default function Spinner({ size = Size.m }: Props) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#000"
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
    </svg>
  )
}
