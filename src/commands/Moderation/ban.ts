import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { Ban } from "../../structures/Moderation";
import GetMember from "../../functions/GetMember";
export const command: Command = {
   name: "ban",
   description: "Ban a member",
   category: "Moderation",
   permissions: ['BAN_MEMBERS'],
   botPermissions: ["BAN_MEMBERS"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args.length || args.length <= 0) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. \`<member>\``})
   }
   const member = GetMember(args, message)
   if(!member) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. \`<member>\``})
   }
   const reason = args.slice(1).join(" ") || "No reason provided."
   const ban = await Ban(member, reason, message)
      return message.reply({embeds: [
         new MessageEmbed()
         .setDescription(ban.msg)
         .setColor(`#EA193B`)
      ]}).then((msg) => {
         setTimeout(() => {
               msg.delete().catch(() => {})
         }, 4000);
      })
}