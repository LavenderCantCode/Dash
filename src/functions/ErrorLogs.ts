import { Guild, TextChannel } from "discord.js"
import GetGuildConfig from "./GetGuildConfig"

const ErrorLog = async (message: string, guild: Guild) => {
   const serverConfig = await GetGuildConfig(guild)
   if(serverConfig.errorLogChannel === "none") return;
   const channel = guild.channels.cache.find(c => c.id === serverConfig.errorLogChannel) as TextChannel
   if(!channel) return
   const currentDate = Date.now()
   channel.send({content: `**Error Log: ( <t:${Math.floor(currentDate / 1000)}:f>)**\n\n${message}`})
}
export default ErrorLog