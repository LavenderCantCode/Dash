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
   }
})
const Model =  model("Guilds", schema)
export default Model