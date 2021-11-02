import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import GetGuildConfig from "../../functions/GetGuildConfig";
import { GuildConfig } from "../../functions/Interfaces";
import Guilds from "../../models/Guild";
export const command: Command = {
   name: "al.changeres",
   description: "Change the anti response",
   category: "Antilink",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args.length) {
      return message.reply({content: `**${message.author.username}**, Missing required arguments. <message>`, embeds: [
         new MessageEmbed()
         .setDescription(`Messages formats can be found below:\n\`\`\`\n{{member}} - Mention the member\n{{member.user.tag}} - Get the members usernamed & tag\n{{member.user.username}} - Get the members usernamed\n{{member.id}} - Get the members id\n{{guild.name}} - Get the current guilds name\n{{guild.id}} - Get the current guilds id\n{{guild.icon}} - Get the current guilds icon ( 128px )\n{{channel}} - Mention the current channel\n{{channel.id}} - Get the current channels id \n\`\`\`\n*Previous message: ${(await GetGuildConfig(message.guild)).antiLinkRes}*`)
         .setColor(`#EA193B`)
      ]})
   } 
   await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
      antiLinkRes: args.join(" ")
   })
   message.reply({embeds: [
      new MessageEmbed()
      .setDescription(`Anti link message config updated to: ${args.join(" ")}`)
      .setColor(`#EA193B`)
   ]})
}