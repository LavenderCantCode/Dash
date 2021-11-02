import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { GetLinks } from "../../structures/AntiLink";
export const command: Command = {
   name: "al.get",
   description: "Get all your anti links.",
   category: "Antilink",
   aliases: ["al.list"],
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const res = await GetLinks(message)
   if(res.status === "failed") {
      message.reply({content: `**${message.author.username}**, ${res.msg}`})
   } else {
      message.reply({embeds: [
         new MessageEmbed()
         .setDescription(`\`${res.arr.join("`, `")}\``)
           .setColor(`#EA193B`)
        ]})
   }
}