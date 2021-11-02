import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { Kick } from "../../structures/Moderation";
import GetMember from "../../functions/GetMember";
export const command: Command = {
   name: "kick",
   description: "Kick a member",
   category: "Moderation",
   permissions: ['KICK_MEMBERS'],
   botPermissions: ["KICK_MEMBERS"]
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
   const kick = await Kick(member, reason, message)
      return message.reply({embeds: [
         new MessageEmbed()
         .setDescription(kick.msg)
         .setColor(`#EA193B`)
      ]}).then((msg) => {
         setTimeout(() => {
               msg.delete().catch(() => {})
         }, 4000);
      })
}