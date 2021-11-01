
export const StringFormatter = (string: string) => {
   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const UnderlineFormatter = (string: string) => {
   let words = []
   string.split("_").forEach((word) => {
      if(string.split("_").indexOf(word) === 0) {
         words.push(StringFormatter(word))
      } else {
         words.push(word.toLowerCase())
      }
   })
   return words.join(" ")
}