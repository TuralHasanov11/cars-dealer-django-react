export function getFullDate(date){
  return new Date(date).toISOString().replace(/T.*/,'').split('-').reverse().join('-')
}

