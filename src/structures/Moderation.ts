import DiscordJs, { Message, MessageActionRow, MessageButton, MessageEmbed, TextChannel } from "discord.js"
import Warns from "../models/Warns"
import { WarnsInterface } from "../functions/Interfaces"
import MakeId from "./MakeId"
import Guild from "../models/Guild"
import { WarnModel } from "./Models"

export const Warn = async (member: DiscordJs.GuildMember, reason: string, message: DiscordJs.Message, moderator: DiscordJs.GuildMember) => {
   const { guild } = message
   let warns = await Warns.findOne({guildId: guild.id, userId: member.id})
   if(!warns) { await Warns.create({guildId: guild.id, userId: member.id}) }
   await Warns.findOneAndUpdate({guildId: guild.id, userId: member.id}, {
      $push: {
         warns: [
            {
               moderator: moderator.id,
               time: (Date.now() / 1000),
               reason: reason,
               channel: message.channel.id,
               id: MakeId()
            }
         ]
      }
   })
   warns = await Warns.findOne({guildId: guild.id, userId: member.id})
   return warns.warns as Array<object>
}

export const Ban = async (member: DiscordJs.GuildMember, reason: string, message: DiscordJs.Message) => {

   const serverConfig = await Guild.findOne({guildId: message.guild.id})

   if(serverConfig.deleteModerationMessage) { 
      setTimeout(() => {
         message.delete()
      }, 100); 
   }

   if(member.permissions.has("BAN_MEMBERS")){
      const res = {
         status: "Failed",
         msg: `Can not ban <@${member.id}> as they also have the **Ban Members** permission.`
      }
      return res
   }
   if(member.roles.highest.position >= message.guild.me.roles.highest.position) {
      const res = {
         status: "Failed",
         msg: `Can not ban <@${member.id}> as they have a higher / the same highest role as me.`
      }
      return res
   }

   member.ban({reason: reason, days: 7})
   const res = {
      status: "Success",
      msg: `<@${member.id}> **has been successfully banned**.`
   }
   return res 
}

export const Unban = async (memberId: string, message: DiscordJs.Message) => {
   let res = {
      status: undefined,
      msg: undefined
   }
    message.guild.bans.fetch().then((bans) => {
         if(bans.size === 0) { 
           res['msg'] = `This server has no bans.`
            
         } else {
         const BannedMember = bans.find(u => u.user.id === memberId.toLowerCase() || u.user.tag === memberId.toLowerCase() || u.user.username === memberId.toLowerCase())
         if(!BannedMember) { 
            res['msg'] = `\`${memberId}\` is not a valid banned member.`
            
          } else {
            message.guild.members.unban(BannedMember.user)
            res['msg'] = `Successfully unbanned \`${memberId}\``
          } 
         }
   })
}

export const Kick = async (member: DiscordJs.GuildMember, reason: string, message: DiscordJs.Message) => {
   
   const serverConfig = await Guild.findOne({guildId: message.guild.id})

   if(serverConfig.deleteModerationMessage) { 
      setTimeout(() => {
         message.delete()
      }, 100); 
   }

   if(member.permissions.has("KICK_MEMBERS")){
      const res = {
         status: "Failed",
         msg: `Can not kick <@${member.id}> as they also have the **Kick Members** permission.`
      }
      return res
   }
   if(member.roles.highest.position >= message.guild.me.roles.highest.position) {
      const res = {
         status: "Failed",
         msg: `Can not kick <@${member.id}> as they have a higher / the same highest role as me.`
      }
      return res
   }

   member.kick(reason)
   const res = {
      status: "Success",
      msg: `<@${member.id}> **has been successfully kicked**.`
   }
   return res 
}


export const DelWarn = async (member: DiscordJs.GuildMember, id: string, message: DiscordJs.Message) => {
   const { guild } = message
   let warns = await Warns.findOne({guildId: guild.id, userId: member.id})
   if(!warns) {
      const res = {
         status: "Failed",
         msg: `<@${member.id}> Does not have any warns.`
      }
      return res 
      } else {
      const serverConfig = await Guild.findOne({guildId: guild.id})
      if(serverConfig.deleteModerationMessage) { 
         setTimeout(() => {
         message.delete()
      }, 100); 
      }
      let index;
      warns.warns.forEach((warn) => {
         if(warn.id === id) {
            index = warns.warns.indexOf(warn)
         }
      })
      if(!index) {
         const res = {
            status: "Failed",
            msg: `\`${id}\` is not a valid warnId.`
         }
         return res 
      } else {
         warns.warns.splice(index)
         warns.save()
         const res = {
            status: "Success",
            msg: `Removed warn \`${id}\` from <@${member.id}>. They now have ${warns.warns.length} warns.`
         }
         return res 
      }
   }
}

export const GetWarns = async (member: DiscordJs.GuildMember, message: DiscordJs.Message) => {
   const warns = await Warns.findOne({guildId: message.guild.id, userId: member.id}) as WarnModel
   let formattedWarns = []
   if(warns) {
      warns.warns.forEach((warn: WarnsInterface) => {
         const moderator = message.guild.members.cache.find(m => m.id === warn.moderator)
         formattedWarns.push({
            name: `ID: ${warn.id} | ${moderator.user.tag}`,
            value: `${warn.reason}`
         })
      })
   }
   return formattedWarns;
}


export const GetWarn = async (member: DiscordJs.GuildMember, message: DiscordJs.Message, id: string) => {
   let warn;
   const warns = await Warns.findOne({guildId: message.guild.id, userId: member.id}) as WarnModel
   if(!warns) {
      warn = `<@${member.id}> has no warnings.`
      return warn
   } else {
      let Warning: WarnsInterface;
      warns.warns.forEach((warn: WarnsInterface) => {
         if(warn.id === id) {
            Warning = warn
         }
      })
      const moderator = message.guild.members.cache.find(m => m.id === Warning.moderator)
      const { name } = message.guild.channels.cache.find(c => c.id === Warning.channel)
     warn = `**Id:** ${Warning.id}\n**Date:** <t:${Math.floor(Warning.time)}:f>\n**Channel:** ${name}\n**Moderator:** ${moderator.user.tag}**\n**Reason:** \`\`\`\n ${Warning.reason} \n\`\`\``
     return warn
   }
}

export const ClearAllWarnsServer = async (guild: DiscordJs.Guild, message: DiscordJs.Message) => {
   const row = new MessageActionRow()
   .addComponents(
      new MessageButton()
      .setStyle("SUCCESS")
      .setEmoji("<:HE_Green_tick:901773316090642454>")
      .setCustomId("confirm"),
      new MessageButton()
      .setStyle("DANGER")
      .setEmoji("<:HE_Red_ex:901773315507625986>")
      .setCustomId("cancel"),
   )

   const embed = new MessageEmbed()
   .setDescription(`<@${message.author.id}> are you sure you would like to **clear all warns for this server**`)
   .setColor("#EA193B")

   const msg = await message.reply({embeds: [embed], components: [row]})
   const collector = msg.createMessageComponentCollector({componentType: "BUTTON"})
   collector.on("collect", async (interaction) => {
      if(interaction.user.id !== message.author.id) return interaction.deferUpdate();
      if(interaction.isButton()) {
         if(interaction.customId === "confirm") {
            const warns = await Warns.find({guildId: interaction.guild.id})
            let length = warns.length
            const TotalWarns = 0
            warns.forEach(async (warn) => {
               TotalWarns + warn.warns.length
               await Warns.findOneAndRemove({guildId: interaction.guild.id, userId: warn.userId})
            })
            msg.edit({embeds: [
               new MessageEmbed()
               .setDescription(`Removed all warns for **${interaction.guild.name}**.`)
               .setColor("#EA193B")
            ],
            components: []})
            await interaction.deferUpdate()
         } else if(interaction.customId === "cancel") {
             msg.edit({embeds: [
               new MessageEmbed()
               .setDescription(`Process has been cancelled.`)
               .setColor("#EA193B")
            ],
            components: []})
            await interaction.deferUpdate()
         }
      }
   })
}