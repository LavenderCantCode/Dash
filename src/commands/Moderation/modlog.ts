import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { GetWarn } from "../../structures/Moderation";
import GetMember from "../../functions/GetMember";
export const command: Command = {
   name: "modlog",
   description: "Cant more indetail on a certain member warning.",
   category: "Moderation",
   permissions: ["MANAGE_MESSAGES"],
   aliases: ["getwarn"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   if(!args.length || args.length <= 0) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. \`<member>\``})
   }
   const member = GetMember(args, message)
   if(!member) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. \`<member>\``})
   }
   if(!args[1]) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. \`<warnId>\``})
   }
   const Warning = await GetWarn(member, message, args[1])
   message.reply({embeds: [
      new MessageEmbed()
     .setDescription(`${Warning}`)
         .setColor(`#EA193B`)
   ]})
}