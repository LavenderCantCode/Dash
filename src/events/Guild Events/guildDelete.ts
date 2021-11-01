import GetGuildConfig from "../../functions/GetGuildConfig";
import Guilds from "../../models/Guild";
import { Event, Run } from "../../structures/Event";

export const event: Event = {
   name: "guildDelete"
}
export const run: Run = async (client, guild) => {
   const previousGuild = await GetGuildConfig(guild)
   if(previousGuild) {
      await Guilds.findOneAndRemove({guildId: guild.id})
   }
}