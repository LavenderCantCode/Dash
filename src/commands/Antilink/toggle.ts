import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { Toggle } from "../../structures/AntiLink";
export const command: Command = {
   name: "al",
   description: "Toggle your anti link.",
   category: "Antilink",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
 const res = await Toggle(message)
 message.reply({embeds: [
   new MessageEmbed()
   .setDescription(`${res}`)
     .setColor(`#EA193B`)
  ]})
}