import Guilds from "../../models/Guild"
import { Message } from "discord.js";
import { Run, Event } from "../../structures/Event";
import { AntiLink } from "../../structures/AntiLink";
import { UnderlineFormatter } from "../../structures/Formatters";
export const event: Event = {
      name: "messageCreate"
}
export const run: Run = async (client, message: Message) => {
	   let guild = await Guilds.findOne({ guildId: message.guild.id })
      if (!guild) { await Guilds.create({ guildId: message.guild.id }) }
      guild = await Guilds.findOne({ guildId: message.guild.id })
      await AntiLink(message, client)
      const { prefix } = guild
      if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return;
      const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g)
      const command: any = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()))
      if (!command) return;
      if (command.owner) {
            if (!client.config.owners.includes(message.author.id)) return;
      }
      if(command.premium) {
            if (guild.premium === false) return;
      }
      if(command.permissions) {
            if(!message.member.permissions.has(command.permissions || [])) return;
      }
      if(command.botPermissions) {
            if(!message.guild.me.permissions.has(command.botPermissions || [])) {
                  let botperms = []
                  command.botPermissions.forEach((perm) => {
                        botperms.push(UnderlineFormatter(perm))
                  })
                  return message.channel.send({content: `**${message.author.username}**, I am missing the required permissions to run this command. (\`${botperms.join("`, `")}\`)`})
            }
      }
      await command.run(client, message, args)
};