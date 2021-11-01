import { Schema, model } from "mongoose";

const schema = new Schema({
   guildId: {
      type: String
   },
   userId: {
      type: String
   },
   muteLength: {
      type: Number,
   }
})

const Mutes = model("Mutes", schema)
export default Mutes