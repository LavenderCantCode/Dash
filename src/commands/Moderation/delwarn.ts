import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import { DelWarn } from "../../structures/Moderation";
import GetMember from "../../functions/GetMember";
export const command: Command = {
   name: "delwarn",
   description: "Delete a warning",
   category: "Moderation",
   permissions: ["ADMINISTRATOR"]
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
   const Action = await DelWarn(member, args[1], message)
   return message.reply({embeds: [
      new MessageEmbed()
      .setDescription(Action.msg)
      .setColor(`#EA193B`)
   ]})
}