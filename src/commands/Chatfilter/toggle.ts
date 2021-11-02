import { Run, Command } from "../../structures/Command";
import { Message, MessageEmbed } from "discord.js";
import Dash from "../../structures/Client";
import Guilds from "../../models/Guild";
import { GuildConfig } from "../../functions/Interfaces";

export const command: Command = {
   name: "cf.toggle",
   description: "Toggle chat filter on / off",
   category: "Chatfilter",
   permissions: ["ADMINISTRATOR"]
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const serverConfig = await Guilds.findOne({guildId: message.guild.id}) as GuildConfig
   let value;
   let type;
   if(serverConfig.chatFilter === true) {
         value = false
         type = "disabled"
   } else if(serverConfig.chatFilter === false) {
      value = true
      type = "enabled"
   }
   await Guilds.findOneAndUpdate({guildId: message.guild.id}, {
      chatFilter: value
   })
   return message.reply({embeds: [
      new MessageEmbed()
      .setDescription(`Chat filter has now been ${type}.`)
        .setColor(`#EA193B`)
     ]})
}