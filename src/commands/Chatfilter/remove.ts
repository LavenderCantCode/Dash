import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import Guilds from "../../models/Guild";
import { GuildConfig } from "../../functions/Interfaces";
export const command: Command = {
   name: "cf.remove",
   description: "Remove a word from your chat filter.",
   category: "Chatfilter",
   permissions: ["ADMINISTRATOR"],
   usage: "cf.remove <word>"
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const serverConfig = await Guilds.findOne({guildId: message.guild.id})
   if(!args.length) {
      return message.reply({content: `**${message.author.username}**, Please supply a word you would like to remove from the chat filter.`})
   }
   if(!serverConfig.chatFilterWords.includes(args[0].toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, That word appears to not be in your saved chat filter config.`})
   }
   let index;
   serverConfig.chatFilterWords.forEach((word) => {
      if(word.toLowerCase() === args[0].toLowerCase()) {
         index = serverConfig.chatFilterWords.indexOf(word)
      }
   })
   serverConfig.chatFilterWords.splice(index)
   serverConfig.save()
   return message.reply({embeds: [
      new MessageEmbed()
      .setDescription(`Choosen word has been removed from the chat filter list.`)
        .setColor(`#EA193B`)
     ]})
}