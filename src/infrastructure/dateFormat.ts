import * as fns from 'date-fns'

const format = (date: Date | string, format: string = 'Pp') => {
  const newDate = typeof date === 'string' ? new Date(date) : date
  return fns.format(newDate, format)
}

export default { format }
