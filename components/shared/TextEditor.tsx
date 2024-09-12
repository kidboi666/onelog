import cn from '@/lib/cn'
import { cva } from 'class-variance-authority'
import { FormEvent, forwardRef, useImperativeHandle, useRef } from 'react'

interface Props {
  content?: string
  onInput?: (e: FormEvent<HTMLDivElement>) => void
  onBlur?: () => void
  className?: string
  variant?: 'primary'
  placeholder?: string
  size?: 'sm' | 'md' | 'lg'
}

const TEXT_EDITOR_VARIANTS = cva('outline-none', {
  variants: {
    variant: {
      primary:
        'rounded-md bg-white shadow-sm ring-gray-200 transition focus:ring-4 dark:bg-var-darkgray dark:text-white dark:ring-white/20',
    },
    size: {
      sm: 'p-2 text-xs',
      md: 'p-4 text-sm',
      lg: 'p-4 text-base',
    },
  },
})

const TextEditor = forwardRef<HTMLDivElement, Props>(
  (
    {
      content = '',
      onInput,
      onBlur,
      className,
      placeholder,
      variant = 'primary',
      size = 'md',
    },
    ref,
  ) => {
    const localRef = useRef<HTMLDivElement>(null)

    // 외부에서 ref를 통해 접근할 수 있도록 설정
    useImperativeHandle(ref, () => localRef.current as HTMLDivElement)

    // 컴포넌트 렌더링 후 ref를 통해 innerHTML 동기화
    if (localRef.current && localRef.current.innerHTML !== content) {
      localRef.current.innerHTML = content
    }
    return (
      <div
        contentEditable
        ref={ref}
        onBlur={onBlur}
        onInput={onInput}
        dangerouslySetInnerHTML={{ __html: content }}
        data-placeholder={placeholder}
        className={cn(TEXT_EDITOR_VARIANTS({ variant, size }), className)}
      />
    )
  },
)

export default TextEditor
