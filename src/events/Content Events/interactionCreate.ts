import { Interaction, MessageEmbed } from "discord.js";
import { Event, Run } from "../../structures/Event";
import { StringFormatter } from "../../structures/Formatters";
import GetGuildConfig from "../../functions/GetGuildConfig";
import { GuildConfig } from "../../functions/Interfaces"
import { Disabled } from "../../functions/CommandTesters";
export const event: Event = {
   name: "interactionCreate"
}
export const run: Run = async (client, interaction: Interaction) => { 

}