import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
const actionTypes = ["delete","warn","kick","ban"]
import GetGuildConfig from "../../functions/GetGuildConfig";
import { GuildConfig } from "../../functions/Interfaces";
import Guilds from "../../models/Guild";

export const command: Command = {
   name: "cf.action.add",
   description: "Add an action for the chat filter config",
   category: "Chatfilter",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args.length || !actionTypes.includes(args[0].toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, Please supply a valid action type that you would like to add: \`${actionTypes.join("`, `")}\``})
   }
   const serverConfig = await GetGuildConfig(message.guild)
   if(serverConfig.chatFilterAction.includes(args[0].toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, This action is already in your chat filter config. If you would like to remove it please use \`${serverConfig.prefix}cf.action.remove ${args[0].toLowerCase()}\``})
   }
   await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
      $push: {
         chatFilterAction: [args[0].toLowerCase()]
      }
   })
   return message.reply({embeds: [
      new MessageEmbed()
      .setDescription(`\`${args[0].toLowerCase()}\` has been added to your chat filter action config.`)
        .setColor(`#EA193B`)
     ]})
}