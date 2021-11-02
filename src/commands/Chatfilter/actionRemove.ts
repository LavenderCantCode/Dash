import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
const actionTypes = ["delete","warn","kick","ban"]
import GetGuildConfig from "../../functions/GetGuildConfig";
import { GuildConfig } from "../../functions/Interfaces";
import Guilds from "../../models/Guild";

export const command: Command = {
   name: "cf.action.remove",
   description: "Remove an action for the chat filter config",
   category: "Chatfilter",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args.length || !actionTypes.includes(args[0].toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, Please supply a valid action type that you would like to add: \`${actionTypes.join("`, `")}\``})
   }
   const serverConfig = await Guilds.findOne({guildId: message.guild.id})
   if(!serverConfig.chatFilterAction.includes(args[0].toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, This action is not saved in your chat filter config. If you would like to add it please use: \`${serverConfig.prefix}cf.action.add ${args[0].toLowerCase()}\``})
   }
   let index;
   serverConfig.chatFilterAction.forEach((link) => {
      if(link === args[0]) {
         index = serverConfig.chatFilterAction.indexOf(link)
      }
   })
   serverConfig.chatFilterAction.splice(index)
   serverConfig.save()
   return message.reply({embeds: [
      new MessageEmbed()
      .setDescription(`\`${args[0].toLowerCase()}\` has been removed from your chat filter action config.`)
        .setColor(`#EA193B`)
     ]})
}