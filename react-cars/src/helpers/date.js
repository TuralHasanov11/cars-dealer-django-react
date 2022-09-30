export function getFullDate(date){
  date = new Date(date)
  return date.toLocaleDateString('en-US')
}

