import { Run, Command } from "../../structures/Command";
import { Message, MessageActionRow, MessageEmbed, MessageSelectMenu, SelectMenuInteraction } from "discord.js";
import Dash from "../../structures/Client";
import { readdirSync } from "fs"
import { StringFormatter, UnderlineFormatter } from "../../structures/Formatters";
import GetGuildConfig from "../../functions/GetGuildConfig";
import { GuildConfig } from "../../functions/Interfaces";
export const command: Command = {
   name: "help",
   description: "See all commands!",
   category: "Information",
   aliases: ['cmds','commands','h']
}
export const run: Run = async (client: Dash, message: Message, args: string[]) => {
   const serverConfig: GuildConfig = await GetGuildConfig(message.guild)
   if(!args.length) {
      let categorys = [{
         label: "Home",
         value: "home_embed"
      }]
      let fields = []
      readdirSync(`${process.cwd()}/src/commands`).forEach((dir) => {
         const commandLength = readdirSync(`${process.cwd()}/src/commands/${dir}`).length
         categorys.push({
            label: `${StringFormatter(dir)}`,
            value: `${dir.toLowerCase()}`
         })
         fields.push({
            name: `${StringFormatter(dir)} [${commandLength}]`,
            value: `[${StringFormatter(dir)} commands.](https://discord.gg/heevan)`,
            inline: true
         })
      })
      const embed = new MessageEmbed()
      .setAuthor(`Dash's Help Panel`, client.user.displayAvatarURL({dynamic: true}))
      .setDescription(`Please choose one of the categories below on the dropdown to see its commands!\nIf you would like more information on each command you can run \n\`${serverConfig.prefix}help <command>\``)
      .addFields(fields)
      .setFooter(`Dash is currently in early access!\nIf you need any help please join our support server: discord.gg/heevan`)
      .setColor("#EA193B")

      const msg = await message.reply({embeds: [embed], components: [new MessageActionRow().addComponents(new MessageSelectMenu().setPlaceholder("Choose a category here!").setCustomId("help_dropdown").addOptions(categorys))]})
      const collector =  msg.createMessageComponentCollector({componentType: "SELECT_MENU"})
      collector.on("collect", async (interaction) => {
         if(interaction.user.id !== message.author.id) return interaction.deferUpdate()
         const value = interaction.values[0].toLowerCase()
         if(value === "home_embed") {
            await interaction.deferUpdate()
            msg.edit({embeds: [embed]})
         } else {
            const newEmbed = new MessageEmbed()
            .setAuthor(`${StringFormatter(value)} commands`, client.user.displayAvatarURL())
            .setDescription(`Use \`${serverConfig.prefix}help <command>\` to see more information on each command!\n\n${client.commands.filter(c => c.category.toLowerCase() === value.toLowerCase()).map((cmd) => {return `\`${cmd.name}\``}).join(" ")}`)
            .setColor("#EA193B")
            msg.edit({embeds: [newEmbed]})
            await interaction.deferUpdate()
         }
      })
   } else {
      const command: Command = client.commands.get(args[0].toLowerCase()) || client.commands.find(c => c.aliases?.includes(args[0].toLowerCase()))
      if(!command) {
         message.reply({content: `**${message.author.username}**, That is not a valid command.`})
      }
      let permissions = []
      if(command.permissions) {
         command.permissions.forEach((perm) => {
            permissions.push(UnderlineFormatter(perm))
         })
      }
      const embed = new MessageEmbed()
      .setAuthor(`Command Information`, client.user.displayAvatarURL({dynamic: true}))
      .addFields(
         {name: "Usage", value: `${ command.usage ? `\`\`\`\n ${serverConfig.prefix}${command.usage} \n\`\`\`` : "No usage"}`, inline: true},
         {name: "Category", value: `${command.category || "No category"}`, inline: true},
         {name: "Aliases", value: `${command.aliases ? `\`${command.aliases.join("` `")}\`` : "No aliases" }`, inline: true},
         { name: "Permissions", value: `${permissions.length >= 1 ? permissions.join(" ") : "No permissions required"}`, inline: true},
         {name: "Description", value: `\`\`\`${command.description || "No Description"}\`\`\``},         
      )
      .setColor("#EA193B")

      return message.reply({embeds: [embed]})

   }
}