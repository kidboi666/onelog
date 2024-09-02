export const formatDateToYMD = (date: string | number) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')
  return `${year}.${month}.${day}`
}

export const formatDateToHMS = (date: string | number) => {
  const newDate = new Date(date)
  const hour = newDate.getHours().toString().padStart(2, '0')
  const minute = newDate.getMinutes().toString().padStart(2, '0')
  const second = newDate.getSeconds().toString().padStart(2, '0')
  return `${hour}.${minute}.${second}`
}

export const getSignUpDays = (date: string) => {
  const targetTime = new Date(date)
  const currentTime = new Date()
  const diffTime = Number(currentTime) - Number(targetTime)
  const result = Math.floor(diffTime / 86400000)

  if (result < 1) {
    return '방금 전'
  }

  return result
}
