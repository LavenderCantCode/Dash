import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { Warn } from "../../structures/Moderation"
import GetMember from "../../functions/GetMember";
import GetGuildConfig from "../../functions/GetGuildConfig";
import { GuildConfig } from "../../functions/Interfaces"
export const command: Command = {
   name: "warn",
   description: "Warn a member!",
   category: "Moderation",
   permissions: ["MANAGE_MESSAGES"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const serverConfig = await GetGuildConfig(message.guild)
   if(!args.length) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. \`<member>\``})
   }
   const member = GetMember(args, message)
   if(!member) {
     return message.reply({content: `**${message.author.username}**, Missing required argument. \`<member>\``})
   }
   const reason = args.slice(1).join(" ") || "No reason provided."
   const warnCount = await Warn(member, reason, message, message.member)
   if(serverConfig.deleteModerationMessage) { 
      setTimeout(() => {
         message.delete()
      }, 100); 
   }
   message.channel.send({embeds: [
      new MessageEmbed()
      .setDescription(`<@${member.id}> has been warned. They now have **\`${warnCount.length}\`** warns.`)
      .setColor(`#EA193B`)
   ]}).then((msg) => {
      setTimeout(() => {
            msg.delete().catch(() => {})
      }, 4000);
   })
}