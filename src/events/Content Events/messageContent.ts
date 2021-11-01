import Guilds from "../../models/Guild"
import { Message } from "discord.js";
import { Run, Event } from "../../structures/Event";

export const event: Event = {
      name: "messageCreate"
}
export const run: Run = async (client, message: Message) => {
	   let guild = await Guilds.findOne({ guildId: message.guild.id })
      if (!guild) { await Guilds.create({ guildId: message.guild.id }) }
      guild = await Guilds.findOne({ guildId: message.guild.id })
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
      await command.run(client, message, args)
};