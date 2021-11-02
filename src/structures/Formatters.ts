import { GuildMember } from "discord.js"

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

export const DefaultFormatter = (msg: string, member: GuildMember) => {
   let res = msg
   let values = [
      { trigger: "{{member}}", value: `<@${member.id}>`, },
      { trigger: "{{member.user.tag}}", value: `${member.user.tag}`, },
      { trigger: "{{member.user.username}}", value: `${member.user.username}`, },
      { trigger: "{{member.id}}", value: `${member.id}`, }
   ]
   for(let {trigger, value} of values) res = res.replace(new RegExp(trigger, "igm"), value)
   return res
}