import { ButtonProps } from '@/components/shared/Button'
import { TColor } from '@/types/theme'

export const formatColor = (color: TColor) => {
  if (color === 'green' && 'text-var-green') {
    return 'text-var-green dark:text-var-green'
  }
  if (color === 'blue' && 'text-var-blue') {
    return 'text-var-blue dark:text-var-blue'
  }
  if (color === 'yellow' && 'text-var-yellow') {
    return 'text-var-yellow dark:text-var-yellow'
  }
  if (color === 'orange' && 'text-var-orange') {
    return 'text-var-orange dark:text-var-orange'
  }
  if (color === 'black' && 'text-var-black') {
    return 'text-var-black dark:text-var-black'
  }
}

export const formatButtonColor = (
  color: TColor,
  variant: ButtonProps['variant'],
) => {
  if (color === 'blue' && variant === 'primary') {
    return 'bg-var-blue ring-var-blue'
  }
  if (color === 'yellow' && variant === 'primary') {
    return 'bg-var-yellow ring-var-yellow'
  }
  if (color === 'green' && variant === 'primary') {
    return 'bg-var-green ring-var-green'
  }
  if (color === 'orange' && variant === 'primary') {
    return 'bg-var-orange ring-var-orange'
  }
  if (color === 'black' && variant === 'primary') {
    return 'bg-var-black ring-var-black dark:bg-white dark:text-var-dark dark:ring-white'
  }
}

export const formatBlockColor = (color: TColor) => {
  if (color === 'blue') {
    return 'bg-var-blue ring-var-blue dark:bg-var-blue'
  }
  if (color === 'yellow') {
    return 'bg-var-yellow ring-var-yellow dark:bg-var-yellow'
  }
  if (color === 'green') {
    return 'bg-var-green ring-var-green dark:bg-var-green'
  }
  if (color === 'orange') {
    return 'bg-var-orange ring-var-orange dark:bg-var-orange'
  }
  if (color === 'black') {
    return 'bg-var-black dark:text-var-dark ring-var-black dark:bg-white dark:ring-white'
  }
}

export const colorizeOpacity = (orderBy: number, cutLine: number[]) => {
  if (orderBy) {
    if (orderBy <= cutLine[0]) {
      return 'opacity-25'
    } else if (orderBy <= cutLine[1]) {
      return 'opacity-50'
    } else if (orderBy <= cutLine[2]) {
      return 'opacity-75'
    } else {
      return 'opacity-100'
    }
  }
}
