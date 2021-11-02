import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import GetGuildConfig from "../../functions/GetGuildConfig";
export const command: Command = {
   name: "al.action.list",
   description: "See all your antilink action config",
   category: "Antilink",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const serverConfig = await GetGuildConfig(message.guild)
   if(serverConfig.antiLinkAction.length <= 0) {
      return message.reply({content: `**${message.author.username}**, You have no current actions added. If you would like to add one please run \`${serverConfig.prefix}al.action.add <type>\``})
   } else {
      return message.reply({embeds: [
         new MessageEmbed()
         .setDescription(`\`${serverConfig.antiLinkAction.join("`, `")}\``)
           .setColor(`#EA193B`)
        ]})
   }
}