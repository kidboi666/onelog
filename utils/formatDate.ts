export const formatDateToYMD = (date: string | number) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear().toString().slice(2)
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const day = newDate.getDate().toString().padStart(2, '0')

  return `${year}. ${month}. ${day}`
}

export const formatDateToMDY = (date: string | number) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth() + 1
  const day = newDate.getDate()

  return `${month}월 ${day}일, ${year}`
}

export const formatDateToHM = (date: string | number) => {
  const newDate = new Date(date)
  const hour = newDate.getHours().toString().padStart(2, '0')
  const minute = newDate.getMinutes().toString().padStart(2, '0')

  return `${hour}:${minute}`
}

export const getSignUpDays = (date: string) => {
  const targetTime = new Date(date)
  const currentTime = new Date()
  const diffTime = Number(currentTime) - Number(targetTime)
  const result = Math.floor(diffTime / 86400000)

  if (result < 1) {
    return '오늘'
  }

  return result
}

/**
 * 인자로 주어진 년의 1월 1일의 요일을 구하는 함수
 */
export const getFirstDayInYear = (year: number) => {
  return new Date(year, 0, 1).getDay()
}

/**
 * 인자로 받는 년의 각 달의 일수를 구하는 함수
 */
export const getDaysInYear = (year: number) => {
  const daysInYear = []
  for (let month = 0; month < 12; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    daysInYear.push(daysInMonth)
  }
  return daysInYear
}
