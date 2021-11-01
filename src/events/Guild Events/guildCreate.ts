import { Event, Run } from "../../structures/Event";
import DiscordJs from "discord.js"
import Guild from "../../models/Guild";

export const event: Event = {
   name: "guildCreate"
}
export const run: Run = async (client, guild: DiscordJs.Guild) => { 
   await Guild.create({ guildId: guild.id })
}