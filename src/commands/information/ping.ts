import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";

export const command: Command = {
   name: "ping",
   description: "A ping command",
   category: "Information",
   aliases: ['p'],
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
 message.reply({content: `${client.ws.ping}ms!`})
}