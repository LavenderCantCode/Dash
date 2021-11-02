import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { ClearAllWarnsServer } from "../../structures/Moderation";
export const command: Command = {
   name: "clearwarns",
   description: "Clear all warns for a server",
   category: "Moderator",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   ClearAllWarnsServer(message.guild, message)
}