import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { RemoveLink } from "../../structures/AntiLink";

export const command: Command = {
   name: "al.remove",
   description: "Remove an link from your anti link config.",
   category: "Antilink",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args[0]) {
      return message.reply({content: `**${message.author.username}**, Please supply a valid link!`})
   }
   const linkTextRegexp = /(https?:\/\/)?(www\.)?([\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gim
   if(linkTextRegexp.test(args[0]) === true) {
      const res = await RemoveLink(args[0], message)
       message.reply({embeds: [
       new MessageEmbed()
       .setDescription(`${res}`)
         .setColor(`#EA193B`)
      ]})
   } else if(!linkTextRegexp.test(args[0])  === false) {
       message.reply({content: `**${message.author.username}**, Please supply a valid link!`})
   }
}