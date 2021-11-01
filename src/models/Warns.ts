import { Schema, model } from "mongoose";

const schema = new Schema({
   guildId: {
      type: String
   },
   userId: {
      type: String
   },
   warns: {
      type: Array,
      default: []
   }
})

const Warns = model("Warns", schema)
export default Warns

