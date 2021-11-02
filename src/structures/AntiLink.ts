import Guilds from "../models/Guild"
import { GuildConfig } from "../functions/Interfaces"
import GetGuildConfig from "../functions/GetGuildConfig"
import { Message } from "discord.js"
import { DefaultFormatter } from "./Formatters"
import { Warn } from "./Moderation"
import Dash from "./Client"

export const AddLink = async (link: string, message: Message) => {
   const guild = await GetGuildConfig(message.guild)
   if(guild.antiLinks.includes(link)) {
      return "This link already exists in your config."
   } else {
      await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
         $push: {
            antiLinks: [link.replace("https://", "").replace("http://", "")]
         }
      })
      return `Added \`${link}\` to your anti link config.`
   }
}

export const RemoveLink = async (link: string, message: Message) => {
   const guild = await GetGuildConfig(message.guild) as any
   if(!guild.antiLinks.includes(link)) {
      return "That link appears to not be in your anti link config."
   } else {
      let index;
      guild.antiLinks.forEach((x) => {
         if(x === link) {
            index = guild.antiLinks.indexOf(x)
         }
      })
      guild.antiLinks.splice(index)
      guild.save()
      return `Removed \`${link}\` from your anti link config.`
   }
}

export const GetLinks = async (message: Message) => {
   const guild = await GetGuildConfig(message.guild)
   if(guild.antiLinks.length <= 0) {
      return  {
         status: "failed",
         msg: "You have no links saved in your anti link config."
      }
   } else {
      const arr: Array<string> = []
      guild.antiLinks.forEach((link) => { arr.push(link) })
      return {
         status: "success",
         msg: "none",
         arr: arr,
      }
   }
}

export const Toggle = async (message: Message) => {
   let value
   let type;
   const guild = await GetGuildConfig(message.guild)
   if(guild.antiLink === false) {
      value = true
      type = "enabled"
   } else {
      value = false
      type = "disabled"
   }
   await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
      antiLink: value,
   })
   return `Anti link has now been ${type}.`
}


/**
 * The main function, actually does the anti link
 */
export const AntiLink = async (message: Message, client: Dash) => {
   if(message.author.bot || !message.guild) return;
   const guild = await GetGuildConfig(message.guild)
   if(guild.antiLink) {
      guild.antiLinks.forEach((link) => {

         const Regex = new RegExp(`(https?:\/\/)?(www.\.)?(${link})\/.+[a-z]`, "gim")
         const RegexWithoutRoute = new RegExp(`(https?:\/\/)?(www.\.)?(${link})`, "gim")
         message.content.split(" ").forEach((arg) => {
         if(client.config.blackListedLinks.includes(arg)) return;
            if(message.member.permissions.has("ADMINISTRATOR")) return;
            if(Regex.test(arg) || RegexWithoutRoute.test(arg)) {
               Warn(message.member, "Anti link triggered. [AUTOMOD]", message, message.guild.members.cache.find(m => m.id === client.user.id))
               if(!guild.deleteModerationMessage) { message.delete() }
               message.channel.send({content: `${DefaultFormatter(guild.antiLinkRes, message.member)}`})
            }
         })
      })
   }
}