import { Schema, model } from "mongoose"

const schema = new Schema({
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
   disabledCommands: {
      type: Array,
      default: []
   }
})
const Guilds =  model("Guilds", schema)
export default Guilds