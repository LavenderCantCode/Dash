import Guilds from "../models/Guild"
import { GuildConfig } from "./Interfaces"

export const Disabled = async (command: string, message) => {
   const guild = await Guilds.findOne({guildId: message.guild.id}) as GuildConfig
   if(guild.disabledCommands.includes(command)) {
      return true
   } else {
      return false
   }
}