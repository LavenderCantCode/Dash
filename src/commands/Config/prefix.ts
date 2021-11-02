import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import GetGuildConfig from "../../functions/GetGuildConfig";
import Guilds from "../../models/Guild";

export const command: Command = {
   name: "prefix",
   description: "Set a new prefix / view the current prefix",
   category: "Config",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
      const serverConfig = await GetGuildConfig(message.guild)
      if(!args.length) {
         return message.reply({content: `The current prefix for **${message.guild.name}** is \`${serverConfig.prefix}\``})
      } else {
         await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
            prefix: args[0].slice(0, 5)
         })
         return message.reply({content: `Prefix for **${message.guild.name}** has been updated to \`${args[0]}\``})
      }
}