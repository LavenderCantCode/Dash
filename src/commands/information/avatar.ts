import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";

export const command: Command = {
	name: "avatar",
	description: "See a members avatar",
	category: "Information",
	aliases: ["av", "icon", "pfp", "uicon"],
};

export const run: Run = async (
	client: Dash,
	message: Message,
	args: string[]
) => {
	const member =
		message.mentions.members.first() ||
		message.guild.members.cache.find(
			(m) =>
				m.id === args[0] ||
				m.user.username.toLowerCase() === args.join(" ").toLowerCase() ||
				m.user.tag.toLowerCase() === args.join(" ").toLowerCase()  || m.displayName.toLowerCase() === args.join(" ").toLowerCase()
		) ||
		message.member;
	const embed = new MessageEmbed()
		.setAuthor(`${member.user.tag}'s avatar`)
		.setDescription(
			`[\`128px\`](${member.user.displayAvatarURL({
				size: 128,
			})}) | [\`256px\`](${member.user.displayAvatarURL({
				size: 256,
			})}) | [\`512px\`](${member.user.displayAvatarURL({
				size: 512,
			})}) | [\`1024px\`](${member.user.displayAvatarURL({
				size: 1024,
			})}) | [\`2048px\`](${member.user.displayAvatarURL({ size: 2048 })})`
		)
		.setImage(member.user.displayAvatarURL({ size: 2048 }))
		.setColor(`#EA193B`)
		.setFooter(
			`${message.author.tag} | Dash`,
			client.user.displayAvatarURL({ format: "png" })
		);

	message.reply({ embeds: [embed] });
};
