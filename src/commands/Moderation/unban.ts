import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { Unban } from "../../structures/Moderation";
export const command: Command = {
   name: "unban",
   description: "Unban a banned member",
   category: "Moderation",
   permissions: ["BAN_MEMBERS"],
   botPermissions: ["BAN_MEMBERS"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args[0]) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. \`<member>\``})
   }

   message.guild.bans.fetch().then((bans) => {
      if(bans.size <= 0) {
         return message.reply({content: `**${message.author.username}**, This server has no bans.`})
      } else {
         const BannedMember = bans.find(u => u.user.id === args.join(" ").toLowerCase() || u.user.tag === args.join(" ").toLowerCase() || u.user.username === args.join(" ").toLowerCase())
         if(!BannedMember) {
            return message.reply({content: `**${message.author.username}**, \`${args.join(" ")}\` is not a valid banned member.`})
         } else {
            message.guild.members.unban(BannedMember.user)
            message.channel.send({embeds: [
               new MessageEmbed()
               .setDescription(`Successfully unbanned \`${BannedMember.user.tag}\``)
               .setColor(`#EA193B`)
            ]}).then((msg) => {
               setTimeout(() => {
                     msg.delete().catch(() => {})
               }, 4000);
            })
         }
      }
   })

}