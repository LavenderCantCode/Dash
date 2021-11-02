import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import Guilds from "../../models/Guild";
import ErrorLog from "../../functions/ErrorLogs";
const types = ["add","remove","update"]
export const command: Command = {
   name: "errorlog",
   description: "Add / remove / update your error log channel.",
   category: "Config",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const [type, ...channel] = args
   if(!type || !types.includes(type.toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, Please supply a valid type: \`${types.join("`, `")}\``})
   }
   const errorLogChannel = message.mentions.channels.first() || message.guild.channels.cache.find(c => c.id === channel[0] || c.name.toLowerCase() === channel.join(" ").toLowerCase()) || message.channel
   if(type.toLowerCase() === "add" || type.toLowerCase() === "update") {
      await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
         errorLogChannel: errorLogChannel.id
      })

      await ErrorLog("Test", message.guild)
      return message.reply({embeds: [
         new MessageEmbed()
         .setDescription(`Error log channel has been updated to <#${errorLogChannel.id}>.`)
           .setColor(`#EA193B`)
        ]})
   } else if(type.toLowerCase() === "remove") {
      await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
         errorLogChannel: "none"
      })
      return message.reply({embeds: [
         new MessageEmbed()
         .setDescription(`Error log channel has been reset.`)
           .setColor(`#EA193B`)
        ]})
   }
}