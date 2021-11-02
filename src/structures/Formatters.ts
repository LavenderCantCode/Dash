import { GuildMember, Message } from "discord.js"

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

export const DefaultFormatter = (msg: string, member: GuildMember, message: Message) => {
   let res = msg
   let values = [
      { trigger: "{{member}}", value: `<@${member.id}>`, },
      { trigger: "{{member.user.tag}}", value: `${member.user.tag}`, },
      { trigger: "{{member.user.username}}", value: `${member.user.username}`, },
      { trigger: "{{member.id}}", value: `${member.id}`, },
      { trigger: "{{guild.name}}", value: `${message.guild.name}`, },
      { trigger: "{{guild.id}}", value: `${message.guild.id}`, },
      { trigger: "{{guild.icon}}", value: `${message.guild.iconURL({dynamic: true, size: 128})}`, },
      { trigger: "{{channel}}", value: `<#${message.channel.id}>`, },
      { trigger: "{{channel.id}}", value: `${message.channel.id}`, },
   ]
   for(let {trigger, value} of values) res = res.replace(new RegExp(trigger, "igm"), value)
   return res
}