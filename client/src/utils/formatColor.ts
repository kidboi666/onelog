export const colorizeOpacity = (orderBy: number) => {
  if (orderBy) {
    if (orderBy <= 20) {
      return 'opacity-20'
    } else if (orderBy <= 40) {
      return 'opacity-40'
    } else if (orderBy <= 60) {
      return 'opacity-60'
    } else if (orderBy <= 80) {
      return 'opacity-80'
    } else {
      return 'opacity-100'
    }
  }
}
