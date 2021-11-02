import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import Dash from "../../structures/Client";

export const command: Command = {
   name: "purge",
   description: "Purge an amount of messages in a channel.",
   category: "Moderation",
   permissions: ['MANAGE_MESSAGES'],
   usage: `purge <amount> <channel>`
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const [amount, ...extras] = args
   if(!amount) {
      return message.reply({content: `**${message.author.username}**, Missing required argument. <amount>`})
   }
   if(Number(amount) > 100) {
      return `Amount must be below or equal to 100`
   } else {

      const channel = message.channel as TextChannel
      channel.bulkDelete(Number(amount)).then((messages) => {
         message.channel.send({embeds: [
            new MessageEmbed()
            .setDescription(`Deleted a total of \`${messages.size}/${amount}\` messages in <#${channel.id}>`)
            .setColor(`#EA193B`)
         ]})

      })

   }
 
}