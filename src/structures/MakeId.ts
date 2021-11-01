const MakeId = () => {
   let str: string = ""
   let chars: string = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiooasdfghjklzxcvbnm___"
   for(let i = 0; i < 20; i++) {
      str += chars[Math.floor(Math.random() * chars.length)]
   }
   return str
}

export default MakeId