import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import GetGuildConfig from "../../functions/GetGuildConfig";
import Guilds from "../../models/Guild";

export const command: Command = {
   name: "cf.add",
   description: "Add a word to your chat filter config.",
   category: "Chatfilter",
   permissions: ["ADMINISTRATOR"],
   usage: "cf.add <word> [word ...]"
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const serverConfig = await Guilds.findOne({guildId: message.guild.id})
   if(!args.length) {
      return message.reply({content: `**${message.author.username}**, Please supply a word you would like to add to the chat filter.`})
   }
   let words = []
   args.forEach((arg) => { words.push(arg.toLowerCase())})
   await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
      $push: {
         chatFilterWords: words
      }
   })
   return message.reply({embeds: [
      new MessageEmbed()
      .setDescription(`Added choosen words to the chat filter.`)
        .setColor(`#EA193B`)
     ]})
}