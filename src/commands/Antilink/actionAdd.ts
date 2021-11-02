import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
const actionTypes = ["delete","warn","kick","ban"]
import GetGuildConfig from "../../functions/GetGuildConfig";
import { GuildConfig } from "../../functions/Interfaces";
import Guilds from "../../models/Guild";

export const command: Command = {
   name: "al.action.add",
   description: "Add an action for the anti link",
   category: "Antilink",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args.length || !actionTypes.includes(args[0].toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, Please supply a valid action type that you would like to add: \`${actionTypes.join("`, `")}\``})
   }
   const serverConfig = await GetGuildConfig(message.guild)
   if(serverConfig.antiLinkAction.includes(args[0].toLowerCase())) {
      return message.reply({content: `**${message.author.username}**, This action is already in your antilink config. If you would like to remove it please use \`${serverConfig.prefix}al.action.remove ${args[0].toLowerCase()}\``})
   }
   await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
      $push: {
         antiLinkAction: [args[0].toLowerCase()]
      }
   })
   return message.reply({embeds: [
      new MessageEmbed()
      .setDescription(`\`${args[0].toLowerCase()}\` has been added to your antilink action config.`)
        .setColor(`#EA193B`)
     ]})
}