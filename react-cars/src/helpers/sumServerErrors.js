function handler(errors){
  let result = []
  for (const key in errors) {
    if(Array.isArray(errors[key])){
      result.concat(errors[key])
    }else{
      result.push(errors[key])
    }
  }

  return result
}

export default handler