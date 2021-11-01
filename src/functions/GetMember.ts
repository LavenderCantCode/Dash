import { Message } from "discord.js"

const GetMember = (args: Array<string>, message: Message) => {
   return message.mentions.members.first() || message.guild.members.cache.find(m => m.id === args[0].toLowerCase() || m.user.tag.toLowerCase() === args[0].toLowerCase())
}
export default GetMember
