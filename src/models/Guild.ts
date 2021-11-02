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
   errorLogChannel: {
      type: String,
      default: "none"
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
   antiLinkRes: {
      type: String,
      default: `**{{member.user.username}}**, Please do not send those links here! You have been warned.`
   },
   antiLinkAction: {
      type: Array,
      default: ["delete", "warn"]
   },

   
   // Chat filter
   chatFilter: {
      type: Boolean, 
      default: false
   },
   chatFilterWords: {
      type: Array,
      default: []
   },
   chatFilterRes: {
      type: String,
      default: `**{{member.user.username}}**, Please do not send those words here! You have been warned.`
   },
   chatFilterAction: {
      type: Array,
      default: ["delete", "warn"]
   },

   // Misc
   suggestionsChannelId: {
      type: String,
      default: "none"
   }

})
const Guilds =  model("Guilds", schema)
export default Guilds