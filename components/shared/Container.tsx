import { ComponentProps, PropsWithChildren } from 'react'

interface ContainerProps extends ComponentProps<'div'> {
  className?: string
  as?: 'div' | 'nav' | 'header' | 'main' | 'footer' | 'article' | 'section'
}

export const Container = ({
  children,
  className,
  as: Component = 'div',
  ...props
}: PropsWithChildren<ContainerProps>) => {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  )
}

Container.displayName = 'Container'
