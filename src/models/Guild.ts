import { Schema, model } from "mongoose"

const schema = new Schema({

   // General
   guildId: {
      type: String
   },
   prefix: {
      type: String,
      default: "d!"
   },
   premium: {
      type: Boolean,
      default: false
   },
   disabledCommands: {
      type: Array,
      default: []
   },

   // Moderation
   mutedRole: {
      type: String,
   },
   removeRolesOnMute: {
      type: Boolean,
      default: true
   },
   deleteModerationMessage: {
      type: Boolean,
      default: true
   },
   maxWarnsBeforeBan: {
      type: Number
   },

   // Antilink
   antiLink: {
      type: Boolean, 
      default: false
   },
   antiLinks: {
      type: Array,
      default: []
   },
   deleteDiscordInviteLinks: {
      type: Boolean,
      default: true
   },
   antiLinkRes: {
      type: String,
      default: `**{{member.user.username}}**, Please do not send those links here! You have been warned.`
   }

})
const Guilds =  model("Guilds", schema)
export default Guilds