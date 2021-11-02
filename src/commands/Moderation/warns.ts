import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import GetMember from "../../functions/GetMember";
import { GetWarns } from "../../structures/Moderation";

export const command: Command = {
   name: "warns",
   description: "See all warns for a member",
   category: "Moderation",
   aliases: ["warnings","infractions"],
   permissions: ["MANAGE_MESSAGES"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
	const member =
		message.mentions.members.first() ||
		message.guild.members.cache.find(
			(m) =>
				m.id === args[0] ||
				m.user.tag.toLowerCase() === args.join(" ").toLowerCase()
		) ||
		message.member;
   const warnings = await GetWarns(member, message)
   if(warnings.length <= 0) {
      return message.reply({embeds: [
         new MessageEmbed()
         .setDescription(`<@${member.id}> has had no previous warnings.`)
         .setColor(`#EA193B`)
      ]})
   }

   message.reply({embeds: [
      new MessageEmbed()
      .setAuthor(member.user.tag + "'s Warnings", member.user.displayAvatarURL({dynamic: true}))
         .addFields(warnings)
         .setColor(`#EA193B`)
   ]})
   
}