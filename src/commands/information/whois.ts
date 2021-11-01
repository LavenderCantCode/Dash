import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import Badge from "../../structures/Badge";
export const command: Command = {
   name: "whois",
   description: "See information on a member",
   category: "Infoformation",
   aliases: ['uinfo','userinfo']
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
const member =
	message.mentions.members.first() ||
	message.guild.members.cache.find(
		(m) =>
			m.id === args[0] ||
			m.user.username.toLowerCase() === args.join(" ").toLowerCase() ||
			m.user.tag.toLowerCase() === args.join(" ").toLowerCase() || m.displayName.toLowerCase() === args.join(" ").toLowerCase()
	) ||
      message.member;
   
   const { user, displayName, id, roles, presence, premiumSince, joinedTimestamp } = member
   const { bot, createdTimestamp, flags, username, tag } = user
   const avatar = user.displayAvatarURL({ dynamic: true, size: 128 })
   let badges = []
   let userRoles = []
   if(roles.cache.size) {
      roles.cache.forEach((role) => {
         userRoles.push(role)
      })
   }
   if(flags) {
      flags.toArray().forEach((flag) => {
         badges.push(Badge[flag])
      })
   }
   const embed = new MessageEmbed()
      .setAuthor(tag + "'s Information", avatar)
      .setThumbnail(avatar)
      .addFields(
         { name: "ID & Mention", value: `<@${id}> (\`${id}\`)` },
         { name: "Created", value: `<t:${Math.floor(createdTimestamp / 1000)}:f>`, inline: true },
         { name: "Joined", value: `<t:${Math.floor(joinedTimestamp / 1000)}:f>`, inline: true },
         { name: "Badges", value: `${badges.join(" ") || "No badges"}` },
         { name: "Roles", value: `${userRoles.join(", ") || "No roles"}` }
   )
   .setColor("#EA193B")
			.setFooter(
				`${message.author.tag} | Dash`,
				client.user.displayAvatarURL({ format: "png" })
			);

         return message.reply({embeds: [embed]})
}