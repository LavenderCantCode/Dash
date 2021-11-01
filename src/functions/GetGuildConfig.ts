import { Guild } from "discord.js";
import Guilds from "../models/Guild";
import { GuildConfig } from "./Interfaces";

const GetGuildConfig =  async (guild: Guild) => {
      let guildConfig = await Guilds.findOne({guildId: guild.id})
      if(!guildConfig) {  await Guilds.create({guildId: guild.id}) }
      guildConfig = await Guilds.findOne({guildId: guild.id})
      return guildConfig as GuildConfig
}

export default GetGuildConfig