import { Schema, model } from "mongoose"

const schema = new Schema({
   userId: {
      type: String
   },
   coins: {
      type: Number,
      default: 0
   },
   bank: {
      type: Number,
      default: 0
   },
   inventory: {
      type: Array,
      default: []
   },
})
const Users =  model("Users", schema)
export default Users