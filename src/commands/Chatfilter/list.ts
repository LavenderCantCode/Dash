import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import GetGuildConfig from "../../functions/GetGuildConfig";

export const command: Command = {
   name: "cf.list",
   description: "See the current chat filter words.",
   category: "Chatfilter",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const serverConfig = await GetGuildConfig(message.guild)
   if(serverConfig.chatFilterWords.length <= 0 ) {
      return message.reply({content: `**${message.author.username}**, This server has no saved words to its chat filter.`})
   } else {
      message.author.send({embeds: [
         new MessageEmbed()
         .setColor(`#EA193B`)
         .setDescription(`\`${serverConfig.chatFilterWords.join("`, `")}\``)
         .setAuthor(`Chat filter for: ${message.guild.name}`)
      ]}).catch((err) => {
         message.reply({content: `**${message.author.username}**, Failed to dm you the list of words. Please unblock me / open your server dms.`})
      })
   }
}