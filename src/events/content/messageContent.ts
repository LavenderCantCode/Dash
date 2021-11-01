// throws error on "c.commands.aliases?.includes(..)" because i dont have an aliases exported on the command file, instead its in a object
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
      if(command.premium) {
            if (guild.premium === false) return;
      }
      await command.run(client, message, args)
};