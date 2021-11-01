import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";

export const command: Command = {
   name: "serverinfo",
   description: "See information on the current server.",
   category: "Information",
   aliases: ['si','sinfo']
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const guild = client.guilds.cache.get(args[0]) || message.guild
   const icon = guild.iconURL({ dynamic: true })
   const banner = guild.bannerURL({ size: 1024 })
   const splash = guild.splashURL({ size: 1024 })
   const { name, id, ownerId, channels, members, memberCount, maximumMembers, createdTimestamp, roles, emojis, bans } = guild
   const embed = new MessageEmbed()
			.setTitle(name + "'s Information")
			.setThumbnail(icon)
			.setImage(banner)
			.addFields(
				{ name: "ID", value: `${id}` },
				{ name: "Owner", value: `<@${ownerId}> (\`${ownerId}\`)` },
				{
					name: "Created",
					value: `<t:${Math.floor(
						createdTimestamp / 1000
					)}:f> ( <t:${Math.floor(createdTimestamp / 1000)}:R> )`,
				},
				{
					name: "Members",
					value: `Total: **${memberCount}**\nBots: **${
						members.cache.filter((f) => f.user.bot).size
					}**\nHumans: **${members.cache.filter((f) => !f.user.bot).size}**`,
					inline: true,
				},
				{
					name: "Channels",
					value: `Total: **${channels.cache.size}**\nText: **${
						channels.cache.filter((f) => f.type === "GUILD_TEXT").size
					}**\nVoice: **${
						channels.cache.filter((f) => f.type === "GUILD_VOICE").size
					}**\nStage: **${
						channels.cache.filter((f) => f.type === "GUILD_STAGE_VOICE").size
					}**`,
					inline: true,
				},
				{
					name: "Statistics",
					value: `Roles: **${roles.cache.size}**\nEmojis: **${emojis.cache.size}**\nBans: **${bans.cache.size}**`,
					inline: true,
				}
			)
			.setColor("#EA193B")
			.setFooter(
				`${message.author.tag} | Dash`,
				client.user.displayAvatarURL({ format: "png" })
			);
   
   return message.reply({embeds: [embed]})
   

}
