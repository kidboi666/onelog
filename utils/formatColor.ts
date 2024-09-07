import { ButtonProps } from '@/components/shared/Button'
import { TColor } from '@/types/theme'

export const formatColor = (color: TColor) => {
  switch (color) {
    case 'green':
      return 'text-var-green '
    case 'blue':
      return 'text-var-blue '
    case 'yellow':
      return 'text-var-yellow '
    case 'orange':
      return 'text-var-orange '
    case 'black':
      return 'text-var-black '
    default:
      'text-var-black dark:text-white'
      break
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
  switch (color) {
    case 'blue':
      return 'bg-var-blue ring-var-blue dark:bg-var-blue'
    case 'yellow':
      return 'bg-var-yellow ring-var-yellow dark:bg-var-yellow'
    case 'green':
      return 'bg-var-green ring-var-green dark:bg-var-green'
    case 'orange':
      return 'bg-var-orange ring-var-orange dark:bg-var-orange'
    case 'black':
      return 'bg-var-black dark:text-var-dark ring-var-black dark:bg-white dark:ring-white'
    default:
      break
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
